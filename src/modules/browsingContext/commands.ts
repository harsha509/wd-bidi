import {BiDi} from "../../index";
import {
  BrowsingContextActivate,
  BrowsingContextActivateParameters,
  BrowsingContextCaptureScreenshot,
  BrowsingContextCaptureScreenshotParameters,
  BrowsingContextClose,
  BrowsingContextCloseParameters,
  BrowsingContextCreate,
  BrowsingContextCreateParameters,
  BrowsingContextCreateResult,
  BrowsingContextGetTree,
  BrowsingContextGetTreeParameters,
  BrowsingContextGetTreeResultType,
  BrowsingContextHandleUserPrompt,
  BrowsingContextHandleUserPromptParameters,
  BrowsingContextLocateNodes,
  BrowsingContextLocateNodesParameters,
  BrowsingContextLocateNodesResultType,
  BrowsingContextNavigate,
  BrowsingContextNavigateParameters,
  BrowsingContextNavigateResultType, BrowsingContextPrint, BrowsingContextPrintParams, BrowsingContextPrintResult,
  BrowsingContextReload,
  BrowsingContextReloadParameters,
  BrowsingContextReloadResultType,
  BrowsingContextSetViewport,
  BrowsingContextSetViewportParameters, BrowsingContextTraverseHistory,
  BrowsingContextTraverseHistoryParameters,
  CaptureScreenshotResult,
} from "./types";

export default class BrowsingContext {
  _ws: BiDi;
  
  constructor(BidiConnection: BiDi){
    this._ws = BidiConnection;
  }
  
  async activate(context: BrowsingContextActivateParameters): Promise<void> {
    const params: BrowsingContextActivate = {
      method:'browsingContext.activate',
      params: context
    }
    await this._ws.sendCommand(params);
  }
  
  async captureScreenshot(contextParameters: BrowsingContextCaptureScreenshotParameters):Promise<CaptureScreenshotResult> {
    const params: BrowsingContextCaptureScreenshot = {
      method:'browsingContext.captureScreenshot',
      params: contextParameters
    }
    
    return new Promise<CaptureScreenshotResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve (response as CaptureScreenshotResult))
        .catch(error => reject(`Unable to capture screenshot: ${error}`))
    })
  }
  
  // command to close top level browsing context
  async close(closeParams: BrowsingContextCloseParameters): Promise<void> {
    closeParams.promptUnload = closeParams.promptUnload || false;
    const params: BrowsingContextClose = {
      method: 'browsingContext.close',
      params: closeParams
    }
    
    await this._ws.sendCommand(params);
  }
  
  async create(createContext: BrowsingContextCreateParameters): Promise<BrowsingContextCreateResult> {
    const params: BrowsingContextCreate = {
      method:'browsingContext.create',
      params: createContext
    }
    
    return new Promise<BrowsingContextCreateResult>((resolve, reject)=> {
      this._ws.sendCommand(params)
        .then(response => resolve(response as BrowsingContextCreateResult))
        .catch(error => reject(`Unable to create browsingContext: ${error}`))
    })
  }
  
  async getTree(BrowsingContextTreeParams: BrowsingContextGetTreeParameters): Promise<BrowsingContextGetTreeResultType> {
    const params: BrowsingContextGetTree = {
      method:'browsingContext.getTree',
      params: BrowsingContextTreeParams
    }
    
    return new Promise<BrowsingContextGetTreeResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as BrowsingContextGetTreeResultType))
        .catch(error => reject(`Unable to get browsingContext tree : ${error}` ))
    })
  }
  
  async handleUserPrompt(promptParameters: BrowsingContextHandleUserPromptParameters): Promise<void> {
    const params: BrowsingContextHandleUserPrompt = {
      method:'browsingContext.handleUserPrompt',
      params: promptParameters
    }
    await this._ws.sendCommand(params);
  }
  
  async locateNodes(locateNodeParams: BrowsingContextLocateNodesParameters):Promise<BrowsingContextLocateNodesResultType> {
  const params: BrowsingContextLocateNodes = {
    method:'browsingContext.locateNodes',
    params: locateNodeParams
  }
  
  return new Promise<BrowsingContextLocateNodesResultType>((resolve, reject)=> {
    this._ws.sendCommand(params)
      .then(response => resolve(response as BrowsingContextLocateNodesResultType))
      .catch(error => reject(`Unable to locate nodes: ${error}`))
  });
  }
  
  async navigate(navigateParams: BrowsingContextNavigateParameters): Promise<BrowsingContextNavigateResultType> {
    const params: BrowsingContextNavigate = {
      method:'browsingContext.navigate',
      params: navigateParams
    }
    
    return new Promise<BrowsingContextNavigateResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as BrowsingContextNavigateResultType))
        .catch(error => reject(`failed command browsingContext.Navigate: ${error}`))
    })
  }
  
  async print(printParameters: BrowsingContextPrintParams): Promise<BrowsingContextPrintResult> {
    
    const params: BrowsingContextPrint = {
      method:'browsingContext.print',
      params: printParameters
    }
    
    return new Promise<BrowsingContextPrintResult> ((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as BrowsingContextPrintResult))
        .catch(error => reject(`Unable to perform print page: ${error}`))
    })
  }
  
  async reload(reloadParams: BrowsingContextReloadParameters): Promise<BrowsingContextReloadResultType> {
    const params: BrowsingContextReload = {
      method:'browsingContext.reload',
      params: reloadParams
    }
    
    return new Promise<BrowsingContextReloadResultType>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as BrowsingContextReloadResultType))
        .catch(error => reject(`Failed to reload ${error}`))
    })
  }
  
  
  async setViewPort(viewportParameters: BrowsingContextSetViewportParameters): Promise<void> {
    const params: BrowsingContextSetViewport = {
      method:'browsingContext.setViewport',
      params: viewportParameters
    }
    await this._ws.sendCommand(params);
  }
  
  async traverseHistory(traverseHistoryParameters: BrowsingContextTraverseHistoryParameters) {
    const params: BrowsingContextTraverseHistory = {
      method:'browsingContext.traverseHistory',
      params: traverseHistoryParameters
    }
    await this._ws.sendCommand(params);
  }
  
}