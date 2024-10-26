export type UserContext = string;
export type ClientWindow = string;
export type Empty = NonNullable<unknown>;

export type UserContextInfo = {
  userContext: UserContext
}

export type ClientWindowInfo = {
  active: boolean,
  clientWindow: ClientWindow
  height: number,
  state: 'fullscreen' | 'maximized' | 'minimized' | 'normal'
  width: number,
  x: number,
  y: number,
}

export interface BrowserClose {
  method: 'browser.close',
  params: Empty
}

export interface CreateUserContext {
  method:'browser.createUserContext',
  params: Empty
}

export type CreateUserContextResult = UserContextInfo;

export interface GetClientWindows {
  method: 'browser.getClientWindows'
  params: Empty
}

export type GetClientWindowsResult = {
  clientWindow: ClientWindowInfo[]
}

export interface SetClientWindowState {
  method: 'browser.setClientWindowState',
  params: SetClientWindowStateParameters
}

export type SetClientWindowStateParameters = {
  clientWindow: ClientWindow
} & ( ClientWindowNamedState | ClientWindowRectState )

export type ClientWindowNamedState = {
  state: "fullscreen" | "maximized" | "minimized"
}

export type ClientWindowRectState = {
  state: "normal",
  width?: number,
  height?: number,
  x?: number,
  y?: number,
}

export type SetClientWindowStateResult = ClientWindowInfo

export interface GetUserContexts {
  method: "browser.getUserContexts",
  params: Empty,
}

export type GetUserContextsResult = {
  userContexts:UserContextInfo[]
}

export interface RemoveUserContext {
  method: "browser.removeUserContext",
  params: RemoveUserContextParameters,
}

export type RemoveUserContextParameters = {
  userContext: UserContext
}