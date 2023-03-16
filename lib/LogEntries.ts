class BaseLogEntry {
  private readonly _level: string;
  private readonly _text: string;
  private readonly _timeStamp: Date;
  private readonly _stackTrace: string[];

  constructor(level: string, text: string, timeStamp: Date, stackTrace: string[]) {
    this._level = level;
    this._text = text;
    this._timeStamp = timeStamp;
    this._stackTrace = stackTrace;
  }

  get level(): string {
    return this._level;
  }

  get text(): string {
    return this._text;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }

  get stackTrace(): string[] {
    return this._stackTrace;
  }
}

class GenericLogEntry extends BaseLogEntry {
  private _type: string;

  constructor(level: string, text: string, timeStamp: Date, type: string, stackTrace: string[]) {
    super(level, text, timeStamp, stackTrace);
    this._type = type;
  }

  get type(): string {
    return this._type;
  }
}

class ConsoleLogEntry extends GenericLogEntry {
  private _method: string;
  private _realm: string;
  private _args: any[];

  constructor(level: string, text: string, timeStamp: Date, type: string, method: string, realm: string, args: any[], stackTrace: string[]) {
    super(level, text, timeStamp, type, stackTrace);
    this._method = method;
    this._realm = realm;
    this._args = args;
  }

  get method(): string {
    return this._method;
  }

  get realm(): string {
    return this._realm;
  }

  get args(): any[] {
    return this._args;
  }
}

class JavascriptLogEntry extends GenericLogEntry {
  constructor(level: string, text: string, timeStamp: Date, type: string, stackTrace: string[]) {
    super(level, text, timeStamp, type, stackTrace);
  }
}

// PUBLIC API
export { BaseLogEntry, GenericLogEntry, ConsoleLogEntry, JavascriptLogEntry };
