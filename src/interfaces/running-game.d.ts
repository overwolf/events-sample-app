/**
 * Structure of the `gameLaunched` event
 */
export interface GameLaunchedEvent extends RunningGame {
  /**
   * Is this a fresh launch, or was the game already running?
   */
  freshLaunch: boolean;
}

/**
 * Structure of the `gameClosed` event
 */
export type GameClosedEvent = RunningGame;

/**
 * Structure of the `postGame` event
 */
export type PostGameEvent = GameClosedEvent;

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
