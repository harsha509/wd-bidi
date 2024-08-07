import {RemoteValue} from "./remoteValue";
import {StackTrace} from "./stackTrace";

export interface ExceptionDetails {
    columnNumber: number,
    exception: RemoteValue,
    lineNumber: number,
    stackTrace: StackTrace,
    text: string,
}