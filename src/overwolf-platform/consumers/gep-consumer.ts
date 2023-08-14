import { injectable } from 'tsyringe';
import {
  GEPErrorPayload,
  GameEventPayload,
  InfoUpdatePayload,
} from '../../types/services/gep-service-base';

@injectable()
export class GEPConsumer {
  /**
   * Consumes errors fired by the Overwolf GEP
   *
   * @param {GEPErrorPayload} error - A fired error event
   */
  public onGEPError(error: GEPErrorPayload) {
    console.error(`GEP Error: ${prettify(error.reason)}`);
  }

  /**
   * Consumes game info updates fired by the Overwolf GEP
   *
   * @param {InfoUpdatePayload} info - An array of fired info updates
   */
  public onGameInfoUpdate(info: InfoUpdatePayload) {
    console.log(`Game Info Changed: ${prettify(info.info)}`);
  }

  /**
   * Consumes the game events fired by the Overwolf GEP
   *
   * @param {GameEventPayload} event
   * - An array of fired Game Events
   */
  public onNewGameEvent(event: GameEventPayload) {
    console.log(`Game Event Fired: ${prettify(event.events)}`);
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
