import {CapabilityRequest} from "./capabilityRequest";

export interface CapabilitiesRequest {
  alwaysMatch?: CapabilityRequest,
  firstMatch?: CapabilityRequest[]
}