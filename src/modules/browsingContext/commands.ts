import {BiDi} from "../../index";
import * as EventType from "./types";
import BrowsingContextEvents from "./events";

/**
 * The BrowsingContext class provides methods for managing navigation contexts in a user agent.
 */
export default class BrowsingContext {
  _ws: BiDi;
  _events: BrowsingContextEvents;
  
  /**
   * Constructs a new instance of the BrowsingContext.
   * @param {BiDi} BiDiConnection - The BiDi connection object to use.
   */
  constructor(BiDiConnection: BiDi){
    this._ws = BiDiConnection;
    this._events = new BrowsingContextEvents(BiDiConnection)
  }
  
  /**
   * Gets BrowsingContext events.
   * @returns {BrowsingContextEvents} The BrowsingContext events.
   */
  get events(): BrowsingContextEvents {
    return this._events;
  }
  
  /**
   * Makes the specified context the active context.
   * @param {EventType.BrowsingContextActivateParameters} context - The context to make active.
   */
  async activate(context: EventType.BrowsingContextActivateParameters): Promise<void> {
    const params: EventType.BrowsingContextActivate = {
      method:'browsingContext.activate',
      params: context
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   * Captures a screenshot of the specified browsing context.
   * @param {EventType.BrowsingContextCaptureScreenshotParameters} contextParameters - The context to capture a screenshot from.
   * @returns {EventType.CaptureScreenshotResult} The screenshot result.
   */
  async captureScreenshot(contextParameters: EventType.BrowsingContextCaptureScreenshotParameters):Promise<EventType.CaptureScreenshotResult> {
    const params: EventType.BrowsingContextCaptureScreenshot = {
      method:'browsingContext.captureScreenshot',
      params: contextParameters
    }
    
    return new Promise<EventType.CaptureScreenshotResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve (response as EventType.CaptureScreenshotResult))
        .catch(error => reject(`Unable to capture screenshot: ${error}`))
    })
  }
  
  /**
   * Closes the specified top level browsing context.
   * @param {EventType.BrowsingContextCloseParameters} closeParams - The context to close.
   */
  async close(closeParams: EventType.BrowsingContextCloseParameters): Promise<void> {
    closeParams.promptUnload = closeParams.promptUnload || false;
    const params: EventType.BrowsingContextClose = {
      method: 'browsingContext.close',
      params: closeParams
    }
    
    await this._ws.sendCommand(params);
  }
  
  /**
   * Creates a new top-level browsing context.
   * @param {EventType.BrowsingContextCreateParameters} createContext - The parameters to create a context with.
   * @returns {EventType.BrowsingContextCreateResult} The creation result.
   */
  async create(createContext: EventType.BrowsingContextCreateParameters): Promise<EventType.BrowsingContextCreateResult> {
    const params: EventType.BrowsingContextCreate = {
      method:'browsingContext.create',
      params: createContext
    }
    
    return new Promise<EventType.BrowsingContextCreateResult>((resolve, reject)=> {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextCreateResult))
        .catch(error => reject(`Unable to create browsingContext: ${error}`))
    })
  }
  
  /**
   * Retrieves the tree of browsing contexts.
   * @param {EventType.BrowsingContextGetTreeParameters} BrowsingContextTreeParams - The parameters to get the context tree with.
   * @returns {EventType.BrowsingContextGetTreeResultType} The context tree.
   */
  async getTree(BrowsingContextTreeParams: EventType.BrowsingContextGetTreeParameters): Promise<EventType.BrowsingContextGetTreeResultType> {
    const params: EventType.BrowsingContextGetTree = {
      method:'browsingContext.getTree',
      params: BrowsingContextTreeParams
    }
    
    return new Promise<EventType.BrowsingContextGetTreeResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextGetTreeResultType))
        .catch(error => reject(`Unable to get browsingContext tree : ${error}` ))
    })
  }
  
  /**
   * Handles a user prompt.
   * @param {EventType.BrowsingContextHandleUserPromptParameters} promptParameters - The parameters to handle the prompt with.
   */
  async handleUserPrompt(promptParameters: EventType.BrowsingContextHandleUserPromptParameters): Promise<void> {
    const params: EventType.BrowsingContextHandleUserPrompt = {
      method:'browsingContext.handleUserPrompt',
      params: promptParameters
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   * Locates nodes in a browsing context using a CSS or XPath selector.
   * @param {EventType.BrowsingContextLocateNodesParameters} locateNodeParams - The parameters to locate nodes with.
   * @returns {EventType.BrowsingContextLocateNodesResultType} The located nodes.
   */
  async locateNodes(locateNodeParams: EventType.BrowsingContextLocateNodesParameters):Promise<EventType.BrowsingContextLocateNodesResultType> {
    const params: EventType.BrowsingContextLocateNodes = {
      method:'browsingContext.locateNodes',
      params: locateNodeParams
    }
    
    return new Promise<EventType.BrowsingContextLocateNodesResultType>((resolve, reject)=> {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextLocateNodesResultType))
        .catch(error => reject(`Unable to locate nodes: ${error}`))
    });
  }
  
  /**
   * Navigates a browsing context to a new location.
   * @param {EventType.BrowsingContextNavigateParameters} navigateParams - The parameters to navigate with.
   * @returns {EventType.BrowsingContextNavigateResultType} The navigation result.
   */
  async navigate(navigateParams: EventType.BrowsingContextNavigateParameters): Promise<EventType.BrowsingContextNavigateResultType> {
    const params: EventType.BrowsingContextNavigate = {
      method:'browsingContext.navigate',
      params: navigateParams
    }
    
    return new Promise<EventType.BrowsingContextNavigateResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextNavigateResultType))
        .catch(error => reject(`failed command browsingContext.Navigate: ${error}`))
    })
  }
  
  /**
   * Prints the contents of a browsing context to a PDF.
   * @param {EventType.BrowsingContextPrintParams} printParameters - The parameters to print with.
   * @returns {EventType.BrowsingContextPrintResult} The print result.
   */
  async print(printParameters: EventType.BrowsingContextPrintParams): Promise<EventType.BrowsingContextPrintResult> {
    
    const params: EventType.BrowsingContextPrint = {
      method:'browsingContext.print',
      params: printParameters
    }
    
    return new Promise<EventType.BrowsingContextPrintResult> ((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextPrintResult))
        .catch(error => reject(`Unable to perform print page: ${error}`))
    })
  }
  
  /**
   * Reloads the specified browsing context.
   * @param {EventType.BrowsingContextReloadParameters} reloadParams - The context to reload.
   * @returns {EventType.BrowsingContextReloadResultType} The reload result.
   */
  async reload(reloadParams: EventType.BrowsingContextReloadParameters): Promise<EventType.BrowsingContextReloadResultType> {
    const params: EventType.BrowsingContextReload = {
      method:'browsingContext.reload',
      params: reloadParams
    }
    
    return new Promise<EventType.BrowsingContextReloadResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EventType.BrowsingContextReloadResultType))
        .catch(error => reject(`Failed to reload ${error}`))
    })
  }
  
  /**
   * Sets the viewport size for the specific browsing context.
   * @param {EventType.BrowsingContextSetViewportParameters} viewportParameters - The parameters to set the viewport with.
   */
  async setViewport(viewportParameters: EventType.BrowsingContextSetViewportParameters): Promise<void> {
    const params: EventType.BrowsingContextSetViewport = {
      method:'browsingContext.setViewport',
      params: viewportParameters
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   * Traverses the history of a browsing context.
   * @param {EventType.BrowsingContextTraverseHistoryParameters} traverseHistoryParameters - The parameters to traverse history with.
   */
  async traverseHistory(traverseHistoryParameters: EventType.BrowsingContextTraverseHistoryParameters):Promise<void> {
    const params: EventType.BrowsingContextTraverseHistory = {
      method:'browsingContext.traverseHistory',
      params: traverseHistoryParameters
    }
    await this._ws.sendCommand(params);
  }
}