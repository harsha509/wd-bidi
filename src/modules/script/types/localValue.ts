import {PrimitiveProtocolValue} from "./primitiveProtocolValue";
import {RemoteReference} from "./remoteReference";
type ChannelValue = string;

export type LocalValue =
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

