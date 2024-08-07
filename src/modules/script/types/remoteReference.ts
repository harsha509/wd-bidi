import {SharedId} from "./sharedId";
import {Handle} from "./handle";

export type RemoteReference = SharedReference | RemoteObjectReference;

export interface SharedReference {
    sharedId: SharedId;
    handle?: Handle;
}

interface RemoteObjectReference {
    handle: Handle;
    sharedId?: SharedId;
}




