import WebSocket from 'ws';
import { BidiRequest } from './types/BidiRequest';
import { BidiResponse } from './types/BidiResponse';
import LogInspector from './lib/LogInspector';

const RESPONSE_TIMEOUT = 10 * 30;

export class BIDI {
  _ws;
  _isConnected = false;
  _id = 0;

  constructor(url) {
    this._ws = new WebSocket(url);
    this._ws.on('open', () => {
      this._isConnected = true;
    });
  }

  async waitForConnection() {
    return new Promise((resolve, reject) => {
      if (this._isConnected) {
        resolve();
      } else {
        this._ws.once('open', () => {
          resolve();
        });

        this._ws.once('error', (error) => {
          reject(`Bidi connection failed ${error.message}`);
        });
      }
    });
  }

  get socket() {
    return this._ws;
  }

  get isConnected() {
    return this._isConnected;
  }

  async send(params) {
    if (!this.isConnected) {
      await this.waitForConnection();
    }

    const id = ++this._id;

    this._ws.send(JSON.stringify({ id, ...params }));

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request with id ${id} timed out`));
        this._ws.off('message', listener);
      }, RESPONSE_TIMEOUT);

      const listener = (data) => {
        try {
          const payload = JSON.parse(data);
          if (payload.id === id) {
            clearTimeout(timeoutId);
            this._ws.off('message', listener);
            resolve(payload);
          }
        } catch (err) {
          console.error(`Failed parse message: ${err.message}`);
        }
      };
      this._ws.on('message', listener);
    });
  }

  async close() {
    const closeWebSocket = (callback) => {
      // don't close if it's already closed
      if (this._ws.readyState === 3) {
        callback();
      } else {
        // don't notify on user-initiated shutdown ('disconnect' event)
        this._ws.removeAllListeners('close');
        this._ws.once('close', () => {
          this._ws.removeAllListeners();
          callback();
        });
        this._ws.close();
      }
    };
    return new Promise((fulfill) => {
      closeWebSocket(fulfill);
    });
  }
}

export { LogInspector };
