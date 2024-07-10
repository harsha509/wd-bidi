import {BiDi} from "../../index";
import {BrowsingContextCreated, BrowsingContextCreatedParameters} from "./eventTypes";
import WebSocket from "ws";

export default class BrowsingContextEvents {
  _ws: BiDi;
  _connection: WebSocket;
  eventSubscription: string | undefined;
  
  constructor(BidiConnection: BiDi){
    this._ws = BidiConnection;
    this._connection = this._ws.getConnection;
  }
  
  
  async contextCreated(contextParameters: BrowsingContextCreatedParameters){
    const request: BrowsingContextCreated = {
      method: 'browsingContext.contextCreated',
      params: contextParameters
    }
    
    await this._ws.sendCommand(request);
      this._connection.on('message', (data: string) => {
        this.eventSubscription = JSON.parse(data.toString());
      });
  }
  
  public getEventSusbcriptionData(){
    return this.eventSubscription;
  };
}