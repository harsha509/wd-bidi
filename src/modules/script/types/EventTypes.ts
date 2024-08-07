import {Channel} from "./channel";
import {RemoteValue} from "./remoteValue";
import {Source} from "./source";
import {RealmInfo} from "./realmInfo";
import {realm} from "./realm";

export interface ScriptMessageParameters {
  channel: Channel,
  data: RemoteValue,
  source: Source,
}

export type ScriptRealmInfo =  RealmInfo;

export interface ScriptRealmDestroyedParameters {
  realm: realm
}


type ScriptEventParams =
  | ScriptMessageParameters
  | ScriptRealmInfo
  | ScriptRealmDestroyedParameters;

export interface ScriptEvent<T extends ScriptEventParams> {
  method: `script.${ScriptEventName}`,
  params: T
}

export type ScriptEventName =
  'message'
  | 'realmCreated'
  | 'realmDestroyed'

export type ScriptEventSubscriptionType = ScriptEvent<ScriptEventParams>