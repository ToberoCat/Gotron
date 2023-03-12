import { Device } from "./Device";
import { exec } from "./index";

export class Emulator extends Device {

  public static async newEmulator(port: number, emulatorId?: string): Promise<Emulator> {
    if (emulatorId == undefined)
      emulatorId = (await this.getInstalledDevices())[0];

    if (emulatorId == undefined)
      throw new Error("No avd was found with the name " + emulatorId);

    exec(`emulator -ports ${port},${port + 1} @${emulatorId}`)
      .then(() => console.log("Emulator stopped"));
    return new Emulator("emulator-" + port);
  }

  public static async connectToEmulator(port: number): Promise<Emulator> {
    return new Emulator("emulator-" + port);
  }

  public static async getInstalledDevices(): Promise<string[]> {
    return (await exec("emulator -list-avds"))
      .stdout
      .split("\n")
      .slice(0, -1);
  }
}