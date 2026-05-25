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
    Object.keys(info.info).forEach((categoryKey) => {
      // @ts-expect-error incomplete underlying typings
      const category = info.info[categoryKey];
      Object.keys(category).forEach((key) => {
        const value = category[key];
        console.log(`Game Info Changed:{"feature": "${info.feature}", "category": "${categoryKey}", "key": "${key}", "data": ${prettify(value)}}`);

        if (categoryKey === 'plugin_status' && typeof value === 'string' && value.startsWith('failed_')) {
          console.log(JSON.stringify({ category: categoryKey, key, value }));
          console.error(`[PLUGIN ERROR] plugin_status.${key}: ${value}`);
        }

        if (key.startsWith("roster")) {
          overwolf.games.events.getInfo((info) => {
            try {
              const parsedInfo = typeof info === "string" ? JSON.parse(info) : info;
              const matchInfo = parsedInfo.res?.match_info;

              if (matchInfo && typeof matchInfo === "object") {
                const rosterEntries = Object.entries(matchInfo)
                  .filter(([rosterKey]) => rosterKey.startsWith("roster_"))
                  .map(([rosterKey, value]) => `${rosterKey}: ${JSON.stringify(value, null, 2)}`);

                console.log(rosterEntries.join("\n"));
              }
            } catch (error) {
              console.error("Failed to parse game info:", error);
            }
          });
        }
      });
    });
  }





  /**
   * Consumes the game events fired by the Overwolf GEP
   *
   * @param {GameEventPayload} event
   * - An array of fired Game Events
   */
  public onNewGameEvent(event: GameEventPayload) {
    console.log(`Game Event Fired:[${event.events.map((event, index) => `"event ${index}": ${prettify(event)}`,)}]`);

    event.events.forEach((gameEvent) => {
      if (gameEvent.name === 'plugin_crashed') {
        console.log(JSON.stringify(gameEvent));
        try {
          const parsed = typeof gameEvent.data === 'string' ? JSON.parse(gameEvent.data) : gameEvent.data;
          console.error(`[PLUGIN CRASH] module: ${parsed?.module ?? 'unknown'}`);
        } catch {
          console.error(`[PLUGIN CRASH] ${gameEvent.data}`);
        }
      }
    });
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
