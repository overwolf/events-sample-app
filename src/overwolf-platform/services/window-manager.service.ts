import { AssertOverwolfSuccess } from '../../utils/assert-overwolf-success';
import {
  WindowManagerServiceBase,
  WindowObject,
} from '../../types/services/window-manager-service-base';
import { injectable } from 'tsyringe';

@injectable()
export class WindowManagerService extends WindowManagerServiceBase {
  public openWindow(
    windowName: string,
    callback?: (result: WindowObject) => void,
  ) {
    overwolf.windows.obtainDeclaredWindow(windowName, (obtainResult) => {
      AssertOverwolfSuccess(
        obtainResult,
        `Could not open the window named \`${windowName}\`.`,
      );

      overwolf.windows.restore(windowName, (restoreResult) => {
        AssertOverwolfSuccess(
          restoreResult,
          `Could not restore the window named \`${windowName}\`.`,
        );

        // eslint-disable-next-line n/no-callback-literal
        callback?.({ windowName });
      });
    });
  }

  public closeWindow(
    windowName: string,
    callback?: (result: WindowObject) => void,
  ) {
    overwolf.windows.close(windowName, (closeResult) => {
      AssertOverwolfSuccess(
        closeResult,
        `Could not open window of name \`${windowName}\`.`,
      );

      // eslint-disable-next-line n/no-callback-literal
      callback?.({ windowName });
    });
  }
}
