import {BiDi} from "../../index";
import {
  BrowserClose,
  CreateUserContext,
  GetUserContexts,
  GetUserContextsResult,
  RemoveUserContext,
  RemoveUserContextParameters,
} from "./types";

export default class Browser {
  _ws: BiDi;
  
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
  }
  
  async close(): Promise<void> {
    const params: BrowserClose = {
      method: 'browser.close',
      params: {}
    }
    
    await this._ws.sendCommand(params);
  }
  
  async createUserContext(): Promise<void> {
    const params: CreateUserContext = {
      method:'browser.createUserContext',
      params: {}
    }
    
    await this._ws.sendCommand(params);
  }
  
  get userContexts(): Promise<GetUserContextsResult> {
    const params: GetUserContexts = {
      method: 'browser.getUserContexts',
      params: {}
    }
    
    return new Promise<GetUserContextsResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as GetUserContextsResult))
        .catch(error => reject(`Failed to fetch UserContexts: ${error}`))
    })
  }
  
  async removeUserContext(context: RemoveUserContextParameters): Promise<void> {
    const params:RemoveUserContext = {
      method: 'browser.removeUserContext',
      params: context
    }
    
    console.log(params)
    await this._ws.sendCommand(params);
  }
}