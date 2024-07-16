import {BrowsingContext} from "../browsingContext/types";
import {NetworkBytesValue, NetworkCookie, NetworkSameSite} from "../network/types";

export interface StoragePartitionKey {
  userContext?: string,
  sourceOrigin?:string
}

export interface StorageGetCookies {
  method: "storage.getCookies",
  params: StorageGetCookiesParameters
}

export interface StorageGetCookiesParameters {
  filter?: StorageCookieFilter,
  partition?: StoragePartitionDescriptor
}

type StoragePartitionDescriptor =
  StorageBrowsingContextPartitionDescriptor
  | StorageKeyPartitionDescriptor



interface StorageKeyPartitionDescriptor extends  StoragePartitionKey{
  type:'storageKey',
}


interface StorageBrowsingContextPartitionDescriptor {
  type: "context",
  context: BrowsingContext
}

export interface StorageCookieFilter {
  name?: string,
  value?: NetworkBytesValue,
  domain?:string,
  path?:string,
  size?:number,
  httpOnly?: boolean,
  secure?: boolean,
  sameSite?: NetworkSameSite,
  expiry?: number
}

export interface StorageGetCookiesResult {
  cookies: NetworkCookie[],
  partitionKey: StoragePartitionKey
}


export interface SetCookie {
  method:'storage.setCookie',
  params: StorageSetCookieParameters
}

export interface StorageSetCookieParameters  {
  cookie: StoragePartialCookie,
  partition?:StoragePartitionDescriptor
}

interface StoragePartialCookie {
  name: string,
  value: NetworkBytesValue,
  domain: string,
  path?:string,
  httpOnly?:boolean,
  secure?:boolean,
  sameSite?:NetworkSameSite,
  expiry?: number
}


interface ResultType {
  partitionKey: StoragePartitionKey
}
export type StorageSetCookieResult = ResultType



export interface StorageDeleteCookies {
  method:'storage.deleteCookies',
  params: StorageDeleteCookiesParameters
}

export interface StorageDeleteCookiesParameters {
  filter?:StorageCookieFilter,
  partition?:StoragePartitionDescriptor
}

export type DeleteCookiesResult = ResultType