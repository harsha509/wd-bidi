import WebSocket from 'ws'
import {BidiRequest} from './types/BidiRequest'
import {BidiResponse} from './types/BidiResponse'
import LogInspector from './lib/LogInspector'

const RESPONSE_TIMEOUT = 10 * 30

export class BIDI {
  private readonly _ws: WebSocket
  private _isConnected = false
  private _id = 0

  constructor(url: string) {
    this._ws = new WebSocket(url)
    this._ws.on('open', () => {
      this._isConnected = true
    })
  }

  async waitForConnection() {
    return new Promise<void>((resolve, reject) => {
      if (this._isConnected) {
        resolve()
      } else {
        this._ws.once('open', () => {
          resolve()
        })

        this._ws.once('error', (error: Error) => {
          reject(`Bidi connection failed ${error.message}`)
        })
      }
    })
  }

  get socket(): WebSocket {
    return this._ws
  }

  get isConnected(): boolean {
    return this._isConnected
  }

  async send(params: BidiRequest) {
    if (!this.isConnected) {
      await this.waitForConnection()
    }

    const id = ++this._id

    this._ws.send(JSON.stringify({id, ...params}))

    return new Promise<BidiResponse>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request with id ${id} timed out`))
        handler.off('message', listener)
      }, RESPONSE_TIMEOUT)

      const listener = (data: string) => {
        try {
          const payload = JSON.parse(data)
          if (payload.id === id) {
            clearTimeout(timeoutId)
            handler.off('message', listener)
            resolve(payload)
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(`Failed parse message: ${err.message}`)
          }
        }
      }
      const handler = this._ws.on('message', listener)

    })
  }

  async close(): Promise<void> {
    const closeWebSocket = (callback: () => void) => {
      // don't close if it's already closed
      if (this._ws.readyState === 3) {
        callback()
      } else {
        // don't notify on user-initiated shutdown ('disconnect' event)
        this._ws.removeAllListeners('close')
        this._ws.once('close', () => {
          this._ws.removeAllListeners()
          callback()
        })
        this._ws.close()
      }
    }
    return new Promise((fulfill) => {
      closeWebSocket(fulfill)
    })
  }
}

export { LogInspector }