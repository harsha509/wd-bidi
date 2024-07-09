import { BrowsingContext} from "../browsingContext/types";

type Handle = string;
type SharedId = string;
type ChannelValue = string;
export type InternalId = string;

export type RemoteReference = SharedReference | RemoteObjectReference;

export interface SharedReference {
  sharedId: SharedId;
  handle?: Handle;
}

interface RemoteObjectReference {
  handle: Handle;
  sharedId?: SharedId;
}

export type SerializationOptions = {
  maxDomDepth?: number| null;
  maxObjectDepth?: number | null;
  includeShadowTree?: "none" | "open" | "all";
}

type BaseRemoteValue = {
  handle?: Handle,
  internalId?: InternalId,
}

type SymbolRemoteValue = BaseRemoteValue & {
  type: "symbol",
}

type ArrayRemoteValue = BaseRemoteValue & {
  type: "array",
  value?: RemoteValue[],
}

type ObjectRemoteValue = BaseRemoteValue & {
  type: "object",
  value?: MappingRemoteValue[],
}

type FunctionRemoteValue = BaseRemoteValue & {
  type: "function",
}

type RegExpRemoteValue = BaseRemoteValue & RegExpLocalValue;

type DateRemoteValue = BaseRemoteValue & DateLocalValue;

type MapRemoteValue = BaseRemoteValue & {
  type: "map",
  value?: MappingRemoteValue[],
}

type SetRemoteValue = BaseRemoteValue & {
  type: "set",
  value?: RemoteValue[],
}

type WeakMapRemoteValue = BaseRemoteValue & {
  type: "weakmap",
}

type WeakSetRemoteValue = BaseRemoteValue & {
  type: "weakset",
}

type GeneratorRemoteValue = BaseRemoteValue & {
  type: "generator",
}

type ErrorRemoteValue = BaseRemoteValue & {
  type: "error",
}

type ProxyRemoteValue = BaseRemoteValue & {
  type: "proxy",
}

type PromiseRemoteValue = BaseRemoteValue & {
  type: "promise",
}

type TypedArrayRemoteValue = BaseRemoteValue & {
  type: "typedarray",
}

type ArrayBufferRemoteValue = BaseRemoteValue & {
  type: "arraybuffer",
}

type NodeListRemoteValue = BaseRemoteValue & {
  type: "nodelist",
  value?: RemoteValue[],
}

type HTMLCollectionRemoteValue = BaseRemoteValue & {
  type: "htmlcollection",
  value?: RemoteValue[],
}

export type ScriptNodeRemoteValue = BaseRemoteValue & {
  type: "node",
  sharedId?: SharedId,
  value?: NodeProperties,
}

type NodeProperties = {
  nodeType: number,
  childNodeCount: number,
  attributes?: { [key:string]: string },
  children?: ScriptNodeRemoteValue[],
  localName?: string,
  mode?: "open" | "closed",
  namespaceURI?: string,
  nodeValue?: string,
  shadowRoot?: ScriptNodeRemoteValue | null,
}

type WindowProxyRemoteValue = BaseRemoteValue & {
  type: "window",
  value: WindowProxyProperties,
}

type WindowProxyProperties = BrowsingContext

export type RemoteValue = PrimitiveProtocolValue |
  SymbolRemoteValue |
  ArrayRemoteValue |
  ObjectRemoteValue |
  FunctionRemoteValue |
  RegExpRemoteValue |
  DateRemoteValue |
  MapRemoteValue |
  SetRemoteValue |
  WeakMapRemoteValue |
  WeakSetRemoteValue |
  GeneratorRemoteValue |
  ErrorRemoteValue |
  ProxyRemoteValue |
  PromiseRemoteValue |
  TypedArrayRemoteValue |
  ArrayBufferRemoteValue |
  NodeListRemoteValue |
  HTMLCollectionRemoteValue |
  ScriptNodeRemoteValue |
  WindowProxyRemoteValue;

export type ListRemoteValue = RemoteValue[];

type MappingRemoteValue = [(RemoteValue | string), RemoteValue];

type PrimitiveProtocolValue =
  UndefinedValue |
  NullValue |
  StringValue |
  NumberValue |
  BooleanValue |
  BigIntValue;

type UndefinedValue = {
  type: "undefined";
};

type NullValue = {
  type: "null";
};

type StringValue = {
  type: "string";
  value: string;
};

type SpecialNumber = "NaN" | "-0" | "Infinity" | "-Infinity";

type NumberValue = {
  type: "number";
  value: number | SpecialNumber;
};

type BooleanValue = {
  type: "boolean";
  value: boolean;
};

type BigIntValue = {
  type: "bigint";
  value: string;
};

type LocalValue =
  RemoteReference
  | PrimitiveProtocolValue
  | ChannelValue
  | ArrayLocalValue
  | DateLocalValue
  | MapLocalValue
  | ObjectLocalValue
  | RegExpLocalValue
  | SetLocalValue;

type ListLocalValue = LocalValue[];

type ArrayLocalValue = {
  type: "array",
  value: ListLocalValue,
}

type DateLocalValue = {
  type: "date",
  value: string
}

type MappingLocalValue = [(LocalValue | string), LocalValue];

type MapLocalValue = {
  type: "map",
  value: MappingLocalValue,
}

type ObjectLocalValue = {
  type: "object",
  value: MappingLocalValue,
}

type RegExpValue = {
  pattern: string,
  flags?: string,
}

type RegExpLocalValue = {
  type: "regexp",
  value: RegExpValue,
}

type SetLocalValue = {
  type: "set",
  value: ListLocalValue,
}