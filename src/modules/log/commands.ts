import {BiDi} from "../../index";
import LogEvents from "./events";

export default class Log {
  _ws: BiDi;
  _events: LogEvents;
  
  /**
   * Constructs a new instance of the BrowsingContext.
   * @param {BiDi} BidiConnection - The BiDi connection object to use.
   */
  constructor(BidiConnection: BiDi){
    this._ws = BidiConnection;
    this._events = new LogEvents(BidiConnection)
  }
  
  get events() {
    return this._events;
  }
}