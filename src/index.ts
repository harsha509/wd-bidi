import WebSocket from 'ws';
import {clearTimeout} from "node:timers";
import {SubscriptionType} from "./modules/session/types";
import Session from './modules/session/commands';

const RESPONSE_TIMEOUT = 10 * 30;

export interface ParamsType {
  method: string;
  params: SubscriptionType;
}

export default class BiDi {
  _ws: WebSocket;
  _isConnected = false;
  _id = 0;
  
  constructor(url:string) {
    this._ws = new WebSocket(url);
    this._ws.on('open',()=> {
      this._isConnected =  true;
    })
  }
  
  get getConnection(): WebSocket {
    return this._ws
  }
  
  get isConnected(): boolean {
    return this._isConnected;
  }
  
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
  Session,
};