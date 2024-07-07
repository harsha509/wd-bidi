import {RemoteValue} from '../script/types'

export type Level = 'debug' | 'info' | 'warn' | 'error';

export interface BaseLogEntry {
  Level: Level,
  Source: string;
  Text: string;
  TimeStamp: number;
  Stacktrace?: string;
}

export interface GenericLogEntry extends BaseLogEntry {
  Type: string;
}

export interface ConsoleLogEntry extends BaseLogEntry {
  Type: 'console';
  Method: string;
  args: RemoteValue[];
}

export interface JavascriptLogEntry extends BaseLogEntry {
  Type: 'javascript';
}

export type Entry = GenericLogEntry | ConsoleLogEntry | JavascriptLogEntry;

export interface Log {
  Level: Level;
  Entry: Entry;
}