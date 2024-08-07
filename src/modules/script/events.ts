import { BiDi } from "../../index";
import Session from "../session/commands";
import WebSocket from "ws";
import {
  ScriptEvent,
  ScriptEventName,
  ScriptEventSubscriptionType,
  ScriptMessageParameters,
  ScriptRealmDestroyedParameters,
  ScriptRealmInfo,
} from "./types/EventTypes";

/**
 * Handles script events and subscriptions.
 */
export class ScriptEvents {
  /**
   * BiDi connection instance.
   */
  _ws: BiDi;

  /**
   * WebSocket connection instance.
   */
  _connection: WebSocket;

  /**
   * Session instance.
   */
  _session: Session;

  /**
   * Map of event subscriptions.
   */
  eventSubscriptions: Map<ScriptEventName, ScriptEventSubscriptionType>;

  /**
   * Initializes the ScriptEvents instance.
   * @param BiDiConnection - BiDi connection instance.
   */
  constructor(BiDiConnection: BiDi) {
    this._ws = BiDiConnection;
    this._connection = this._ws.getConnection;
    this._session = new Session(BiDiConnection);
    this.eventSubscriptions = new Map();
  }

  /**
   * Gets the event subscription data.
   * @returns Map of event subscriptions.
   */
  public get eventSubscriptionData(): Map<ScriptEventName, ScriptEventSubscriptionType> {
    return this.eventSubscriptions;
  }

  /**
   * Handles an event subscription.
   * @param eventName - Name of the event.
   * @returns Promise that resolves when the event is handled.
   */
  private async handleEvent<T extends ScriptEventSubscriptionType['params']>(
    eventName: ScriptEventName
  ): Promise<void> {
    const event = {
      events: 'script.' + eventName,
    };

    await this._session.subscribe(event);
    this._connection.on('message', (data: string) => {
      const messageData = JSON.parse(data.toString()) as ScriptEvent<T>;
      if ('method' in messageData && 'params' in messageData) {
        if (messageData.method === 'script.' + eventName) {
          this.eventSubscriptions.set(eventName, messageData as ScriptEventSubscriptionType);
        }
      }
    });
  }

  /**
   * Subscribes to message events.
   * @returns Promise that resolves when the subscription is successful.
   */
  async message(): Promise<void> {
    return this.handleEvent<ScriptMessageParameters>('message');
  }

  /**
   * Subscribes to realm created events.
   * @returns Promise that resolves when the subscription is successful.
   */
  async realmCreated(): Promise<void> {
    return this.handleEvent<ScriptRealmInfo>('realmCreated');
  }

  /**
   * Subscribes to realm destroyed events.
   * @returns Promise that resolves when the subscription is successful.
   */
  async realmDestroyed(): Promise<void> {
    return this.handleEvent<ScriptRealmDestroyedParameters>('realmDestroyed');
  }
}