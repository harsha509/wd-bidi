class FilterBy {
  private level_: string;

  constructor(level: string) {
    this.level_ = level;
  }

  static logLevel(level?: string): FilterBy {
    if (
      level === undefined ||
      (level != undefined &&
        !['debug', 'error', 'info', 'warning'].includes(level))
    ) {
      throw Error(
        `Please pass valid log level. Valid log levels are 'debug', 'error', 'info' and 'warning'. Received: ${level}`
      )
    }

    return new FilterBy(level);
  }

  getLevel(): string {
    return this.level_;
  }
}

// PUBLIC API

export {
  FilterBy
};
