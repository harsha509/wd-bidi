import BidiWebSocket from './BidiWebSocket';
import Session from './modules/Session';
import BrowsingContext from './modules/BrowsingContext';
import Script from './modules/Script';
import Log from './modules/Log';

export default class BidiProtocol {
  private bidiWebSocket: BidiWebSocket;
  public session: Session;
  public browsingContext: BrowsingContext;
  public script: Script;
  public log: Log;

  constructor(url: string) {
    this.bidiWebSocket = new BidiWebSocket(url);
    this.session = new Session(this.bidiWebSocket);
    this.browsingContext = new BrowsingContext(this.bidiWebSocket);
    this.script = new Script(this.bidiWebSocket);
    this.log = new Log(this.bidiWebSocket);
  }

  async connect(): Promise<void> {
    await this.bidiWebSocket.connect();
  }

  async disconnect(): Promise<void> {
    await this.bidiWebSocket.disconnect();
  }
}