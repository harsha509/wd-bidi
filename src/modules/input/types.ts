import {SharedReference} from "../script/types";
import {BrowsingContext} from "../browsingContext/types";

type InputOrigin = 'viewport' | 'pointer' | InputElementOrigin;
type PointerType = "mouse" | "pen" | "touch";

export interface InputElementOrigin {
  type: 'element',
  element: SharedReference
}

export interface InputPerformActions {
  method:'input.performActions',
  params: InputPerformActionsParameters
}

export interface InputPerformActionsParameters {
  context: BrowsingContext
  actions: InputSourceActions[]
}

type InputSourceActions =
  InputNoneSourceActions
  | InputKeySourceActions
  | InputPointerSourceActions
  | InputWheelSourceActions;


type InputNoneSourceAction = InputPauseAction;

type InputNoneSourceActions = {
  type: 'none',
  id: string,
  actions: InputNoneSourceAction[]
}

type InputKeySourceAction = InputPauseAction
  | InputKeyDownAction
  | InputKeyUpAction;

type InputKeySourceActions = {
  type: 'key',
  id: string,
  actions: InputKeySourceAction
}


type InputPointerSourceAction = InputPauseAction
| InputPointerDownAction
| InputPointerUpAction
| InputPointerMoveAction


type InputPointerParameters = {
  pointerType?: PointerType
}
type InputPointerSourceActions = {
  type: 'pointer',
  id: string,
  parameters?: InputPointerParameters,
  actions: InputPointerSourceAction[]
}

type InputWheelSourceActions = {
  type:'wheel',
  id: string,
  actions: InputWheelSourceAction[]
}

type InputWheelSourceAction = InputPauseAction | InputWheelScrollAction

type InputPauseAction = {
  type:'pause',
  duration?:number
}

type InputKeyDownAction = {
  type:'keyDown',
  value: string
}

type InputKeyUpAction = {
  type:'keyUp',
  value: string
}

type InputPointerUpAction = {
  type:'pointerUp',
  button: number
}

interface CommonInputProperties {
  width?: number;
  height?: number;
  pressure?: number;
  tangentialPressure?: number;
  twist?: number;
  altitudeAngle?: number;
  azimuthAngle?: number;
}

type InputPointerDownAction = CommonInputProperties & {
  type: 'pointerDown';
  button: number;
}

interface InputPointerMoveAction extends CommonInputProperties {
  type: 'pointerMove';
  x: number;
  y: number;
  duration?: number;
  origin?: InputOrigin;
}

interface InputWheelScrollAction {
  type: 'scroll';
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  duration?: number;
  origin?: string;
}

export interface InputReleaseActions {
  method:'input.releaseActions',
  params: InputReleaseActionParameters
}

export type InputReleaseActionParameters = {
  context: BrowsingContext
}

export interface InputSetFiles {
  method: "input.setFiles",
  params: InputSetFilesParameters
}

export type InputSetFilesParameters = {
  context: BrowsingContext,
  element: SharedReference,
  files: string[]
}