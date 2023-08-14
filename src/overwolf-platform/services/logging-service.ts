import { AssertOverwolfSuccess } from '../../utils/assert-overwolf-success';
import { LoggingServiceBase } from '../../types/services/logging-service-base';
import { injectable } from 'tsyringe';
import { SettingsServiceBase } from '../../types/services/settings-service-base';

@injectable()
export class LoggingService extends LoggingServiceBase {
  constructor(private readonly settingsService: SettingsServiceBase) {
    super();
  }

  // private plugin: SimpleIOPlugin | undefined = undefined;
  private targetWindowName = '';
  private owVersion = overwolf.version;
  private gepVersion = '';
  private appName = '';

  public async init(targetWindow: string): Promise<void> {
    this.targetWindowName = targetWindow;
    overwolf.extensions.current.getManifest((result) => {
      // eslint-disable-next-line prettier/prettier
      AssertOverwolfSuccess(result, 'Could not get the app\' manifest!');

      this.appName = result.meta.name;
    });
    // eslint-disable-next-line max-len
    // overwolf.extensions.current.getExtraObject('simple-io-plugin', (result) => {
    //   AssertOverwolfSuccess(result, 'Failed to load the SimpleIO plugin!');

    //   console.log(result);
    //   this.plugin = result.object;
    // });
  }

  private getExtensionVersion(
    name: string,
    author: string,
    callback: (version: string) => void,
  ): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    overwolf.extensions.getExtensions((result: string[]) => {
      const asJSON: {
        meta: {
          name: string;
          author: string;
          version: string;
        };
      }[] = result.map((extension) => JSON.parse(extension));

      const version = asJSON.find((value) => {
        return value.meta.name === name && value.meta.author === author;
      })?.meta.version;
      if (!version)
        throw new Error(`Can't find ${name} extension by ${author}!`);
      callback(version);
    });
  }

  public reCheckGEPVersion(): void {
    this.getExtensionVersion(
      'Overwolf General GameEvents Provider',
      'Overwolf',
      (version) => (this.gepVersion = version),
    );
  }

  public backupLog(newLogName: string): void {
    const path =
      // logPath ??
      // eslint-disable-next-line max-len
      `${overwolf.io.paths.localAppData}/Overwolf/Log/Apps/${this.appName}/${this.targetWindowName}.html.log`;

    overwolf.io.readTextFile(
      path, // src
      {
        encoding: overwolf.io.enums.eEncoding.UTF8,
        maxBytesToRead: 0,
        offset: 0,
      },
      (result) => {
        overwolf.io.writeFileContents(
          // eslint-disable-next-line max-len
          `${this.settingsService.settings.targetFolder}/${this.gepVersion}/${newLogName}--ow-${this.owVersion}.log`, // dst
          result.content as string,
          overwolf.io.enums.eEncoding.UTF8,
          false,
          (result) => {
            console.log(
              result.success
                ? 'Successfully backed up log!'
                : `Backup failed, ${result.error}`,
            );
          },
        );
      },
    );
  }
}
