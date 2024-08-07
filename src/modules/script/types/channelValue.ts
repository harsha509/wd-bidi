import {Channel} from "./channel";
import {SerializationOptions} from "./serializationOptions";
import {ResultOwnership} from "./resultOwnership";

export interface ChannelValue {
    type: 'channel',
    value: ScriptChannelProperties
}

type ScriptChannelProperties = {
    channel: Channel,
    serializationOptions?: SerializationOptions,
    ownership?: ResultOwnership
}