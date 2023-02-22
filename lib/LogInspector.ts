const LOG_LEVEL = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
}

class LogInspector {
    bidi: any
    ws: any

    debug = []
    error = []
    info = []
    warn = []
    private _driver: any
    private readonly _browsingContextIds: any

    constructor (driver: any, browsingContextIds: any) {
        this._driver = driver
        this._browsingContextIds = browsingContextIds
    }

    async init() {
        this.bidi = await this._driver.getBidi()
        // TODO this.bidi should have bidi instance need to remove connect once api is done
        await this.bidi.connect()
        await this.bidi.subscribe('log.entryAdded', this._browsingContextIds)
    }

    async listen() {
        this.ws = await this.bidi.socket

        this.ws.on('message', (event: { toString: () => WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>; }) => {
            // @ts-ignore
            const data = JSON.parse(Buffer.from(event.toString()))
            switch (data.params.level) {
            case LOG_LEVEL.INFO:
                // @ts-ignore
                this.info.push(data.params)
                break

            case LOG_LEVEL.DEBUG:
                // @ts-ignore
                this.debug.push(data.params)
                break

            case LOG_LEVEL.ERROR:
                // @ts-ignore
                this.error.push(data.params)
                break

            case LOG_LEVEL.WARNING:
                // @ts-ignore
                this.warn.push(data.params)
                break

            default:
                throw Error('Unknown log type')
            }
        })
    }

    get infoLogs() {
        return this.info
    }

    get debugLogs() {
        return this.debug
    }

    get errorLogs() {
        return this.error
    }

    get warnLogs() {
        return this.warn
    }
}

let instance: any = undefined

async function getInstance (driver: any, browsingContextIds: any) {
    if (instance === undefined) {
        instance = new LogInspector(driver, browsingContextIds)
        await instance.init()
        await instance.listen()
        Object.freeze(instance)
    }
    return instance
}

export default getInstance