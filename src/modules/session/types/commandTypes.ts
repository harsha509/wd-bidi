import {CapabilitiesRequest} from "./capabilitiesRequest";
import {ProxyConfiguration} from "./proxyConfiguration";
import {UserPromptHandler} from "./userPromptHandler";
import {SubscriptionRequest} from "./subscriptionRequest";

export type Empty = NonNullable<unknown>;

export interface SessionStatus {
  method: 'session.status';
  params: Empty
}

export interface SessionStatusResult {
  ready: boolean;
  message: string;
}


export interface SessionNew {
  method: "session.new",
  params: SessionNewParameters
}

interface SessionNewParameters {
  capabilities: CapabilitiesRequest
}

export type SessionNewResult = {
  sessionId: string,
  capabilities: {
    acceptInsecureCerts: boolean,
    browserName: string,
    browserVersion: string,
    platformName: string,
    setWindowRect: boolean,
    userAgent: string,
    proxy?: ProxyConfiguration,
    unhandledPromptBehavior?: UserPromptHandler,
    webSocketUrl?: string,
  }
}

export interface SessionEnd {
  method: 'session.end';
  params: Empty
}

export interface sessionSubscribe {
  method: "session.subscribe",
  params: SubscriptionRequest
}

export interface sessionUnsubscribe {
  method: "session.unsubscribe",
  params: SubscriptionRequest
}


export interface Command<T> {
  method: string;
  params: T
}

export type SubscriptionType  = string | string[];

export interface Event {
  method: string;
  params: SubscriptionRequest
}

export interface Status {
  method: string,
  params: Empty
}

