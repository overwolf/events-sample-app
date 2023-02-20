import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import games_config from './games_config.json';

// -----------------------------------------------------------------------------
export interface Game {
  title: string;
  icon: string;
  icon_gray: string;
  interestedInFeatures?: string[];
  description: string;
}

// -----------------------------------------------------------------------------
export interface GameData {
  [key: string]: Game;
}

declare global {
  interface Window {
    overwolf: any;
  }
}
// -----------------------------------------------------------------------------
@injectable()
export class Main {
  // ---------------------------------------------------------------------------
  public constructor() {
    this.run();
  }

  // ---------------------------------------------------------------------------
  public run(): void {
    const overwolf = window.overwolf;

    let gameData = games_config.data as unknown as GameData;
    let gameId;
    let g_interestedInFeatures: any;

    var onErrorListener: (info: any) => void, onInfoUpdates2Listener: (info: any) => void, onNewEventsListener: (info: any) => void;

    function registerEvents() {

      onErrorListener = function (info) {
        console.log("Error: " + JSON.stringify(info));
      }

      onInfoUpdates2Listener = function (info) {
        console.log("Info UPDATE: " + JSON.stringify(info));
      }

      onNewEventsListener = function (info) {
        console.log("EVENT FIRED: " + JSON.stringify(info));
      }

      // general events errors
      overwolf.games.events.onError.addListener(onErrorListener);

      // "static" data changed (total kills, username, steam-id)
      // This will also be triggered the first time we register
      // for events and will contain all the current information
      overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2Listener);
      // an event triggerd
      overwolf.games.events.onNewEvents.addListener(onNewEventsListener);
    }

    function unregisterEvents() {
      overwolf.games.events.onError.removeListener(onErrorListener);
      overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
      overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);
    }

    function gameLaunched(gameInfoResult: { gameInfo: { isRunning: any; id: number; }; runningChanged: any; gameChanged: any; }) {
      if (!gameInfoResult) {
        return false;
      }

      if (!gameInfoResult.gameInfo) {
        return false;
      }

      if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
        return false;
      }

      if (!gameInfoResult.gameInfo.isRunning) {
        return false;
      }

      // NOTE: we divide by 10 to get the game class id without it's sequence number
      if (gameData.hasOwnProperty(Math.floor(gameInfoResult.gameInfo.id / 10))) {
        gameId = Math.floor(gameInfoResult.gameInfo.id / 10);
        g_interestedInFeatures = gameData[gameId].interestedInFeatures;

        return true;
      }
    }

    function gameRunning(gameInfo: { isRunning: any; id: number; }) {

      if (!gameInfo) {
        return false;
      }

      if (!gameInfo.isRunning) {
        return false;
      }

      // NOTE: we divide by 10 to get the game class id without it's sequence number
      if (gameData.hasOwnProperty(Math.floor(gameInfo.id / 10))) {
        gameId = Math.floor(gameInfo.id / 10);
        g_interestedInFeatures = gameData[gameId].interestedInFeatures;

        return true;
      }
    }


    function setFeatures() {
      overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function (info: { status: string; }) {
        if (info.status == "error") {
          console.log("Could not set required features: " + JSON.stringify(info));
          console.log("Trying in 2 seconds");
          window.setTimeout(setFeatures, 2000);
          return;
        }

        console.log("Set required features:");
        console.log(JSON.stringify(info));
      });
    }

    function getInfo() {
      overwolf.games.events.getInfo(function (info: any) {
        if (info.status == "success") {
          let tmp_version = JSON.parse(info.res.gep_internal.version_info);
          let version = tmp_version.local_version;
          let elem = document.getElementById("dvDiff");
          if (elem != null) {
            elem.innerHTML = " <p>GEP version  <span style=color:red><strong>" + version + "</strong></span></p>";
          }
          else
          window.setTimeout(getInfo, 2000);
          return;
        }
      });
    }


    // Start here
    overwolf.games.onGameInfoUpdated.addListener(function (res: { gameInfo: { isRunning: any; id: number; }; runningChanged: any; gameChanged: any; }) {
      if (gameLaunched(res)) {
        getInfo();
        registerEvents();
        unregisterEvents();
        setTimeout(setFeatures, 1000);
      }
      console.log("onGameInfoUpdated: " + JSON.stringify(res));
    });

    overwolf.games.getRunningGameInfo(function (res: { isRunning: any; id: number; }) {
      if (gameRunning(res)) {
        getInfo();
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
      console.log("getRunningGameInfo: " + JSON.stringify(res));
    });
  }
}

container.resolve(Main);
