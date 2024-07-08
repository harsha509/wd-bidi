import WebSocket from 'ws';
import {clearTimeout} from "node:timers";
import {SubscriptionType} from "./modules/session/types";
import Session from './modules/session/commands';
import Browser from "./modules/browser/commands";

const RESPONSE_TIMEOUT = 10 * 30;

/**
 * Interface for ParamsType
 * @interface
 * @property {string} method - The method property.
 * @property {SubscriptionType} params - The params property.
 */
export interface ParamsType {
  method: string;
  params: SubscriptionType;
}

/**
 * BiDi class for handling WebSocket connections
 * @class
 */
class BiDi {
  _ws: WebSocket;
  _isConnected = false;
  _id = 0;
  
  /**
   * @param {string} url - WebSocket URL
   */
  constructor(url:string) {
    this._ws = new WebSocket(url);
    this._ws.on('open',()=> {
      this._isConnected =  true;
    })
  }
  
  /**
   * Return WebSocket connection
   * @return {WebSocket} The WebSocket connection.
   */
  get getConnection(): WebSocket {
    return this._ws
  }
  
  /**
   * Return if it is connected
   * @return {boolean} The connection status.
   */
  get isConnected(): boolean {
    return this._isConnected;
  }
  
  /**
   * Wait for the connection to be established
   * @return {Promise<void>} Resolves when the connection is established.
   */
  async waitForConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(this._ws.readyState === this._ws.OPEN) {
        resolve();
      } else {
        const onOpen = () => {
          this._ws.off('open', onOpen);
          this._ws.off('error', onError);
          resolve();
        };
        
        const onError = (error: Error) => {
          this._ws.off('open', onOpen);
          this._ws.off('error', onError);
          reject(error);
        };
        
        this._ws.once('open', onOpen);
        this._ws.once('error', onError);
      }
    });
  }
  
  /**
   * Send a command over the WebSocket connection
   * @param params - Parameters to send with the command.
   * @return {Promise} Resolves with the response payload.
   */
  async sendCommand<T>(params: T) {
    if(!this._isConnected) {
      await this.waitForConnection();
    }
    
    const id = ++this._id;
    this._ws.send(JSON.stringify({ id, ...params }));
    
    return new Promise((resolve, reject) => {
      const TIMEOUT = setTimeout(()=> {
        reject(new Error(`Request with id ${id} timed out`));
        this._ws.off('message', listener);
      }, RESPONSE_TIMEOUT);
      
      const listener = (data: WebSocket.Data) => {
        try{
          const payload = JSON.parse(data.toString());
          if(payload.id === id) {
            clearTimeout(TIMEOUT);
            this._ws.off('message', listener);
            resolve(payload);
          }
        } catch (error) {
          reject(`Failed to parse message ${error}`);
        }
      };
      this._ws.on('message', listener);
    })
  }
  
  /**
   * Close the WebSocket connection.
   * @return {Promise<void>} Resolves when the connection has been succesfully closed.
   */
  closeConnection() {
    const close = (callback: () => void) => {
      if(this._ws.readyState === 3) {
        callback();
      } else {
        this._ws.removeAllListeners('close');
        this._ws.once('close',()=> {
          this._ws.removeAllListeners();
          callback();
        });
        this._ws.close();
      }
    };
    return new Promise<void>((fulfill: () => void)=> {
      close(fulfill);
    });
  }
}

export {
  BiDi,
  Browser,
  Session,
};