import {BiDi} from "../../index";
import WebSocket from "ws";
import Session from "../session/commands";
import {
    NetworkAuthRequiredParameters,
    NetworkBeforeRequestSentParameters,
    NetworkEvent,
    NetworkEventName,
    NetworkEventSubscriptionType,
    NetworkFetchErrorParameters,
    NetworkResponseCompletedParameters,
    NetworkResponseStartedParameters
} from "./eventTypes";

export class NetworkEvents {
    _ws : BiDi;
    _connection: WebSocket;
    _session: Session;
    eventSubscriptions: Map<NetworkEventName, NetworkEventSubscriptionType>

    /**
     * Construct a new BrowsingContextEvents instance.
     * @param {BiDi} BiDiConnection The connected BiDi instance
     */
    constructor(BiDiConnection: BiDi) {
        this._ws = BiDiConnection;
        this._connection = this._ws.getConnection;
        this._session = new Session(BiDiConnection);
        this.eventSubscriptions = new Map();
    }

    /**
     * Get currently subscribed event data.
     * @return {Map<NetworkEventName, NetworkEventSubscriptionType>} The map of current event subscriptions.
     */
    public get eventSubscriptionData(): Map<NetworkEventName, NetworkEventSubscriptionType> {
        return this.eventSubscriptions;
    }


    /**
     * Handles event subscription and message processing for a specific event.
     * @param {NetworkEventName} eventName - Name of the event to subscribe to.
     * @return {Promise<void>}
     * @private
     */
    private async handleEvent<T extends NetworkEventSubscriptionType['params']>(eventName: NetworkEventName): Promise<void> {
        const event = {
            events: 'network.' + eventName,
        }

        await this._session.subscribe(event);
        this._connection.on('message', (data: string) => {
            const messageData = JSON.parse(data.toString()) as NetworkEvent<T>;
            if('method' in messageData && 'params' in messageData) {
                if(messageData.method === 'network.'+ eventName) {
                    this.eventSubscriptions.set(eventName, messageData as NetworkEventSubscriptionType);
                }
            }
        })
    }

    /**
     * Handles auth required event
     * @return {Promise<void>}
     */
    async authRequired(): Promise<void> {
        return this.handleEvent<NetworkAuthRequiredParameters>('authRequired');
    }

    /**
     * Handles before request sent event
     * @return {Promise<void>}
     */
    async beforeRequestSent(): Promise<void> {
        return this.handleEvent<NetworkBeforeRequestSentParameters>('beforeRequestSent');
    }

    /**
     * Handles fetch error event
     * @return {Promise<void>}
     */
    async fetchError(): Promise<void> {
        return this.handleEvent<NetworkFetchErrorParameters>('fetchError');
    }

    /**
     * Handles response completed event
     * @return {Promise<void>}
     */
    async responseCompleted(): Promise<void> {
        return this.handleEvent<NetworkResponseCompletedParameters>('responseCompleted');
    }

    /**
     * Handles response started event
     * @return {Promise<void>}
     */
    async responseStarted(): Promise<void> {
        return this.handleEvent<NetworkResponseStartedParameters>('responseStarted');
    }
}