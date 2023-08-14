import { EventEmitter } from 'events';

export interface WindowObject {
  windowName: string;
}

export const WindowManagerToken = 'WindowManagerBase';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class WindowManagerServiceBase extends EventEmitter<{}> {
  public abstract openWindow(
    windowName: string,
    callback?: (result: WindowObject) => void,
  ): void;

  public abstract closeWindow(
    windowName: string,
    callback?: (result: WindowObject) => void,
  ): void;
}
