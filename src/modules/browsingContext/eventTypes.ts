import { BrowsingContextInfo } from "./types";

export interface BrowsingContextCreated {
  method: "browsingContext.contextCreated",
  params: BrowsingContextCreatedParameters
}

export type BrowsingContextCreatedParameters = {
  context: BrowsingContextInfo
}