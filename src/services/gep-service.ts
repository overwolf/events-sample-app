import { EventEmitter } from "events";
import { injectable } from "tsyringe";

@injectable()
export class GEPService extends EventEmitter {
    /**
     * Emit the fired Overwolf GEP Error
     * 
     * @param {overwolf.games.events.ErrorEvent} error - The fired GEP error
     */
    private onErrorListener(error: overwolf.games.events.ErrorEvent) {
        this.emit('error', error);
    }

    /**
     * Emit the fired Overwolf Game Info Update
     * 
     * @param {overwolf.games.events.InfoUpdates2Event<String, overwolf.games.events.InfoUpdate2>} info - The fired info updated
     */
    private onInfoUpdateListener(info: overwolf.games.events.InfoUpdates2Event<String, overwolf.games.events.InfoUpdate2>) {
        this.tryEmit('infoUpdate', info);
    }

    /**
     * Emit the fired Overwolf Game Events as events
     * 
     * @param {overwolf.games.events.NewGameEvents} events - The fired game events
     */
    private onGameEventListener(events: overwolf.games.events.NewGameEvents) {
        this.tryEmit('gameEvent', events);
    }

    /**
     * Attempt to emit an event. If there are no listeners for this event, log it as a warning
     * 
     * @param {string} event - The name of the event
     * @param {any} value - The value of the event
     */
    private tryEmit(event: string, value: any) {
        if(this.listenerCount(event)) {
            this.emit(event, value);
        } else {
            console.warn(`Unhandled ${event}, with value ${value}`);
        }
    }

    /**
     * Handles all GEP-related logic when a game is launched
     * 
     * @param {string[] | undefined} requiredFeatures - Optional list of required features. Ignored if this is a GEP SDK game
     * @returns {Promise<string[] | undefined} - A promise resolving to the features that were successfully set, or to nothing if this is a GEP SDK game
     * @throws {Error} - An error if this is a native GEP game, and setting the required features failed too many times
     */
    public async onGameLaunched(requiredFeatures?: string[]): Promise<string[] | undefined> {
        console.log("Registering GEP listeners");
        this.registerEvents();
        if(requiredFeatures){
            console.log("Registering required features");
            return this.setRequiredFeatures(requiredFeatures, 10);
        } else {
            console.log("GEP SDK detected, no need to set required features");
            return;
        }
    }

    /**
     * Run cleanup logic for when a game was closed
     */
    public onGameClosed() {
        console.log("Removing all GEP listeners");
        this.unregisterEvents();
    }

    /**
     * Set the required features for the current game
     * 
     * @param {string[]} requiredFeatures - An array containing the required features for this game
     * @param {number} maximumRetries - The maximum amount of retries to run before giving up on setting the required features
     * @returns {Promise<string[]>} - A promise resolving to the features that were successfully set
     * @throws {Error} - An error if setting the required features failed too many times
     */
    private async setRequiredFeatures(requiredFeatures: string[], maximumRetries: number): Promise<string[]> {
        for(var i = 0; i < maximumRetries; i++){
            try {
                const success = await this.trySetRequiredFeatures(requiredFeatures);
                console.log(`Required features set: ${success}`);
                if(success.length < requiredFeatures.length) console.warn(`Could not set ${requiredFeatures.filter(feature => !success.includes(feature))}`);
                return success;
            } catch (e) {
                console.log(`Could not set required features: ${JSON.stringify(e)}`);
                console.log("Retrying in 2 seconds");
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        throw new Error(`Aborting required features!`);
    }

    /**
     * Attempts to set the required features for this specific game
     * 
     * @param {string[]} requiredFeatures - An array containing the required features for this game
     * @returns {Promise<string[]>} A promise resolving to the features that were successfully set
     * @throws {string} The error message given if the features failed to be set
     */
    private async trySetRequiredFeatures(requiredFeatures: string[]): Promise<string[]> {
        var registered: (result: string[]) => void;
        var failed: (reason: string) => void;
        
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
            // Approve the current attempt, and return the list of features that were set
            registered(result.supportedFeatures as string[]);
        });

        // Return the dummy promise
        return promise;
    }

    /**
     * Register all GEP listeners
     */
    public registerEvents() {  
        // Register errors listener
        overwolf.games.events.onError.addListener(error => this.onErrorListener(error));
  
        // Register Info Update listener
        overwolf.games.events.onInfoUpdates2.addListener(update => this.onInfoUpdateListener(update));

        // Register Game event listener
        overwolf.games.events.onNewEvents.addListener(event => this.onGameEventListener(event));
    }

    /**
     * De-register all GEP listeners
     */
    public unregisterEvents() {
        overwolf.games.events.onError.removeListener(this.onErrorListener);
        overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdateListener);
        overwolf.games.events.onNewEvents.removeListener(this.onGameEventListener);
    }
}