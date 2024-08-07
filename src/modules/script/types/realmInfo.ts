import {realm} from "./realm";
import {BrowsingContext} from "../../browsingContext/types";

export type RealmInfo = WindowRealmInfo
| DedicatedWorkerRealmInfo
| SharedWorkerRealmInfo
| ServiceWorkerRealmInfo
| WorkerRealmInfo
| PaintWorkletRealmInfo
| AudioWorkletRealmInfo
| WorkletRealmInfo

type BaseRealmInfo = {
    realm: realm,
    origin: string
}

type WindowRealmInfo = BaseRealmInfo & {
    type: 'window',
    context: BrowsingContext,
    sandbox?: string
}

type DedicatedWorkerRealmInfo = BaseRealmInfo & {
    type:'dedicated-worker',
    owners: realm[]
}

type SharedWorkerRealmInfo = BaseRealmInfo & {
    type: 'shared-worker'
}

type ServiceWorkerRealmInfo = BaseRealmInfo & {
    type: 'service-worker'
}

type WorkerRealmInfo = BaseRealmInfo & {
    type: 'worker'
}

type PaintWorkletRealmInfo = BaseRealmInfo & {
    type: 'paint-worklet'
}

type AudioWorkletRealmInfo = BaseRealmInfo & {
    type: 'audio-worklet'
}

type WorkletRealmInfo = BaseRealmInfo & {
    type: 'worklet'
}