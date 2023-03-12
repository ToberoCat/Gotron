// noinspection JSUnusedGlobalSymbols

import { Device } from "../Device";
import { exec, ExecResult } from "../index";
import { DeviceActor } from "./Controller";

export class AppController extends DeviceActor {

  constructor(device: Device) {
    super(device);
  }

  public installApp(app: App): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const output = await this.device.adb(`-r install ${app.apkPath}`);
      if (!output.stdout.trim().endsWith("Success"))
        return reject(new Error("Failed to install App. Error: " + output.stdout));
      resolve();
    });
  }

  public async isAppInstalled(app: App): Promise<boolean> {
    return (await this.device.shell(`pm list packages ${app.packageName}`))
      .stdout
      .trim()
      .endsWith(app.packageName);
  }

  public killApp(app: App): Promise<ExecResult> {
    return this.device.shell(`am kill ${app.packageName}`);
  }

  public async isAppRunning(app: App): Promise<boolean> {
    return (await this.device.shell(`pidof ${app.packageName}`))
      .stdout
      .trim()
      .length === 0;
  }
}

export class App {

  private readonly _packageName: string;
  private readonly _apkPath: string;

  constructor(apkPath: string, packageName: string) {
    this._packageName = packageName;
    this._apkPath = apkPath;
  }

  public static async appFromPath(apkPath: string): Promise<App> {
    return new App(apkPath, await App.parsePackageName(apkPath));
  }

  public static async appFromPackage(packageName: string): Promise<App> {
    return new App("", packageName);
  }

  private static async parsePackageName(apkPath: string): Promise<string> {
    return new Promise<string>(async resolve => {
      const res = await exec(`aapt dump badging ${apkPath} | grep package:\\ name`);
      resolve(res.stdout.split(" ")[1].split("=")[1].replaceAll("'", ""));
    });
  }

  public get packageName(): string {
    return this._packageName;
  }


  public get apkPath(): string {
    return this._apkPath;
  }
}

export enum DefaultApps {
  CHROME = "com.android.chrome"
}