import 'reflect-metadata';
import { container, inject, injectable } from 'tsyringe';
import gameData from '../overwolf-platform/config/game-data';
import {
  GameClosedPayload,
  GameDetectionServiceBase,
  GameDetectionToken,
  GameLaunchedPayload,
  PostGamePayload,
} from '../types/services/game-detection-service-base';
import { LoggingService } from '../overwolf-platform/services/logging-service';
import { GEPService } from '../overwolf-platform/services/gep-service';
import { CommunicationHostService } from '../overwolf-platform/services/communication-host-service';
import { GameDetectionService } from '../overwolf-platform/services/game-detection-service';
import { WindowManagerService } from '../overwolf-platform/services/window-manager.service';
import { IN_GAME_WINDOW } from '../constants/window-names';
import {
  CommunicationBustHostPayload,
  CommunicationHostServiceBase,
  CommunicationHostToken,
} from '../types/services/communication-host-service-base';
import {
  WindowManagerServiceBase,
  WindowManagerToken,
} from '../types/services/window-manager-service-base';
import { GEPServiceBase, GEPToken } from '../types/services/gep-service-base';
import {
  LoggingToken,
  LoggingServiceBase,
} from '../types/services/logging-service-base';
import { SettingsToken } from '../types/services/settings-service-base';
import { SettingsService } from '../overwolf-platform/services/settings-service';

container.registerSingleton(GEPToken, GEPService);
container.registerSingleton(SettingsToken, SettingsService);
container.registerSingleton(LoggingToken, LoggingService);
container.registerSingleton(GameDetectionToken, GameDetectionService);
container.registerSingleton(WindowManagerToken, WindowManagerService);
container.registerSingleton(CommunicationHostToken, CommunicationHostService);

// -----------------------------------------------------------------------------
@injectable()
export class IndexController {
  private readonly inGameName = 'in-game';

  public constructor(
    @inject(GEPToken)
    private readonly gepService: GEPServiceBase,
    @inject(LoggingToken)
    private readonly loggingService: LoggingServiceBase,
    @inject(GameDetectionToken)
    private readonly gameDetectionService: GameDetectionServiceBase,
    @inject(WindowManagerToken)
    private readonly windowManagerService: WindowManagerServiceBase,
    @inject(CommunicationHostToken)
    private readonly communicationBusHostService: CommunicationHostServiceBase,
  ) {
    this.communicationBusHostService.initializeCommunicationBusHost();
    this.loggingService.init(IN_GAME_WINDOW);
    this.init();
  }

  /**
   * Initializes this app
   */
  public init(): void {
    // Register for the `gameLaunched` event from the game detection service
    this.gameDetectionService.on(
      'gameLaunched',
      (payload: GameLaunchedPayload) => this.onGameStart(payload),
    );
    // Register for the `gameClosed` event from the gameDetectionService
    this.gameDetectionService.on('gameClosed', (payload: GameClosedPayload) =>
      this.onGameClosed(payload),
    );
    // Register for the `postGame` event from the gameDetectionService
    this.gameDetectionService.on('postGame', this.onPostGame);

    this.communicationBusHostService.addListener(
      'windowConnected',
      this.connectInGame,
    );

    // this.communicationBusHostService.addListener(
    //   'windowDisconnected',
    //   () => {},
    // );

    // Start the game detection service, kickstarting the entire events chain
    this.gameDetectionService.start();
  }

  private connectInGame(event: CommunicationBustHostPayload) {
    const inGameConnector = event.connector;
    inGameConnector.connectionReceived(container);
  }

  private onGameStart(gameLaunch: GameLaunchedPayload) {
    console.log(`Game was launched: ${gameLaunch.name} ${gameLaunch.id}`);
    // Rechecks and saves the current GEP version, for logs backup
    this.loggingService.reCheckGEPVersion();
    // Get the configured data for the launched game
    const gameConfig = gameData[gameLaunch.id];
    // If the detected game is configured for events
    if (gameConfig) {
      // Open the in-game window
      this.windowManagerService.openWindow(this.inGameName);
      // Run the game launched logic of the gep service
      this.gepService.onGameLaunched(gameConfig.interestedInFeatures);
    }
  }

  private onGameClosed(gameClosed: GameClosedPayload) {
    console.log(`Game was closed: ${gameClosed.name}`);
    const gameConfig = gameData[gameClosed.id];
    // If the detected game is configured for events
    if (gameConfig) {
      // Close the in-game window
      this.windowManagerService.closeWindow(this.inGameName, (window) => {
        this.communicationBusHostService.windowDisconnected(window.windowName);
        this.loggingService.backupLog(
          `${gameClosed.name}/${new Date()
            .toISOString()
            .replaceAll(/[:]/gm, '-')
            .replace('T', '--')
            .replace(/\.\d+Z/gm, '')}`,
        );
      });
      // Run game closed cleanup of the gep service
      this.gepService.onGameClosed();
    }
  }

  private onPostGame(postGame: PostGamePayload) {
    console.log(`Running post-game logic for game: ${postGame.name}`);
  }
}

container.resolve(IndexController);
