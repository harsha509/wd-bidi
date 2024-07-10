import {BiDi} from "../../index";
import {
  BrowserClose,
  CreateUserContext,
  GetUserContexts,
  GetUserContextsResult,
  RemoveUserContext,
  RemoveUserContextParameters,
} from "./types";

/**
 * A class representing a Browser with various methods to interact with it.
 */
export default class Browser {
  _ws: BiDi;
  
  /**
   * Creates a new Browser object.
   *
   * @param {BiDi} BidiConnection - BiDi connection object.
   */
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
  }
  
  /**
   * Method to close the browser.
   *
   * @returns {Promise<void>} - A promise that resolves when the browser is closed.
   */
  async close(): Promise<void> {
    const params: BrowserClose = {
      method: 'browser.close',
      params: {}
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   * Method to create a new user context.
   *
   * @returns {Promise<void>} - A promise that resolves when the user context is created.
   */
  async createUserContext(): Promise<void> {
    const params: CreateUserContext = {
      method:'browser.createUserContext',
      params: {}
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   * Getter for the user contexts.
   *
   * @returns {Promise<GetUserContextsResult>} - A promise that resolves to the user contexts.
   */
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
  
  /**
   * Method to remove a user context.
   *
   * @param {RemoveUserContextParameters} context - The user context to remove.
   * @returns {Promise<void>} - A promise that resolves when the user context is removed.
   */
  async removeUserContext(context: RemoveUserContextParameters): Promise<void> {
    const params:RemoveUserContext = {
      method: 'browser.removeUserContext',
      params: context
    }
    await this._ws.sendCommand(params);
  }
}