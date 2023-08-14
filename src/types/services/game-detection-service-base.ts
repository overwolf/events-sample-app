import { EventEmitter } from 'events';

/**
 * Information relevant to the app from a running game
 */
export interface RunningGame {
  /**
   * The game ID of the game, without the instance number
   */
  id: number;
  /**
   * The display name of the game
   */
  name: string;
}

/**
 * Payload of the `gameLaunched` event
 */
export interface GameLaunchedPayload extends RunningGame {
  /**
   * Is this a fresh launch, or was the game already running?
   */
  freshLaunch: boolean;
}

/**
 * Payload of the `gameClosed` event
 */
export type GameClosedPayload = RunningGame;

/**
 * Payload of the `postGame` event
 */
export type PostGamePayload = GameClosedPayload;

export type GameDetectionEvents = {
  gameLaunched: [GameLaunchedPayload];
  gameClosed: [GameClosedPayload];
  postGame: [PostGamePayload];
};

export const GameDetectionToken = 'GameDetectionBase';

// eslint-disable-next-line prettier/prettier
export abstract class GameDetectionServiceBase extends EventEmitter<
  GameDetectionEvents
> {
  /**
   * Begin listening to running game data
   */
  public abstract start(): void;

  /**
   * Getter for the currently active game
   *
   * @returns {number | undefined} The currently running game (if any)
   */
  public abstract currentlyRunningGame(): RunningGame | undefined;
}
