import { EventEmitter } from 'events';
import { CommunicationBustHostPayload } from './communication-host-service-base';
import { DependencyContainer } from 'tsyringe';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const CommunicationConnectorToken = 'CommunicationConnectorBase';

export type CommunicationConnectorEvents = {
  connectionReceived: [DependencyContainer];
  messageReceived: [any];
  connectionStopped: [void];
};

// eslint-disable-next-line prettier/prettier
export abstract class CommunicationConnectorServiceBase
 extends EventEmitter<CommunicationConnectorEvents> {
  public abstract connectToMain(
    windowName: CommunicationBustHostPayload['windowName'],
    connector: CommunicationBustHostPayload['connector'],
  ): boolean;

  public abstract connectionReceived(container: DependencyContainer): boolean;

  public abstract connectionStopped(): boolean;

  public sendMessage(message: any): boolean {
    return this.emit('messageReceived', message);
  }
}
