import {UserContext} from "../browser/types";
import {ScriptNodeRemoteValue, SerializationOptions, SharedReference} from "../script/types";

export type BrowsingContext = string;
export type Navigation = string;

export interface BrowsingContextInfoList {
  browsingContextInfoList: BrowsingContextInfo[];
}

export type BrowsingContextInfo = {
  children: BrowsingContext[] | null;
  context: BrowsingContext;
  originalOpener: BrowsingContext | null;
  url: string;
  userContext: UserContext;
  parent?: BrowsingContext | null;
}

export interface AccessibilityLocator {
  type: "accessibility";
  value: {
    name?: string;
    role?: string;
  };
}

export interface CssLocator {
  type: "css";
  value: string;
}

export interface InnerTextLocator {
  type: "innerText";
  value: string;
  ignoreCase?: boolean;
  matchType?: "full" | "partial";
  maxDepth?: number;
}

export interface XPathLocator {
  type: "xpath";
  value: string;
}

export type Locator = AccessibilityLocator | CssLocator | InnerTextLocator | XPathLocator;

export interface BrowsingContextNavigationInfo {
  context: BrowsingContext;
  navigation: Navigation | null;
  timestamp: number;
  url: string;
}

export type ReadinessState = "none" | "interactive" | "complete";

export type UserPromptType = "alert" | "beforeunload" | "confirm" | "prompt";

export interface BrowsingContextActivate {
  method: 'browsingContext.activate';
  params: BrowsingContextActivateParameters;
}

export type BrowsingContextActivateParameters = {
  context: BrowsingContext;
}


export interface BrowsingContextCaptureScreenshot {
  method:'browsingContext.captureScreenshot',
  params: BrowsingContextCaptureScreenshotParameters
}


export type BrowsingContextCaptureScreenshotParameters = {
  context: BrowsingContext,
  origin?: 'viewport' | 'document',
  format?: BrowsingContextImageFormat,
  clip: BrowsingContextClipRectangle
}


type BrowsingContextImageFormat = {
  type: string,
  quality?: number // ranges from 0.0 - 1.0
}

type BrowsingContextClipRectangle = BoxClipRectangle | ElementClipRectangle;

type ElementClipRectangle = {
  type:'element',
  element: SharedReference
}

type BoxClipRectangle = {
  type: 'box',
  x: number,
  y: number,
  width: number,
  height: number
}

export interface CaptureScreenshotResult {
  data: string;
}

export interface BrowsingContextCreate {
  method:'browsingContext.create',
  params: BrowsingContextCreateParameters
}

type BrowsingContextCreateType = 'tab' | 'window'

export type BrowsingContextCreateParameters = {
  type: BrowsingContextCreateType,
  referenceContext?: BrowsingContext,
  background?: boolean,
  userContext?: UserContext
}

export type BrowsingContextCreateResult = {
  context: BrowsingContext
}


export interface BrowsingContextClose {
  method: "browsingContext.close",
  params: BrowsingContextCloseParameters
}

export type BrowsingContextCloseParameters = {
  context: BrowsingContext,
  promptUnload?:boolean
}


export interface BrowsingContextGetTree  {
  method:'browsingContext.getTree',
  params: BrowsingContextGetTreeParameters
}

export type BrowsingContextGetTreeParameters = {
  maxDepth?: number,
  root?: BrowsingContext
}

export type BrowsingContextGetTreeResultType = {
  context: BrowsingContextInfoList[]
}

export interface BrowsingContextNavigate {
  method: "browsingContext.navigate",
  params: BrowsingContextNavigateParameters
}

export type BrowsingContextNavigateParameters = {
  context: BrowsingContext,
  url: string,
  wait?: BrowsingContextReadinessState
}

export type BrowsingContextReadinessState = ReadinessState

export interface BrowsingContextNavigateResultType {
  navigation: Navigation | null
  url: string
}

export interface BrowsingContextHandleUserPrompt {
  method: "browsingContext.handleUserPrompt",
  params: BrowsingContextHandleUserPromptParameters
}

export type BrowsingContextHandleUserPromptParameters = {
  context:BrowsingContext,
  accept?: boolean,
  userText?: string
}

export interface BrowsingContextLocateNodes {
  method: "browsingContext.locateNodes",
  params: BrowsingContextLocateNodesParameters
}

export type BrowsingContextLocateNodesParameters = {
  context: BrowsingContext,
  locator: Locator,
  maxNodeCount?: number,
  serializationOptions?: SerializationOptions
  startNodes?: SharedReference
}

export interface BrowsingContextLocateNodesResultType {
  nodes: ScriptNodeRemoteValue[]
}

export interface BrowsingContextReload {
  method:'browsingContext.reload',
  params: BrowsingContextReloadParameters
}

export type BrowsingContextReloadParameters = {
  context: BrowsingContext,
  ignoreCache?:boolean,
  wait?: ReadinessState
}

export type BrowsingContextReloadResultType = Navigation;

export interface BrowsingContextSetViewport {
  method:'browsingContext.setViewport',
  params: BrowsingContextSetViewportParameters
}

export type BrowsingContextSetViewportParameters = {
  context: BrowsingContext,
  viewport?: BrowsingContextViewport | null,
  devicePixelRatio: number | null
}

type BrowsingContextViewport = {
  width: number,
  height: number
}


export interface BrowsingContextTraverseHistory {
  method: 'browsingContext.traverseHistory',
  params: BrowsingContextTraverseHistoryParameters
}

export type BrowsingContextTraverseHistoryParameters = {
  context: BrowsingContext,
  delta: number
}


export interface BrowsingContextPrint {
  method:'browsingContext.print',
  params: BrowsingContextPrintParams
}

export type BrowsingContextPrintParams = {
  context: BrowsingContext,
  background?: boolean,
  margin?: BrowsingContextPrintMarginParameters,
  orientation?: 'portrait' | 'landscape',
  page?: BrowsingContextPrintPageParams,
  pageRanges?: (number| string)[],
  scale?:  number,
  shrinkToFit?: boolean
}

export type BrowsingContextPrintMarginParameters = {
  height?: number,
  width?: number
}

export type BrowsingContextPrintPageParams = {
  bottom?: number,
  left?: number,
  right?: number,
  top?: number
}

export type BrowsingContextPrintResult = {
  data: string
}

