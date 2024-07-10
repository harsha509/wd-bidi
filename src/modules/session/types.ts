import { BrowsingContext } from '../browsingContext/types'

export type SubscriptionType  = string | string[];
export type Empty = NonNullable<unknown>;

export interface SubscriptionRequest {
  events: string[];
  contexts?: BrowsingContext| BrowsingContext[];
}

export interface Event {
  method: string;
  params: SubscriptionRequest
}

export interface Command<T> {
  method: string;
  params: T
}

export interface Status {
  method: string,
  params: Empty
}

export interface SessionStatusResult {
  ready: boolean;
  message: string;
}

export interface SessionStatusParams {
  method: 'session.status';
  params: Record<string, never>;
}

export type sessionNew = {
  method: "session.new",
  params: sessionNewParameters
}

export type sessionNewParameters = {
  capabilities: sessionCapabilitiesRequest
}

export type sessionCapabilitiesRequest = {
  acceptInsecureCerts?: boolean,
  browserName?: string,
  browserVersion?: string,
  platformName?: string,
  proxy?: sessionProxyConfiguration,
  unhandledPromptBehavior?: sessionUserPromptHandler
}

type sessionProxyConfiguration =
  | sessionAutodetectProxyConfiguration
  | sessionDirectProxyConfiguration
  | sessionManualProxyConfiguration
  | sessionPacProxyConfiguration
  | sessionSystemProxyConfiguration;

type sessionAutodetectProxyConfiguration = {
  proxyType: "autodetect";
};

type sessionDirectProxyConfiguration = {
  proxyType: "direct";
};

type sessionManualProxyConfiguration = {
  proxyType: "manual";
  ftpProxy?: string;
  httpProxy?: string;
  sslProxy?: string;
  socksProxyConfig?: sessionSocksProxyConfiguration;
  noProxy?: string[];
};

type sessionSocksProxyConfiguration = {
  socksProxy: string;
  socksVersion: number; // value must be between 0 and 255
};

type sessionPacProxyConfiguration = {
  proxyType: "pac";
  proxyAutoconfigUrl: string;
};

type sessionSystemProxyConfiguration = {
  proxyType: "system";
};


type sessionUserPromptHandler = {
  alert?: sessionUserPromptHandlerType,
  beforeUnload?: sessionUserPromptHandlerType,
  confirm?: sessionUserPromptHandlerType,
  default?: sessionUserPromptHandlerType,
  prompt?: sessionUserPromptHandlerType
}


type sessionUserPromptHandlerType = "accept" | "dismiss" | "ignore";

export type SessionNewResult = {
  sessionId: string,
  capabilities: {
    acceptInsecureCerts: boolean,
    browserName: string,
    browserVersion: string,
    platformName: string,
    setWindowRect: boolean,
    userAgent: string,
    proxy?: sessionProxyConfiguration,
    unhandledPromptBehavior?: sessionUserPromptHandler,
    webSocketUrl?: string,
  }
}

export interface SessionEndParams {
  method: 'session.end';
  params: Empty
}