import { EventEmitter } from 'events';

export type AppSettings = {
  backupLogs: boolean;
  targetFolder: string;
};

export const DefaultSettings: AppSettings = {
  backupLogs: true,
  targetFolder: `${overwolf.io.paths.desktop}/LogsBackup`,
};

export const SettingsToken = 'SettingsBase';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class SettingsServiceBase extends EventEmitter<{}> {
  public settings = DefaultSettings;
}
