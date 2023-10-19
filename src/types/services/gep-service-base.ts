import { EventEmitter } from 'events';

/**
 * Payload of the `gameEvent` event
 */
export type GameEventPayload = overwolf.games.events.NewGameEvents;

/**
 * Payload of the `infoUpdate` event
 */
export type InfoUpdatePayload = overwolf.games.events.InfoUpdates2Event<
  string,
  overwolf.games.events.InfoUpdate2
>;

/**
 * Payload of the `error` event
 */
export type GEPErrorPayload = overwolf.games.events.ErrorEvent;

export type GEPEnabledFeatures = {
  enabled: string[];
  requested: string[];
};

export const GEPToken = 'GEPBase';

export type GEPEvents = {
  gameEvent: [GameEventPayload];
  infoUpdate: [InfoUpdatePayload];
  error: [GEPErrorPayload];
  enabledFeatures: [GEPEnabledFeatures];
};

export abstract class GEPServiceBase extends EventEmitter<GEPEvents> {
  protected enabledFeatures: GEPEnabledFeatures = {
    enabled: [],
    requested: [],
  };

  public getEnabledFeatures(): GEPEnabledFeatures {
    return this.enabledFeatures;
  }

  /**
   * Emit the fired Overwolf GEP Error
   *
   * @param {GEPErrorPayload} error - The fired GEP error
   */
  protected onErrorListener(error: GEPErrorPayload) {
    this.emit('error', error);
  }

  /**
   * Emit the fired Overwolf Game Info Update
   *
   * @param {InfoUpdatePayload} info - The fired info updated
   */
  protected onInfoUpdateListener(info: InfoUpdatePayload) {
    this.emit('infoUpdate', info);
  }

  /**
   * Emit the fired Overwolf Game Events as events
   *
   * @param {GEPEvents} events - The fired game events
   */
  protected onGameEventListener(events: GameEventPayload) {
    this.emit('gameEvent', events);
  }

  /**
   * Handles all GEP-related logic when a game is launched
   *
   * It is possible to register all listeners once when starting the app, and
   * then only de-register them when closing the app (if at all). We choose
   * to register/deregister them for every game, mostly just to show how.
   *
   * @param {string[] | undefined} requiredFeatures
   * - Optional list of required features. Ignored if this is a GEP SDK game
   * @returns {Promise<GEPEnabledFeatures | undefined>}
   * A promise resolving to the features that were successfully set,
   * or to nothing if this is a GEP SDK game
   * @throws Error if setting the required features failed too many times
   * (native GEP only)
   */
  public abstract onGameLaunched(
    requiredFeatures?: string[],
  ): Promise<GEPEnabledFeatures | undefined>;

  /**
   * Run cleanup logic for when a game was closed
   */
  public abstract onGameClosed(): boolean;

  /**
   * Set the required features for the current game
   *
   * @param {string[]} requestedFeatures
   * - An array containing the required features for this game
   * @param {number} maximumRetries
   * - The maximum amount of attempts before giving up on setting
   * the required features
   * @returns {Promise<GEPEnabledFeatures>}
   * A promise resolving to the features that were successfully set
   * @throws An error if setting the required features failed too many times
   */
  protected async setRequiredFeatures(
    requestedFeatures: string[],
    maximumRetries: number,
  ): Promise<GEPEnabledFeatures> {
    for (let i = 0; i < maximumRetries; i++) {
      try {
        this.enabledFeatures.enabled = await this.trySetRequiredFeatures(
          requestedFeatures,
        );
        this.enabledFeatures.requested = requestedFeatures;
        const enabledFeatures = this.enabledFeatures.enabled;
        console.log(`Required features set: ${this.enabledFeatures.enabled}`);
        if (enabledFeatures.length < requestedFeatures.length)
          console.warn(
            `Could not set ${requestedFeatures.filter(
              (feature) => !enabledFeatures.includes(feature),
            )}`,
          );
        return this.enabledFeatures;
      } catch (e) {
        console.warn(`Could not set required features: ${JSON.stringify(e)}`);
        console.log('Retrying in 5 seconds');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    throw new Error('Aborting required features!');
  }

  /**
   * Attempts to set the required features for this specific game
   *
   * @param {string[]} requiredFeatures
   * - An array containing the required features for this game
   * @returns {Promise<string[]>}
   * A promise resolving to the features that were successfully set
   * @throws {string} The error message given if the features failed to be set
   */
  protected abstract trySetRequiredFeatures(
    requiredFeatures: string[],
  ): Promise<string[]>;

  /**
   * Register all GEP listeners
   *
   * @returns {boolean} - True if registering the listeners was successful
   */
  public abstract startGEPListeners(): boolean;

  /**
   * De-register all GEP listeners
   *
   * @returns {boolean} - True if de-registering the listeners was successful
   */
  public abstract stopGEPListeners(): boolean;
}
