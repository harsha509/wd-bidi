import {ProxyConfiguration} from "./proxyConfiguration";
import {UserPromptHandler} from "./userPromptHandler";

export type CapabilityRequest = {
  acceptInsecureCerts?: boolean,
  browserName?: string,
  browserVersion?: string,
  platformName?: string,
  proxy?: ProxyConfiguration,
  unhandledPromptBehavior?: UserPromptHandler
}

