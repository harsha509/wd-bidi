export type UserContext = string;
export type Empty = NonNullable<unknown>;

export type UserContextInfo = {
  userContext: UserContext
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