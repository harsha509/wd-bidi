import {BrowsingContext, BrowsingContextInfo, BrowsingContextNavigationInfo, UserPromptType} from "./types";
import {sessionUserPromptHandlerType} from "../session/types";

export type BrowsingContextUserPromptClosedParameters = {
  context: BrowsingContext,
  accepted: boolean,
  type: UserPromptType,
  userText?: string
};

export type BrowsingContextUserPromptOpenedParameters = {
  context: BrowsingContext,
  handler: sessionUserPromptHandlerType,
  message: string,
  type: UserPromptType,
  defaultValue?: string
};

type BrowsingContextEventParams =
  | BrowsingContextInfo
  | BrowsingContextNavigationInfo
  | BrowsingContextUserPromptClosedParameters
  | BrowsingContextUserPromptOpenedParameters;

export interface BrowsingContextEvent<T extends BrowsingContextEventParams> {
  method: `browsingContext.${BrowsingContextEventName}`;
  params: T;
}

export type BrowsingContextEventName =
  'contextCreated'
  | 'contextDestroyed'
  | 'navigationStarted'
  | 'fragmentNavigated'
  | 'domContentLoaded'
  | 'load'
  | 'downloadWillBegin'
  | 'navigationAborted'
  | 'navigationFailed'
  | 'userPromptClosed'
  | 'userPromptOpened';

export type EventSubscriptionType = BrowsingContextEvent<BrowsingContextEventParams>;