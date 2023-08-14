import 'reflect-metadata';
import { DependencyContainer, container, inject, injectable } from 'tsyringe';
import {
  CommunicationConnectorServiceBase,
  CommunicationConnectorToken,
} from '../types/services/communication-connector-service-base';
import { CommunicationConnectorService } from '../overwolf-platform/services/communication-connector-service';
import {
  GEPEnabledFeatures,
  GEPServiceBase,
  GEPToken,
} from '../types/services/gep-service-base';
import { GEPConsumer } from '../overwolf-platform/consumers/gep-consumer';

container.register(CommunicationConnectorToken, CommunicationConnectorService);

// -----------------------------------------------------------------------------
@injectable()
export class Main {
  public constructor(
    private readonly gepConsumer: GEPConsumer,
    @inject(CommunicationConnectorToken)
    private readonly communicationConnector: CommunicationConnectorServiceBase,
  ) {
    this.init();
  }

  private gepService: GEPServiceBase | undefined;

  private logEnabledFeatures(features: GEPEnabledFeatures): void {
    const failed = features.requested.filter(
      (value) => !features.enabled.includes(value),
    );
    console.log(
      `
Attempted to subscribe to the following features: ${JSON.stringify(
        features.requested,
        undefined,
        4,
      )}
Successfully subscribed to the following features: ${JSON.stringify(
        features.enabled,
        undefined,
        4,
      )}
Failed to subscribe to ${failed.length} features: ${JSON.stringify(
        failed,
        undefined,
        4,
      )}
      `,
    );
  }

  private connectionReceivedListener(mainContainer: DependencyContainer) {
    this.gepService = mainContainer.resolve<GEPServiceBase>(GEPToken);

    if (!this.gepService.getEnabledFeatures()) {
      this.gepService.once('enabledFeatures', this.logEnabledFeatures);
    } else this.logEnabledFeatures(this.gepService.getEnabledFeatures());

    // Register for the `gameEvent`, `infoUpdate`, and `error` gepService events
    this.gepService.on('gameEvent', this.gepConsumer.onNewGameEvent);
    this.gepService.on('infoUpdate', this.gepConsumer.onGameInfoUpdate);
    this.gepService.on('error', this.gepConsumer.onGEPError);
  }

  private messageReceivedListener(message: any) {
    console.log(message);
  }

  private connectionStoppedListener() {
    if (this.gepService) {
      this.gepService.off('gameEvent', this.gepConsumer.onNewGameEvent);
      this.gepService.off('infoUpdate', this.gepConsumer.onGameInfoUpdate);
      this.gepService.off('error', this.gepConsumer.onGEPError);
    }

    this.communicationConnector.off(
      'messageReceived',
      this.messageReceivedListener,
    );
  }

  /**
   * Initializes this app
   */
  public init(): void {
    this.communicationConnector.once(
      'connectionReceived',
      (container: DependencyContainer) =>
        this.connectionReceivedListener(container),
    );

    this.communicationConnector.on(
      'messageReceived',
      this.messageReceivedListener,
    );

    this.communicationConnector.once('connectionStopped', () =>
      this.connectionStoppedListener(),
    );

    this.communicationConnector.connectToMain(
      'in-game',
      this.communicationConnector,
    );
  }
}

container.resolve(Main);
