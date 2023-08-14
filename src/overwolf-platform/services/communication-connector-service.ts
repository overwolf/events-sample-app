import { CommunicationConnectorServiceBase } from '../../types/services/communication-connector-service-base';
import { CommunicationBusHostObject } from '../../types/services/communication-host-service-base';
import { DependencyContainer, injectable } from 'tsyringe';

@injectable()
// eslint-disable-next-line prettier/prettier
export class CommunicationConnectorService
  extends CommunicationConnectorServiceBase {
  public connectToMain(windowName: string): boolean {
    const main = overwolf.windows.getMainWindow() as CommunicationBusHostObject;
    const hostservice = main.communicationHostService;

    return hostservice.windowConnected(windowName, this);
  }

  public connectionReceived(container: DependencyContainer): boolean {
    return this.emit('connectionReceived', container);
  }

  public connectionStopped(): boolean {
    return this.emit('connectionStopped');
  }
}
