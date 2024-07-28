import {NetWorkBaseParameters, NetworkInitiator, NetworkResponseData} from "./types";


export interface NetworkAuthRequiredParameters extends  NetWorkBaseParameters {
    response: NetworkResponseData
}

export interface NetworkBeforeRequestSentParameters extends NetWorkBaseParameters {
    initiator: NetworkInitiator
}

export interface NetworkFetchErrorParameters extends NetWorkBaseParameters {
    errorText: string
}

export interface NetworkResponseCompletedParameters extends NetWorkBaseParameters {
    response: NetworkResponseData
}

export interface NetworkResponseStartedParameters extends NetWorkBaseParameters {
    response: NetworkResponseData
}

type NetworkEventParams =
    | NetworkAuthRequiredParameters
    | NetworkBeforeRequestSentParameters
    | NetworkFetchErrorParameters
    | NetworkResponseCompletedParameters
    | NetworkResponseStartedParameters;


export interface NetworkEvent<T extends NetworkEventParams> {
    method: `network.${NetworkEventName}`,
    params: T
}

export type NetworkEventName =
    'authRequired'
    | 'beforeRequestSent'
    | 'fetchError'
    | 'responseCompleted'
    | 'responseStarted'


export type NetworkEventSubscriptionType = NetworkEvent<NetworkEventParams>