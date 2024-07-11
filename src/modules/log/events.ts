import WebSocket from "ws";
import {BiDi} from "../../index";
import Session from "../session/commands";
import {Entry} from "./types";


export default class LogEvents {
  _ws: BiDi
  _connection: WebSocket;
  _eventSubscription: Entry | undefined;
  _session: Session;
  
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
    this._connection = BidiConnection.getConnection
    this._session = new Session(BidiConnection);
  }
  
  get eventSubscriptionData() {
    return this._eventSubscription
  }
  
  async entryAdded() {
    const request = {
      events: 'log.entryAdded'
    }
    
    await this._session.subscribe(request);
    this._connection.on('message', (data: string) => {
      this._eventSubscription = JSON.parse(data.toString())
    })
  }
}