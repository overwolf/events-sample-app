import { EventEmitter } from 'events';

export const LoggingToken = 'LoggingServiceBase';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class LoggingServiceBase extends EventEmitter<{}> {
  public abstract init(targetWindow: string): Promise<void>;

  public abstract reCheckGEPVersion(): void;

  public abstract backupLog(newLogName: string, logPath?: string): void;
}
