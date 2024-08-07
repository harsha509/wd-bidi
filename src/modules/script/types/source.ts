import {realm} from "./realm";
import {BrowsingContext} from "../../browsingContext/types";

export interface Source {
    realm: realm,
    context?:BrowsingContext
}