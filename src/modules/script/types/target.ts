import {realm} from "./realm";
import {BrowsingContext} from "../../browsingContext/types";

export type Target = ContextTarget | RealmTarget

type RealmTarget = {
    realm: realm
}

type ContextTarget = {
    context: BrowsingContext,
    sandbox?: string
}