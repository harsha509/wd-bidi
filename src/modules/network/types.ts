
import {BrowsingContext, Navigation} from "../browsingContext/types";
import {StackTrace} from "../script/types";

export type NetworkSameSite = 'strict' | 'lax' | 'none'

// The network.Intercept type represents the id of a network intercept.
type NetworkIntercept = string;
type NetworkRequest = string;

export interface NetworkCookie {
  name: string,
  value: NetworkBytesValue,
  domain: string,
  path: string,
  size: number,
  httpOnly: boolean,
  secure: boolean,
  sameSite: NetworkSameSite,
  expiry?:number
}

export interface NetworkCookieHeader {
  name: string,
  value: NetworkBytesValue
}

export type NetworkBytesValue = StringValue | Base64Value;

type StringValue = {
  type: 'string',
  value: string
}

export type Base64Value = {
  type: 'base64',
  value: string
}

export interface NetworkAuthChallenge {
  scheme: string,
  realm: string
}

// The network.AuthCredentials type represents the
// response to a request for authorization credentials.
export interface NetworkAuthCredentials {
  type: 'password',
  username: string,
  password: string
}

export interface NetWorkBaseParameters {
  context: BrowsingContext | null,
  isBlocked: boolean,
  navigation: Navigation | null,
  redirectCount: number,
  request: NetworkRequestData,
  timestamp: number,
  intercepts?: NetworkIntercept[]
}

export interface NetworkRequestData {
  request: NetworkRequest,
  url: string,
  method: string,
  headers: NetworkHeader[],
  cookies: NetworkCookie[],
  headerSize: number,
  bodySize: number,
  timings: NetworkFetchTimingInfo
}

export interface NetworkCookie {
  name: string,
  value: NetworkBytesValue,
  domain: string,
  path: string,
  size: number,
  httpOnly: boolean,
  secure: boolean,
  sameSite: NetworkSameSite,
}

export interface NetworkFetchTimingInfo {
  timeOrigin: number,
  requestTime: number,
  redirectStart: number,
  redirectEnd: number,
  fetchStart: number,
  dnsStart: number,
  dnsEnd: number,
  connectStart: number,
  connectEnd: number,
  tlsStart: number,
  requestStart: number,
  responseStart: number,
  responseEnd: number
}


export interface NetworkHeader {
  name: string,
  value: NetworkBytesValue
}

export interface NetworkInitiator {
  type: 'parser' | 'script' | 'preflight' | 'other',
  columnNumber?: number,
  lineNumber?: number,
  stackTrace?: StackTrace,
  request?: NetworkRequest
}


export interface NetworkResponseContent {
  size: number
}

export interface NetworkResponseData {
  url: string,
  protocol: string,
  status: number,
  statusText: string,
  fromCache: boolean,
  headers: NetworkHeader[],
  mimeType: string,
  bytesReceived: number,
  headerSize: number | null,
  bodySize: number | null,
  content: NetworkResponseContent,
  authChallenges?: NetworkAuthChallenge[]
}

export interface NetworkSetCookieHeader {
  name: string,
  value: NetworkBytesValue,
  domain?: string,
  httpOnly?: boolean,
  expiry?: string,
  maxAge?: number,
  path?: string,
  sameSite?: NetworkSameSite,
  secure?: boolean
}

export type NetworkUrlPattern = NetworkUrlPatternPattern | NetworkUrlPatternString;

export interface NetworkUrlPatternPattern {
  type: 'pattern',
  protocol?: string,
  hostname?: string,
  port?: string,
  pathname?: string,
  search?: string
}

export interface NetworkUrlPatternString {
  type: 'string',
  pattern: string,
}


export interface NetworkAddIntercept {
  method: 'network.addIntercept',
  params: NetworkAddInterceptParameters
}


export interface NetworkAddInterceptParameters {
  phases: NetworkInterceptPhase[],
  contexts?: BrowsingContext[],
  urlPatterns?: NetworkUrlPattern[]
}

export type NetworkInterceptPhase = 'beforeRequestSent' | 'responseStarted' | 'authRequired';

export interface NetworkAddInterceptResult {
  intercept: NetworkIntercept
}


export interface NetworkContinueRequest {
  method: 'network.continueRequest',
  params: NetworkContinueRequestParameters
}

export interface NetworkContinueRequestParameters {
  request: NetworkRequest,
  body?: NetworkBytesValue,
  cookies?: NetworkCookieHeader[],
  headers?: NetworkHeader[],
  method?: string,
  url?: string
}

export interface NetworkContinueResponse {
  method: 'network.continueResponse',
  params: NetworkContinueResponseParameters,
}

export interface NetworkContinueResponseParameters {
  request: NetworkRequest,
  cookies?:NetworkSetCookieHeader[],
  credentials?: NetworkAuthCredentials,
  headers?: NetworkHeader[],
  reasonPhrase?: string,
  statusCode?: number
}

export interface NetworkContinueWithAuth{
  method: 'network.continueWithAuth',
  params: NetworkContinueWithAuthParameters
}

export interface NetworkContinueWithAuthParameters {
  request: NetworkRequest,
  //Todo
  // data: NetworkContinueWithAuthNoCredentials | NetworkContinueWithAuthCredentials
}

export interface NetworkContinueWithAuthCredentials {
  action: 'provideCredentials',
  credentials: NetworkAuthCredentials
}

export interface NetworkContinueWithAuthNoCredentials {
  action: 'default' | 'cancel'
}


export interface NetworkFailRequest {
  method: 'network.failRequest',
  params: NetworkFailRequestParameters
}

export interface NetworkFailRequestParameters {
  request: NetworkRequest
}

export interface NetworkProvideResponse {
  method: 'network.provideResponse',
  params: NetworkProvideResponseParameters
}

export type NetworkProvideResponseParameters = NetworkContinueResponseParameters;


export interface NetworkRemoveIntercept {
  method: 'network.removeIntercept',
  params: NetworkRemoveInterceptParameters
}

export interface NetworkRemoveInterceptParameters {
  intercept: NetworkIntercept
}


export interface NetworkSetCacheBehavior {
  method: 'network.setCacheBehavior',
  params: NetworkSetCacheBehaviorParameters
}


export interface NetworkSetCacheBehaviorParameters {
  cacheBehaviour: 'default' | 'bypass',
  contexts: BrowsingContext[]
}