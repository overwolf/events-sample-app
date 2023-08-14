import { injectable } from 'tsyringe';
import {
  GEPErrorPayload,
  GEPEnabledFeatures,
  GEPServiceBase,
  GameEventPayload,
  InfoUpdatePayload,
} from '../../types/services/gep-service-base';

@injectable()
export class GEPService extends GEPServiceBase {
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
  public async onGameLaunched(
    requiredFeatures?: string[],
  ): Promise<GEPEnabledFeatures | undefined> {
    console.log('Registering GEP listeners');
    this.startGEPListeners();
    if (requiredFeatures) {
      console.log('Registering required features');
      this.enabledFeatures = await this.setRequiredFeatures(
        requiredFeatures,
        10,
      );
      this.emit('enabledFeatures', this.enabledFeatures);
      return this.enabledFeatures;
    }

    console.log('GEP SDK detected, no need to set required features');
  }

  /**
   * Run cleanup logic for when a game was closed
   *
   * @returns {boolean} - True if de-registering the listeners was successful
   */
  public onGameClosed(): boolean {
    console.log('Cleaning up GEP logic');
    this.enabledFeatures = {
      enabled: [],
      requested: [],
    };
    return this.stopGEPListeners();
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
  protected async trySetRequiredFeatures(
    requiredFeatures: string[],
  ): Promise<string[]> {
    let registered: (result: string[]) => void;
    let failed: (reason: string) => void;

    // Create a promise, and save its resolve/reject callbacks
    const promise: Promise<string[]> = new Promise(function (resolve, reject) {
      registered = resolve;
      failed = reject;
    });

    // Try to set the required features
    overwolf.games.events.setRequiredFeatures(requiredFeatures, (result) => {
      // If features failed to be set
      if (!result.success) {
        // Fail the current attempt with the error message
        return failed(result.error as string);
      }

      // Approve the current attempt, and return the list of set features
      registered(result.supportedFeatures as string[]);
    });

    // Return the dummy promise
    return promise;
  }

  private errorListener = (error: GEPErrorPayload) =>
    this.onErrorListener(error);

  private eventsListener = (events: GameEventPayload) =>
    this.onGameEventListener(events);

  private infoListener = (info: InfoUpdatePayload) =>
    this.onInfoUpdateListener(info);

  /**
   * Register all GEP listeners
   *
   * @returns {boolean} - True if registering the listeners was successful
   */
  public startGEPListeners(): boolean {
    // Register errors listener
    overwolf.games.events.onError.addListener(this.errorListener);

    // Register Info Update listener
    overwolf.games.events.onInfoUpdates2.addListener(this.infoListener);

    // Register Game event listener
    overwolf.games.events.onNewEvents.addListener(this.eventsListener);

    return true;
  }

  /**
   * De-register all GEP listeners
   *
   * @returns {boolean} - True if de-registering the listeners was successful
   */
  public stopGEPListeners(): boolean {
    overwolf.games.events.onError.removeListener(this.errorListener);
    overwolf.games.events.onInfoUpdates2.removeListener(this.infoListener);
    overwolf.games.events.onNewEvents.removeListener(this.eventsListener);
    return true;
  }
}
