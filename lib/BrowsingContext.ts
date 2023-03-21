interface BidiParams {
  method: string
  params: Record<string, unknown>
}

interface BrowsingContextOptions {
  browsingContextId?: number
  type?: 'window' | 'tab'
  referenceContext?: number
}

interface NavigateResultOptions {
  url: string
  navigationId: number
}

interface BrowsingContextInfoOptions {
  id: number
  url: string
  children: number[]
  parentBrowsingContext: number
}

class BrowsingContext {
  private readonly _driver: any
  private bidi: any
  private _id: number | undefined

  constructor(driver: any) {
    this._driver = driver
  }

  async init(options: { referenceContext: BrowsingContextInfo; browsingContextId: string; type: "window" | "tab" }): Promise<void> {
    const { browsingContextId, type, referenceContext } = options

    if (!(await this._driver.getCapabilities()).get('webSocketUrl')) {
      throw new Error('WebDriver instance must support BiDi protocol')
    }

    if (type != undefined && !['window', 'tab'].includes(type)) {
      throw new Error(`Valid types are 'window' & 'tab'. Received: ${type}`)
    }

    this.bidi = await this._driver.getBidi()
    this._id = browsingContextId == undefined
      ? (await this.create(type, referenceContext))['result']['context']
      : browsingContextId
  }

  async create(type: "window" | "tab", referenceContext?: BrowsingContextInfo): Promise<any> {
    const params: BidiParams = {
      method: 'browsingContext.create',
      params: {
        type,
        referenceContext,
      },
    }
    return await this.bidi.send(params)
  }

  get id(): number {
    return <number>this._id
  }

  async navigate(url: string, readinessState?: 'none' | 'interactive' | 'complete'): Promise<NavigateResult> {
    if (
      readinessState != undefined &&
      !['none', 'interactive', 'complete'].includes(readinessState)
    ) {
      throw new Error(
        `Valid readiness states are 'none', 'interactive' & 'complete'. Received: ${readinessState}`
      )
    }

    const params: BidiParams = {
      method: 'browsingContext.navigate',
      params: {
        context: this._id,
        url,
        wait: readinessState,
      },
    }
    const navigateResult = (await this.bidi.send(params))['result']

    return new NavigateResult(
      navigateResult['url'],
      navigateResult['navigation']
    )
  }

  async getTree(maxDepth?: number): Promise<BrowsingContextInfo> {
    const params: BidiParams = {
      method: 'browsingContext.getTree',
      params: {
        root: this._id,
        maxDepth,
      },
    }

    let result = await this.bidi.send(params)
    if ('error' in result) {
      throw new Error(result['error'])
    }

    result = result['result']['contexts'][0]
    return new BrowsingContextInfo(
      result['context'],
      result['url'],
      result['children'],
      result['parent']
    )
  }

  async close(): Promise<void> {
    const params: BidiParams = {
      method: 'browsingContext.close',
      params: {
        context: this._id,
      },
    }
    await this.bidi.send(params)
  }
}

class NavigateResult {
  private readonly _url: string;
  private readonly _navigationId: number;

  constructor(url: string, navigationId: number) {
    this._url = url;
    this._navigationId = navigationId;
  }

  get url(): string {
    return this._url;
  }

  get navigationId(): number {
    return this._navigationId;
  }
}

class BrowsingContextInfo {
  private readonly _id: number;
  private readonly _url: string;
  private readonly _children: BrowsingContextInfo[];
  private readonly _parentBrowsingContext: BrowsingContextInfo | undefined;

  constructor(
    id: number,
    url: string,
    children: BrowsingContextInfo[],
    parentBrowsingContext?: BrowsingContextInfo
  ) {
    this._id = id;
    this._url = url;
    this._children = children;
    this._parentBrowsingContext = parentBrowsingContext;
  }

  get id(): number {
    return this._id;
  }

  get url(): string {
    return this._url;
  }

  get children(): BrowsingContextInfo[] {
    return this._children;
  }

  get parentBrowsingContext(): BrowsingContextInfo | undefined {
    return this._parentBrowsingContext;
  }
}

async function getBrowsingContextInstance(
  driver: any,
  {
    browsingContextId,
    type,
    referenceContext,
  }: {
    browsingContextId: string;
    type: "window" | "tab";
    referenceContext: BrowsingContextInfo;
  }
): Promise<BrowsingContext> {
  let instance = new BrowsingContext(driver);
  await instance.init({ browsingContextId, type, referenceContext });
  return instance;
}

/**
 * API.
 * @type {function(any, { browsingContextId: string, type: string, referenceContext?: BrowsingContextInfo }): Promise<BrowsingContext>}
 */
export = getBrowsingContextInstance;



