import { BiDi } from "../../index";
import * as EventType from './types'

/**
 * Network class provides methods to manage network requests and responses
 * using BiDi (Bidirectional) communication.
 */
export default class Network {
    _ws: BiDi;

    /**
     * Constructs a new Network instance.
     * @param BidiConnection - The BiDi connection instance.
     */
    constructor(BidiConnection: BiDi) {
        this._ws = BidiConnection;
    }

    /**
     * Adds a network intercept.
     * @param context - The parameters for adding the network intercept.
     * @returns A promise that resolves with the result of adding the network intercept.
     */
    async addIntercept(context: EventType.NetworkAddInterceptParameters):
        Promise<EventType.NetworkAddInterceptResult> {
        const param: EventType.NetworkAddIntercept = {
            method: 'network.addIntercept',
            params: context
        }

        return new Promise<EventType.NetworkAddInterceptResult>((resolve, reject) => {
            this._ws.sendCommand(param)
                .then(response => resolve(response as EventType.NetworkAddInterceptResult))
                .catch(error => reject(`Failed to intercept network ${error}`))
        })
    }

    /**
     * Continues a paused network request.
     * @param context - The parameters for continuing the network request.
     * @returns A promise that resolves when the request is continued.
     */
    async continueRequest(context: EventType.NetworkContinueRequestParameters): Promise<void> {
        const param: EventType.NetworkContinueRequest = {
            method: 'network.continueRequest',
            params: context
        }
        await this._ws.sendCommand(param);
    }

    /**
     * Continues a paused network response.
     * @param context - The parameters for continuing the network response.
     * @returns A promise that resolves when the response is continued.
     */
    async continueResponse(context: EventType.NetworkContinueResponseParameters): Promise<void> {
        const param: EventType.NetworkContinueResponse = {
            method: 'network.continueResponse',
            params: context
        }

        await this._ws.sendCommand(param);
    }

    /**
     * Continues a paused network request with authentication.
     * @param context - The parameters for continuing the network request with authentication.
     * @returns A promise that resolves when the request is continued with authentication.
     */
    async continueWithAuth(context: EventType.NetworkContinueWithAuthParameters): Promise<void> {
        const param: EventType.NetworkContinueWithAuth = {
            method: 'network.continueWithAuth',
            params: context
        }

        await this._ws.sendCommand(param);
    }

    /**
     * Fails a network request.
     * @param context - The parameters for failing the network request.
     * @returns A promise that resolves when the request is failed.
     */
    async failRequest(context: EventType.NetworkFailRequestParameters): Promise<void> {
        const param: EventType.NetworkFailRequest = {
            method: 'network.failRequest',
            params: context
        }

        await this._ws.sendCommand(param)
    }

    /**
     * Provides a response to a network request.
     * @param context - The parameters for providing the network response.
     * @returns A promise that resolves when the response is provided.
     */
    async provideResponse(context: EventType.NetworkProvideResponseParameters): Promise<void> {
        const param: EventType.NetworkProvideResponse = {
            method: 'network.provideResponse',
            params: context
        }

        await this._ws.sendCommand(param);
    }

    /**
     * Removes a network intercept.
     * @param context - The parameters for removing the network intercept.
     * @returns A promise that resolves when the network intercept is removed.
     */
    async removeIntercept(context: EventType.NetworkRemoveInterceptParameters): Promise<void> {
        const param: EventType.NetworkRemoveIntercept = {
            method: 'network.removeIntercept',
            params: context
        }

        await this._ws.sendCommand(param);
    }

    /**
     * Configures the network cache behavior for certain requests.
     * @param context - The parameters for setting the cache behavior.
     * @returns A promise that resolves when the cache behavior is set.
     */
    async setCacheBehavior(context: EventType.NetworkSetCacheBehaviorParameters): Promise<void> {
        const param: EventType.NetworkSetCacheBehavior = {
            method: 'network.setCacheBehavior',
            params: context
        }

        await this._ws.sendCommand(param)
    }
}
