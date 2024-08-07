import {ChannelValue} from "./channelValue";
import {BrowsingContext} from "../../browsingContext/types";
import {PreloadScript} from "./preloadScript";
import {Handle} from "./handle";
import {Target} from "./target";
import {LocalValue} from "./localValue";
import {ResultOwnership} from "./resultOwnership";
import {SerializationOptions} from "./serializationOptions";
import {RealmType} from "./realmType";
import {RealmInfo} from "./realmInfo";

// add preloadScript types
export interface AddPreloadScript {
  method: 'script.addPreloadScript',
  params: AddPreloadScriptParameters
}

export interface AddPreloadScriptParameters {
  functionDeclaration: string;
  arguments?: ChannelValue[];
  contexts?: BrowsingContext[];
  sandbox?: string;
}

export interface AddPreloadScriptResult {
  script: PreloadScript;
}


// disown types

export interface Disown {
  method: 'script.disown',
  params: DisownParameters
}

export interface DisownParameters {
  handles: Handle[],
  target: Target
}

// Types: callFunction

export interface CallFunction {
  method: 'script.callFunction',
  params: CallFunctionParameters
}

export interface CallFunctionParameters {
  functionDeclaration: string,
  awaitPromise: boolean,
  target: Target,
  arguments?: LocalValue[],
  resultOwnership?: ResultOwnership,
  serializationOptions?: SerializationOptions,
  this?: LocalValue,
  userActivation?: boolean;
}

// Types: Evaluate

export interface Evaluate {
  method: 'script.evaluate',
  params: EvaluateParameters
}

export interface EvaluateParameters {
  expression: string,
  target: Target,
  awaitPromise: boolean,
  resultOwnership?: ResultOwnership,
  serializationOptions?: SerializationOptions,
  userActivation?: boolean
}

//Type: getRealms

export interface GetRealms {
  method: 'script.getRealms',
  params: GetRealmsParameters
}

export interface GetRealmsParameters {
  context?: BrowsingContext,
  type?:RealmType
}

export interface GetRealmsResult {
  realms: RealmInfo[]
}

// Type: remove preload script

export interface RemovePreloadScript {
  method: 'script.removePreloadScript',
  params: RemovePreloadScriptParameters
}

export interface RemovePreloadScriptParameters {
  script: PreloadScript
}