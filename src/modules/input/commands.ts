import {BiDi} from "../../index";
import {
  InputPerformActions,
  InputPerformActionsParameters,
  InputReleaseActionParameters,
  InputReleaseActions,
  InputSetFiles,
  InputSetFilesParameters
} from "./types";


/**
 * Input class handles interactions related to user input.
 */
export default class Input {
  /**
   *  WebSocket connection instance.
   */
  private _ws: BiDi;
  
  /**
   *  Creates an instance of Input.
   *  @param {BiDi} BidiConnection - The BiDirectional connection instance.
   */
  constructor(BidiConnection: BiDi){
    this._ws = BidiConnection;
  }
  
  /**
   *  Performs a sequence of actions.
   *  @param {InputPerformActionsParameters} actionParameters - The action parameters.
   *  @returns {Promise<void>} A promise that resolves when the actions are performed.
   */
  async performActions(actionParameters: InputPerformActionsParameters): Promise<void> {
    const params: InputPerformActions = {
      method:'input.performActions',
      params: actionParameters
    }
    console.log(params)
    await this._ws.sendCommand(params);
  }
  
  /**
   *  Releases a sequence of actions.
   *  @param {InputReleaseActionParameters} actionParameters - The action parameters.
   *  @returns {Promise<void>} A promise that resolves when the actions are released.
   */
  async releaseActions(actionParameters: InputReleaseActionParameters) : Promise<void> {
    const params: InputReleaseActions = {
      method:'input.releaseActions',
      params: actionParameters
    }
    await this._ws.sendCommand(params);
  }
  
  /**
   *  Sets the files for an <input type="file">.
   *  @param {InputSetFilesParameters} setFiles - The file parameters.
   *  @returns {Promise<void>} A promise that resolves when the files are set.
   */
  async setFiles(setFiles: InputSetFilesParameters): Promise<void> {
    const params: InputSetFiles = {
      method:'input.setFiles',
      params: setFiles
    }
    await this._ws.sendCommand(params);
  }
}