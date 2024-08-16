import { BiDi } from '../../index';
import {
  CapabilitiesRequest,
  Event, SessionEnd, SessionNew, SessionNewResult,
  SessionStatus,
  SessionStatusResult,
  SubscriptionRequest,
  SubscriptionType
} from "./types";


/**
 * Class representing a session.
 */
export default class Session {
  _ws: BiDi;
  _events: SubscriptionType | undefined ;
  _contexts: SubscriptionType | undefined ;
  _capabilities: CapabilitiesRequest | undefined;
  
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
   * @private
   * @returns {Promise} Promise representing sending command for subscription/unsubscription.
   * @param parameters
   */
  private async manageSubscription(parameters: Event): Promise<void> {
    this._events = Array.isArray(parameters.params.events) ? parameters.params.events : [parameters.params.events];
    this._contexts = Array.isArray(parameters.params.contexts) ? parameters.params.contexts : (parameters.params.contexts ? [parameters.params.contexts] : []);
    
    this.validateStringTypes(this._events, 'events');
    if (this._contexts.length > 0) {
      this.validateStringTypes(this._contexts, 'contexts');
    }
    
    const params: Event = {
      method: parameters.method,
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
   * @returns {Promise} Promise representing sending command for subscription.
   * @param subscriptionRequest
   */
  async subscribe(subscriptionRequest: SubscriptionRequest): Promise<void> {
    const sessionSubscribe = {
      method: 'session.subscribe',
      params: subscriptionRequest
    }
    return this.manageSubscription(sessionSubscribe);
  }
  
  /**
   * Unsubscribes from specified events.
   * @returns {Promise} Promise representing sending command for unsubscription.
   * @param unsubscriptionType
   */
  async unsubscribe(unsubscriptionType: SubscriptionRequest) {
    const sessionUnSubscribe = {
      method: 'session.unsubscribe',
      params: unsubscriptionType
    }

    return this.manageSubscription(sessionUnSubscribe);
  }
  
  /**
   * Get status of session.
   * @return {Promise<SessionStatusResult>} Promise object represents the session status.
   */
  get status(): Promise<SessionStatusResult> {
    const params: SessionStatus = {
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
   * @param {CapabilitiesRequest} capabilities - The capabilities that the new session should have.
   * @return {Promise<SessionNewResult>} Promise object represents the newly created session.
   * @throws {Error} When unable to create a session.
   */
  async new(capabilities: CapabilitiesRequest): Promise<SessionNewResult>{
    this._capabilities = capabilities;
    
    const params: SessionNew = {
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
  async end(): Promise<void> {
    const params: SessionEnd= {
      method: 'session.end',
      params: {}
    }

    return new Promise((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(() => resolve())
        .catch(error => reject(new Error(`Unable to end session: ${error}`)));
    });
  }
}