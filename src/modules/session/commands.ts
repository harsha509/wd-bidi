import { BiDi } from '../../index';

import {
  Params,
  sessionCapabilitiesRequest,
  SessionEndParams,
  sessionNew,
  SessionNewResult,
  SessionStatusParams,
  SessionStatusResult,
  SubscriptionType
} from './types';


/**
 * Class representing a session.
 */
export default class Session {
  _ws: BiDi;
  _events: SubscriptionType | undefined ;
  _contexts: SubscriptionType | undefined ;
  _capabilities: sessionCapabilitiesRequest | undefined;
  
  /**
   * Create a session.
   * @param {BiDi} BidiConnection - BiDi Connection
   */
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
  }
  
  /**
   * Validates that all types in an array are strings.
   * @param {Array<SubscriptionType>} array - An array of subscriptions.
   * @param {string} arrayName - Name of the array for error messages.
   * @throws {TypeError} if non-string types are present in the array.
   */
  private validateStringTypes(array: Array<SubscriptionType>, arrayName: string) {
    if (array.some(item => typeof item !== 'string')) {
      throw new TypeError(`${arrayName} should be a string or array of strings`);
    }
  }
  
  /**
   * Manages subscriptions for events. Used for both subscribing and unsubscribing.
   * @param {string} method - The method name to be executed ('session.subscribe' or 'session.unsubscribe').
   * @param {SubscriptionType} events - The events to be subscribed/unsubscribed.
   * @param {SubscriptionType} [context] - The context for which events are to be subscribed/unsubscribed.
   * @private
   * @returns {Promise} Promise representing sending command for subscription/unsubscription.
   */
  private async manageSubscription(method: string, events: SubscriptionType, context?: SubscriptionType): Promise<void> {
    this._events = Array.isArray(events) ? events : [events];
    this._contexts = Array.isArray(context) ? context : (context ? [context] : []);
    
    this.validateStringTypes(this._events, 'events');
    if (this._contexts.length > 0) {
      this.validateStringTypes(this._contexts, 'contexts');
    }
    
    const params: Params = {
      method,
      params: {
        events: this._events
      }
    };
    
    if (this._contexts.length > 0) {
      params.params['contexts'] = this._contexts;
    }
    
    await this._ws.sendCommand(params);
  }
  
  /**
   * Subscribes to specified events.
   * @param {SubscriptionType} events - The events to be subscribed.
   * @param {SubscriptionType} [context] - The context for which events are to be subscribed.
   * @returns {Promise} Promise representing sending command for subscription.
   */
  async subscribe(events: SubscriptionType, context?: SubscriptionType) {
    return this.manageSubscription('session.subscribe', events, context);
  }
  
  /**
   * Unsubscribes from specified events.
   * @param {SubscriptionType} events - The events to be unsubscribed.
   * @param {SubscriptionType} [context] - The context for which events are to be unsubscribed.
   * @returns {Promise} Promise representing sending command for unsubscription.
   */
  async unsubscribe(events: SubscriptionType, context?: SubscriptionType) {
    return this.manageSubscription('session.unsubscribe', events, context);
  }
  
  /**
   * Get status of session.
   * @return {Promise<SessionStatusResult>} Promise object represents the session status.
   */
  get status(): Promise<SessionStatusResult> {
    const params: SessionStatusParams = {
      method: 'session.status',
      params: {}
    }
    return new Promise<SessionStatusResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as SessionStatusResult))
        .catch(error => reject(new Error(`Unable to get session status ${error}`)));
    });
  }
  
  /**
   * Create a new session
   * @param {sessionCapabilitiesRequest} capabilities - The capabilities that the new session should have.
   * @return {Promise<SessionNewResult>} Promise object represents the newly created session.
   * @throws {Error} When unable to create a session.
   */
  async newSession(capabilities: sessionCapabilitiesRequest): Promise<SessionNewResult>{
    this._capabilities = capabilities;
    
    const params: sessionNew= {
      method: 'session.new',
      params:{
        capabilities: this._capabilities
      }
    }
    
    return new Promise<SessionNewResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as SessionNewResult))
        .catch(error => reject(new Error(`Unable to create session: ${error}`)));
    });
  }
  
  /**
   * Ends the active session.
   *
   * Sends a command to the WebSocket to end the current session through the `session.end` method.
   *
   * @async
   * @returns {Promise<void>} Promise that resolves if the session ends successfully,
   * rejects if the WebSocket fails to send the command.
   */
  async endSession(){
    const params: SessionEndParams = {
      method: 'session.end',
      params: {}
    }

    await this._ws.sendCommand(params);
  }
}