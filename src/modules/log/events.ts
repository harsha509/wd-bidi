import WebSocket from "ws";
import {BiDi} from "../../index";
import Session from "../session/commands";
import {ConsoleLogEntry, Entry, GenericLogEntry, JavascriptLogEntry} from "./types";


export default class LogEvents {
  _ws: BiDi
  _connection: WebSocket;
  _eventSubscription: Entry | undefined;
  _session: Session;
  
  // class constructor
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
    this._connection = BidiConnection.getConnection
    this._session = new Session(BidiConnection);
  }
  
  // getter for event subscription data
  get eventSubscriptionData() {
    return this._eventSubscription
  }
  
  // function for subscribing to the 'entryAdded' event
  async entryAdded(): Promise<void> {
    const request = {
      events: 'log.entryAdded'
    }
    
    // subscribe to the event
    await this._session.subscribe(request);
    
    // handle incoming messages
    this._connection.on('message', (data: string) => {
      const message = JSON.parse(data.toString());
      
      // check if incoming message is an event
      if ('method' in message && 'params' in message && 'type' in message.params) {
        // switch to handle different types of events
        switch (message.params.type) {
          case 'console':
            // console event
            this._eventSubscription = message.params as ConsoleLogEntry;
            break;
          case 'javascript':
            // javascript event
            this._eventSubscription = message.params as JavascriptLogEntry;
            break;
          default:
            // generic event
            this._eventSubscription = message.params as GenericLogEntry;
            break;
        }
      }
      // return the event data
      return this._eventSubscription;
    })
  }
}