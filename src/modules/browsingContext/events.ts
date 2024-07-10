import { BiDi } from "../../index";
import WebSocket from "ws";
import Session from "../session/commands";
import {
  BrowsingContextEvent,
  BrowsingContextEventName,
  BrowsingContextUserPromptClosedParameters,
  EventSubscriptionType
} from "./eventTypes";
import {BrowsingContextInfo, BrowsingContextNavigationInfo} from "./types";


/**
 * Handles event subscriptions and processes messages
 * from a bidirectional browser automation protocol (BiDi) connection.
 */
export default class BrowsingContextEvents {
  _ws: BiDi;
  _connection: WebSocket;
  _session: Session;
  eventSubscriptions: Map<BrowsingContextEventName, EventSubscriptionType>;
  
  /**
   * Construct a new BrowsingContextEvents instance.
   * @param {BiDi} BidiConnection The connected BiDi instance
   */
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
    this._connection = this._ws.getConnection;
    this._session = new Session(BidiConnection);
    this.eventSubscriptions = new Map();
  }
  
  /**
   * Get currently subscribed event data.
   * @return {Map<BrowsingContextEventName, EventSubscriptionType>} The map of current event subscriptions.
   */
  public get eventSubscriptionData(): Map<BrowsingContextEventName, EventSubscriptionType> {
    return this.eventSubscriptions;
  }
  
  /**
   * Handles event subscription and message processing for a specific event.
   * @param {BrowsingContextEventName} eventName - Name of the event to subscribe to.
   * @return {Promise<void>}
   * @private
   */
  private async handleEvent<T extends EventSubscriptionType['params']>(eventName: BrowsingContextEventName): Promise<void> {
    const event = {
      events: 'browsingContext.' + eventName
    }
    await this._session.subscribe(event);
    this._connection.on('message', (data: string) => {
      const messageData = JSON.parse(data.toString()) as BrowsingContextEvent<T>;
      if ('method' in messageData && 'params' in messageData) {
        if (messageData.method === 'browsingContext.' + eventName) {
          this.eventSubscriptions.set(eventName, messageData as EventSubscriptionType);
        }
      }
    });
  }
  
  /**
   * Handles BrowsingContextInfo event when a context is created.
   * @return {Promise<void>}
   */
  async contextCreated() { return this.handleEvent<BrowsingContextInfo>('contextCreated'); }
  
  /**
   * Handles BrowsingContextInfo event when a context is destroyed.
   * @return {Promise<void>}
   */
  async contextDestroyed() { return this.handleEvent<BrowsingContextInfo>('contextDestroyed'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when navigation starts.
   * @return {Promise<void>}
   */
  async navigationStarted() { return this.handleEvent<BrowsingContextNavigationInfo>('navigationStarted'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when fragment navigates.
   * @return {Promise<void>}
   */
  async fragmentNavigated() { return this.handleEvent<BrowsingContextNavigationInfo>('fragmentNavigated'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when DOM content is loaded.
   * @return {Promise<void>}
   */
  async domContentLoaded() { return this.handleEvent<BrowsingContextNavigationInfo>('domContentLoaded'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when the page load event happens.
   * @return {Promise<void>}
   */
  async load() { return this.handleEvent<BrowsingContextNavigationInfo>('load'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when download begins.
   * @return {Promise<void>}
   */
  async downloadWillBegin() { return this.handleEvent<BrowsingContextNavigationInfo>('downloadWillBegin'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when navigation is aborted.
   * @return {Promise<void>}
   */
  async navigationAborted() { return this.handleEvent<BrowsingContextNavigationInfo>('navigationAborted'); }
  
  /**
   * Handles BrowsingContextNavigationInfo event when navigation fails.
   * @return {Promise<void>}
   */
  async navigationFailed() { return this.handleEvent<BrowsingContextNavigationInfo>('navigationFailed'); }
  
  /**
   * Handles user prompt closed event.
   * @return {Promise<void>}
   */
  async userPromptClosed() { return this.handleEvent<BrowsingContextUserPromptClosedParameters>('userPromptClosed'); }
  
  /**
   * Handles user prompt opened event.
   * @return {Promise<void>}
   */
  async userPromptOpened() { return this.handleEvent<BrowsingContextUserPromptClosedParameters>('userPromptOpened'); }
  
  
}