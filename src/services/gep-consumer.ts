import { injectable } from 'tsyringe';

@injectable()
export class GEPConsumer {
  /**
   * Consumes errors fired by the Overwolf GEP
   *
   * @param {overwolf.games.events.ErrorEvent} error - A fired error event
   */
  public onGEPError(error: overwolf.games.events.ErrorEvent) {
    console.error(`GEP Error: ${prettify(error)}`);
  }

  /**
   * Consumes game info updates fired by the Overwolf GEP
   *
   * @param {overwolf.games.events.InfoUpdates2Event<
   *  string,
   *  overwolf.games.events.InfoUpdate2
   * >} info - An array of fired info updates
   */
  public onGameInfoUpdate(
    info: overwolf.games.events.InfoUpdates2Event<
      string,
      overwolf.games.events.InfoUpdate2
    >,
  ) {
    console.log(`Game Info Changed: ${prettify(info)}`);
  }

  /**
   * Consumes the game events fired by the Overwolf GEP
   *
   * @param {overwolf.games.events.NewGameEvents} event
   * - An array of fired Game Events
   */
  public onNewGameEvent(event: overwolf.games.events.NewGameEvents) {
    console.log(`Game Event Fired: ${prettify(event)}`);
  }
}

/**
 * Format/prettify GEP data for logging/display
 *
 * @param {any} data - The data to be prettified
 * @returns {string} A prettified string representation of the input data
 */
const prettify = (data: any): string => {
  return JSON.stringify(data, undefined, 4);
};
