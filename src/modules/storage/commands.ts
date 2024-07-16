import {BiDi} from "../../index";
import {
  DeleteCookiesResult,
  SetCookie, StorageDeleteCookies, StorageDeleteCookiesParameters,
  StorageGetCookies,
  StorageGetCookiesParameters,
  StorageGetCookiesResult,
  StorageSetCookieParameters, StorageSetCookieResult
} from "./types";

/**
 * This class provides methods that allow the manipulation of cookies
 */
export class Storage {
  private _ws: BiDi
  
  /**
   * Initializes a new instance of Storage
   * @param {BiDi} BidiConnection - A bidirectional connection object
   */
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
  }
  
  /**
   * Gets cookies from the storage
   * @param {StorageGetCookiesParameters} params - Parameters required to get the cookies
   * @return {Promise<StorageGetCookiesResult>} A promise that resolves to the result of getting the cookies
   */
  async getCookies(params: StorageGetCookiesParameters): Promise<StorageGetCookiesResult> {
    const parameters: StorageGetCookies = {
      method:"storage.getCookies",
      params: params
    }
    
    return new Promise<StorageGetCookiesResult>((resolve, reject)=> {
      this._ws.sendCommand(parameters)
        .then(response => resolve(response as StorageGetCookiesResult))
        .catch(error => reject(error))
    });
  }
  
  /**
   * Sets a cookie in the storage
   * @param {StorageSetCookieParameters} params - Parameters required to set the cookie
   * @return {Promise<StorageSetCookieResult>}A promise that resolves to the result of setting the cookie
   */
  async setCookie(params: StorageSetCookieParameters): Promise<StorageSetCookieResult> {
    const parameters: SetCookie = {
      method:'storage.setCookie',
      params: params
    }
    
    return new Promise<StorageSetCookieResult>((resolve, reject)=> {
      this._ws.sendCommand(parameters)
        .then(response => resolve(response as StorageSetCookieResult))
        .catch(error => reject(error))
    })
  }
  
  /**
   * Deletes cookies from the storage
   * @param {StorageDeleteCookiesParameters} params - Parameters required to delete the cookies
   * @return {Promise<DeleteCookiesResult>} A promise that resolves to the result of deleting the cookies
   */
  
  async deleteCookies(params: StorageDeleteCookiesParameters): Promise<DeleteCookiesResult> {
    const parameters: StorageDeleteCookies = {
      method:'storage.deleteCookies',
      params: params
    }
    
    return new Promise<DeleteCookiesResult>((resolve, reject)=> {
      this._ws.sendCommand(parameters)
        .then(response => resolve(response as DeleteCookiesResult))
        .catch(error => reject(error))
    })
  }
}