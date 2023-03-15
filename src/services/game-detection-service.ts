import { EventEmitter } from 'events';
import { injectable } from 'tsyringe';
import {
  GameClosedEvent,
  GameLaunchedEvent,
  PostGameEvent,
  RunningGame,
} from '../interfaces/running-game';

@injectable()
export class GameDetectionService extends EventEmitter {
  /**
   * The currently running game (if any)
   */
  private _runningGame?: RunningGame = undefined;

  /**
   * Setup Game Detection listeners
   */
  public init() {
    // Register listener for running game info changed
    overwolf.games.onGameInfoUpdated.addListener((update) =>
      this.gameUpdated(update),
    );
    // Get the currently running game (if any)
    overwolf.games.getRunningGameInfo2((info) => {
      // If there is a running game, run the non-fresh game launch logic
      if (info.gameInfo?.isRunning) this.gameLaunched(info.gameInfo, false);
    });
  }

  /**
   * Ran when a new game was launched
   *
   * @param {overwolf.games.RunningGameInfo} gameInfo
   * - The GameInfo of the new game
   * @param {boolean} freshLaunch
   * - Is this a "fresh launch", or was the game already open before it was
   * detected? (For example, the app opened after the game)
   */
  private gameLaunched(
    gameInfo: overwolf.games.RunningGameInfo,
    freshLaunch: boolean,
  ) {
    // Ensure that fresh launch was not called while there was a running game
    if (freshLaunch && this._runningGame)
      throw new Error(
        // eslint-disable-next-line max-len
        `A fresh launch was called, but a running game was already detected! Launched \`${gameInfo.title}\`, while \`${this._runningGame.name}\` was already running`,
      );

    // Set the currently running game
    this._runningGame = {
      // Game ID
      id: gameInfo.classId,
      // Display name of the game
      name: gameInfo.title,
    };

    // Construct the `gameLaunched` event
    const gameLaunchedEvent: GameLaunchedEvent = {
      ...this._runningGame,
      freshLaunch,
    };
    // Emit the `gameLaunched` event
    this.emit('gameLaunched', gameLaunchedEvent);
  }

  /**
   * Ran when a game was closed
   *
   * @param {boolean} fullShutdown - Is this a full shutdown or not?
   *
   * *Alternatively - did the game session end, or did the game simply change?*
   */
  private gameClosed(fullShutdown: boolean) {
    // Ensure that there is a game running before running `gameClosed` logic
    if (!this._runningGame)
      throw new Error(
        'Cannot run `gameClosed` when no game is currently running!',
      );

    // Construct the `gameClosed` event
    const gameClosedEvent: GameClosedEvent = {
      ...this._runningGame,
    };
    // Delete the currently running game
    this._runningGame = undefined;

    // Emit the `gameClosed` event
    this.emit('gameClosed', gameClosedEvent);

    // If post-game logic should run, emit the `postgame` event
    if (fullShutdown) {
      // Construct the `postGame` event
      const postGameEvent: PostGameEvent = {
        ...gameClosedEvent,
      };
      // Emit the `postGame` event
      this.emit('postGame', postGameEvent);
    }
  }

  /**
   * Ran when the currently active game's GameInfo is updated
   *
   * @param {overwolf.games.GameInfoUpdatedEvent} updateEvent
   * - The GameInfo updated event
   */
  private gameUpdated(updateEvent: overwolf.games.GameInfoUpdatedEvent) {
    /**
     * Did a new game just get launched?
     *
     * This could technically be done using `overwolf.games.onGameLaunched`.
     * However, as we already need to utilize `overwolf.games.onGameInfoUpdated`
     * to detect if a game was terminated, it is easier to just use it for both.
     */
    if (
      updateEvent.reason.includes(
        overwolf.games.enums.GameInfoChangeReason.GameLaunched,
      )
    ) {
      // Is there a game already running?
      if (this._runningGame) {
        // Run game closed cleanup, without running post-game logic
        this.gameClosed(false);
      }

      /* Run game launched logic for the new launched game, as a fresh launch,
       * as it was detected from the moment it was launched
       */
      this.gameLaunched(
        updateEvent.gameInfo as overwolf.games.RunningGameInfo,
        true,
      );
    }
    // If the game was terminated
    else if (
      updateEvent.reason.includes(
        overwolf.games.enums.GameInfoChangeReason.GameTerminated,
      )
    ) {
      // Run game closed cleanup, including post-game logic
      this.gameClosed(true);
    }
  }

  /**
   * Getter for the currently active game
   *
   * @returns {number | undefined} The currently running game (if any)
   */
  public currentlyRunningGame(): RunningGame | undefined {
    return this._runningGame;
  }
}
