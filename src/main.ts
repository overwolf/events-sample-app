import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import gameData from './config/game-data';
import { GEPService } from './services/gep-service';
import { GameDetectionService } from './services/game-detection-service';
import {
  GameClosedEvent,
  GameLaunchedEvent,
  PostGameEvent,
} from './interfaces/running-game';
import { GEPConsumer } from './services/gep-consumer';

// -----------------------------------------------------------------------------
@injectable()
export class Main {
  public constructor(
    private readonly gepService: GEPService,
    private readonly gepConsumer: GEPConsumer,
    private readonly gameDetectionService: GameDetectionService,
  ) {
    this.init();
  }

  /**
   * Initializes this app
   */
  public init(): void {
    // Register for the `gameLaunched` event from the game detection service
    this.gameDetectionService.on(
      'gameLaunched',
      (gameLaunch: GameLaunchedEvent) => {
        console.log(`Game was launched: ${gameLaunch.name} ${gameLaunch.id}`);
        // Get the configured data for the launched game
        const gameConfig = gameData[gameLaunch.id];
        // If the detected game exists
        if (gameConfig) {
          // Run the game launched logic of the gep service
          this.gepService.onGameLaunched(gameConfig.interestedInFeatures);
        }
      },
    );
    // Register for the `gameClosed` event from the gameDetectionService
    this.gameDetectionService.on(
      'gameClosed',
      (gameClosed: GameClosedEvent) => {
        console.log(`Game was closed: ${gameClosed.name}`);
        // Run game closed cleanup of the gep service
        this.gepService.onGameClosed();
      },
    );
    // Register for the `postGame` event from the gameDetectionService
    this.gameDetectionService.on('postGame', (postGame: PostGameEvent) => {
      console.log(`Running post-game logic for game: ${postGame.name}`);
    });

    // Register for the `gameEvent`, `infoUpdate`, and `error` gepService events
    this.gepService.on('gameEvent', this.gepConsumer.onNewGameEvent);
    this.gepService.on('infoUpdate', this.gepConsumer.onGameInfoUpdate);
    this.gepService.on('error', this.gepConsumer.onGEPError);

    // Initialize the game detection service
    this.gameDetectionService.init();
  }
}

container.resolve(Main);
