import { BiDi } from "../../index";
import {
  AddPreloadScript,
  AddPreloadScriptParameters,
  AddPreloadScriptResult,
  CallFunction,
  CallFunctionParameters,
  Disown,
  DisownParameters,
  Evaluate,
  EvaluateParameters,
  EvaluateResult,
  GetRealms,
  GetRealmsParameters,
  GetRealmsResult,
  RemovePreloadScript,
  RemovePreloadScriptParameters
} from "./types";
import {ScriptEvents} from "./events";

/**
 * Represents a script instance that interacts with a BiDi connection.
 */
export default class Script {
  /**
   * The BiDi connection object used by this script instance.
   */
  _ws: BiDi;
  _events: ScriptEvents

  /**
   * Constructs a new instance of the Script.
   * @param {BiDi} BiDiConnection - The BiDi connection object to use.
   */
  constructor(BiDiConnection: BiDi) {
    this._ws = BiDiConnection;
    this._events = new ScriptEvents(BiDiConnection)
  }

  /**
   * Gets Script events.
   * @returns {NetworkEvents} The BrowsingContext events.
   */
  get events(): ScriptEvents {
    return this._events;
  }

  /**
   * Adds a preload script to the BiDi connection.
   * @param {AddPreloadScriptParameters} context - The parameters for adding a preload script.
   * @returns {Promise<AddPreloadScriptResult>} A promise that resolves with the result of adding a preload script.
   */
  async addPreloadScript(context: AddPreloadScriptParameters): Promise<AddPreloadScriptResult> {
    const params: AddPreloadScript = {
      method: 'script.addPreloadScript',
      params: context
    }

    return new Promise<AddPreloadScriptResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as AddPreloadScriptResult))
        .catch(error => reject(error))
    })
  }

  /**
   * Disowns a script from the BiDi connection.
   * @param {DisownParameters} context - The parameters for disowning a script.
   * @returns {Promise<void>} A promise that resolves when the script is disowned.
   */
  async disown(context: DisownParameters): Promise<void> {
    const params: Disown = {
      method: 'script.disown',
      params: context
    }
    await this._ws.sendCommand(params);
  }

  /**
   * Calls a function on the BiDi connection.
   * @param {CallFunctionParameters} context - The parameters for calling a function.
   * @returns {Promise<EvaluateResult>} A promise that resolves with the result of calling a function.
   */
  async callFunction(context: CallFunctionParameters): Promise<EvaluateResult> {
    const params: CallFunction = {
      method: 'script.callFunction',
      params: context
    }

    return new Promise<EvaluateResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EvaluateResult))
        .catch(error => reject(error))
    })
  }

  /**
   * Evaluates a script on the BiDi connection.
   * @param {EvaluateParameters} context - The parameters for evaluating a script.
   * @returns {Promise<EvaluateResult>} A promise that resolves with the result of evaluating a script.
   */
  async evaluate(context: EvaluateParameters): Promise<EvaluateResult> {
    const params: Evaluate = {
      method: 'script.evaluate',
      params: context
    }

    return new Promise<EvaluateResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as EvaluateResult))
        .catch(error => reject(error))
    })
  }

  /**
   * Gets the realms from the BiDi connection.
   * @param {GetRealmsParameters} context - The parameters for getting realms.
   * @returns {Promise<GetRealmsResult>} A promise that resolves with the result of getting realms.
   */
  async getRealms(context: GetRealmsParameters): Promise<GetRealmsResult> {
    const params: GetRealms = {
      method: 'script.getRealms',
      params: context
    }
    return new Promise<GetRealmsResult>((resolve, reject) => {
      this._ws.sendCommand(params)
        .then(response => resolve(response as GetRealmsResult))
        .catch(error => reject(error))
    })
  }

  /**
   * Removes a preload script from the BiDi connection.
   * @param {RemovePreloadScriptParameters} context - The parameters for removing a preload script.
   * @returns {Promise<void>} A promise that resolves when the preload script is removed.
   */
  async removePreloadScript(context: RemovePreloadScriptParameters): Promise<void> {
    const params: RemovePreloadScript = {
      method: 'script.removePreloadScript',
      params: context
    }

    await this._ws.sendCommand(params)
  }
}