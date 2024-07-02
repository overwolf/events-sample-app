import { EventEmitter } from 'events';
import { CommunicationConnectorServiceBase } from './communication-connector-service-base';

export type CommunicationHostObject = {
  [windowName: string]: CommunicationConnectorServiceBase;
};

export type CommunicationBusHostObject = Window & {
  communicationHostService: CommunicationHostServiceBase;
};

export type CommunicationBustHostPayload = {
  windowName: string;
  connector: CommunicationConnectorServiceBase;
};

export const CommunicationHostToken = 'CommunicationHostBase';

export type CommunicationHostEvents = {
  windowConnected: [CommunicationBustHostPayload];
  windowDisconnected: [CommunicationBustHostPayload];
};

// eslint-disable-next-line prettier/prettier
export abstract class CommunicationHostServiceBase extends EventEmitter<
  CommunicationHostEvents
> {
  protected readonly communicationHost: CommunicationHostObject = {};

  public abstract initializeCommunicationBusHost(): boolean;

  public windowConnected(
    windowName: string,
    connector: CommunicationConnectorServiceBase,
  ): boolean {
    // Ensure that the window was not already connected
    if (this.windowExists(windowName))
      throw new Error(
        `\`${windowName}\` is already registered in this communication bus!`,
      );

    // Register the window in the connection index
    this.communicationHost[windowName] = connector;
    // Emit the 'windowConnected' event
    return this.emit('windowConnected', {
      windowName,
      connector,
    });
  }

  public windowDisconnected(windowName: string): boolean {
    // Ensure the window was actually connected
    if (!this.windowExists(windowName))
      throw new Error(
        `\`${windowName}\` is not registered in this communication bus!`,
      );

    // Clean up the connection
    const windowConnector = this.communicationHost[windowName];
    // Notify window to disconnect itself
    windowConnector.connectionStopped();
    // Delete window's entry in connection index
    delete this.communicationHost[windowName];
    // Emit the 'windowDisconnected' event
    return this.emit('windowDisconnected', {
      windowName,
      connector: windowConnector,
    });
  }

  public sendMessage(windowName: string, message: any): boolean {
    return this.communicationHost[windowName]?.sendMessage(message);
  }

  private windowExists(windowName: string): boolean {
    return !!this.communicationHost[windowName];
  }
}
