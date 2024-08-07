import {RemoteValue} from "./remoteValue";
import {realm} from "./realm";
import {ExceptionDetails} from "./exceptionDetails";

export type EvaluateResult = EvaluateResultSuccess | EvaluateResultException


type EvaluateResultSuccess = {
    type: 'success',
    result: RemoteValue,
    realm: realm
}

type EvaluateResultException = {
    type: 'exception',
    exceptionDetails: ExceptionDetails,
    realm: realm
}