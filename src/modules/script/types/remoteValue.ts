import {PrimitiveProtocolValue} from "./primitiveProtocolValue";
import {BaseRemoteValue} from "./commonTypes";
import {BrowsingContext} from "../../browsingContext/types";

type SharedId = string;

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

type SymbolRemoteValue = BaseRemoteValue & {
    type: "symbol",
}

type ArrayRemoteValue = BaseRemoteValue & {
    type: "array",
    value?: RemoteValue[],
}

type ObjectRemoteValue = BaseRemoteValue & {
    type: "object",
    value?: MappingRemoteValue,
}

type FunctionRemoteValue = BaseRemoteValue & {
    type: "function",
}

type RegExpRemoteValue = BaseRemoteValue & RegExpLocalValue;

type DateRemoteValue = BaseRemoteValue & DateLocalValue;

type RegExpValue = {
    pattern: string,
    flags?: string,
}

type RegExpLocalValue = {
    type: "regexp",
    value: RegExpValue,
}


type DateLocalValue = {
    type: "date",
    value: string
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

type MapRemoteValue = BaseRemoteValue & {
    type: "map",
    value?: MappingRemoteValue,
}

type SetRemoteValue = BaseRemoteValue & {
    type: "set",
    value?: ListRemoteValue
}

type ArrayBufferRemoteValue = BaseRemoteValue & {
    type: "arraybuffer",
}

type NodeListRemoteValue = BaseRemoteValue & {
    type: "nodelist",
    value?: ListRemoteValue,
}

type HTMLCollectionRemoteValue = BaseRemoteValue & {
    type: "htmlcollection",
    value?: ListRemoteValue,
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
