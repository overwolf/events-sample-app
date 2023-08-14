import { injectable } from 'tsyringe';
import {
  CommunicationBusHostObject,
  CommunicationHostServiceBase,
} from '../../types/services/communication-host-service-base';

@injectable()
export class CommunicationHostService extends CommunicationHostServiceBase {
  public initializeCommunicationBusHost() {
    const main = overwolf.windows.getMainWindow() as CommunicationBusHostObject;
    if (main.communicationHostService)
      throw new Error('Communication host is already initialized!');

    main.communicationHostService = this;
    return true;
  }
}
