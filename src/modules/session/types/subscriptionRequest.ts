import {BrowsingContext} from "../../browsingContext/types";

export interface SubscriptionRequest {
  events: string | string[];
  contexts?: BrowsingContext| BrowsingContext[];
}