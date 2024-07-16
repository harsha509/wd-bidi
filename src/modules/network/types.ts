export type NetworkSameSite = 'strict' | 'lax' | 'none'

export interface NetworkCookie {
  name: string,
  value: NetworkBytesValue,
  domain: string,
  path: string,
  size: number,
  httpOnly: boolean,
  secure: boolean,
  sameSite: NetworkSameSite,
  expiry?:number
}


export type NetworkBytesValue = StringValue | Base64Value;

type StringValue = {
  type: 'string',
  value: string
}

export type Base64Value = {
  type: 'base64',
  value: string
}
