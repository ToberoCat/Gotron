// noinspection JSUnusedGlobalSymbols

import { Device } from "../device/Device";
import { ExecResult, waitForCondition } from "../utils/DeviceTools";
import { DeviceActor } from "./Controller";

export class AppController extends DeviceActor {

  constructor(device: Device) {
    super(device);
  }

  public async openActivities(): Promise<Activity[]> {
    return (await this.device.shell("dumpsys activity"))
      .stdout
      .split("\n")
      .filter(x => x.includes("realActivity"))
      .map(x => x.trim())
      .map(x => x
        .replace("realActivity={", "")
        .replace("}", ""))
      .map(x => x.split("/"))
      .map(x => ({ appPackage: x[0], activityPackage: x[1] }));
  }

  public installApp(pathToApp: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const output = await this.device.adb(`-r install ${pathToApp}`);
      if (!output.stdout.trim().endsWith("Success"))
        return reject(new Error("Failed to install App. Error: " + output.stdout));
      resolve();
    });
  }

  public async getActivities(packageName: string): Promise<Activity[]> {
    return (await this.device.shell(`dumpsys package ${packageName}`))
      .stdout
      .split("\n")
      .slice(1)
      .filter(x => x.toLowerCase().includes("activity"))
      .filter(x => !x.toLowerCase().match(/(?<=activity\.).*/gm))
      .map(x => (/(?<= )(.*?)(?= filter)/gm.exec(x)))
      .map(x => x == null ? "" : x[0])
      .filter(x => x)
      .map(x => x.trim().split(" ")[1].split("/"))
      .map(x => ({ appPackage: x[0], activityPackage: x[1] }));
  }

  public startApp(packageName: string): Promise<ExecResult> {
    return this.device.shell(`am start ${packageName}`);
  }

  public startActivity(activity: Activity): Promise<ExecResult> {
    return this.device.shell(`am start -W -n ${activity.appPackage}/${activity.activityPackage}`);
  }

  public waitForActivity(activity: Activity, timeout: number = 200): Promise<void> {
    return waitForCondition(async () => (await this.openActivities())
      .filter(x =>
        x.appPackage === activity.appPackage &&
        x.activityPackage === activity.activityPackage)
      .length >= 1, timeout);
  }

  public async isAppInstalled(packageName: string): Promise<boolean> {
    return (await this.device.shell(`pm list packages ${packageName}`))
      .stdout
      .trim()
      .endsWith(packageName);
  }

  public killApp(packageName: string): Promise<ExecResult> {
    return this.device.shell(`am force-stop ${packageName}`);
  }

  public async isAppRunning(packageName: string): Promise<boolean> {
    return (await this.device.shell(`pidof ${packageName}`))
      .stdout
      .trim()
      .length === 0;
  }
}

export interface Activity {
  appPackage: string;
  activityPackage: string;
}