import BiDi from '../../index';
import {
  Params, sessionCapabilitiesRequest,
  sessionNew,
  SessionNewResult,
  SessionStatusParams,
  SessionStatusResult,
  SubscriptionType
} from './types';


export default class Session {
  _ws: BiDi;
  _events: SubscriptionType | undefined ;
  _contexts: SubscriptionType | undefined ;
  _capabilities: sessionCapabilitiesRequest | undefined;
  
  constructor(BidiConnection: BiDi) {
    this._ws = BidiConnection;
  }
  
  private validateStringTypes(array: Array<SubscriptionType>, arrayName: string) {
    if (array.some(item => typeof item !== 'string')) {
      throw new TypeError(`${arrayName} should be a string or array of strings`);
    }
  }
  
  async subscribe(events: SubscriptionType, context?: SubscriptionType) {
    this._events = Array.isArray(events) ? events: [events];
    this._contexts = Array.isArray(context) ? context : (context ? [context]: []);
    
    
    this.validateStringTypes(this._events, 'events');
    if (this._contexts.length > 0) {
      this.validateStringTypes(this._contexts, 'contexts');
    }
    
    const params: Params = {
      method: 'session.subscribe',
      params: {
        events: this._events,
      }
    }
    
    if (this._contexts.length > 0) {
      params.params['contexts'] = this._contexts;
    }
    
    await this._ws.sendCommand(params);
  }
  
  
  get status(): Promise<SessionStatusResult> {
    const params: SessionStatusParams = {
      method: 'session.status',
      params: {}
    }
    return new Promise<SessionStatusResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as SessionStatusResult))
        .catch(error => reject(new Error(`Unable to get session status ${error}`)));
    });
  }
  
  async newSession(capabilities: sessionCapabilitiesRequest): Promise<SessionNewResult>{
    this._capabilities = capabilities;
    
    const params: sessionNew= {
      method: 'session.new',
      params:{
        capabilities: this._capabilities
      }
    }
    
    return new Promise<SessionNewResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as SessionNewResult))
        .catch(error => reject(new Error(`Unable to create session: ${error}`)));
    });
  }
}