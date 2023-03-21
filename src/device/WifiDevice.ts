import { Device } from "./Device";
import { exec, ExecResult, waitForMs } from "../utils/DeviceTools";

export class WifiDevice extends Device {
  public static async connectDevice(ip: string, port: number): Promise<WifiDevice> {
    await exec(`adb connect ${ip}:${port}`);
    return new WifiDevice(ip + ":" + port);
  }

  public static async usbDeviceToWifi(serial: string, port: number): Promise<WifiDevice> {
    await exec(`adb -s ${serial} tcpip ${port}`);
    await Device.waitForDevice(serial);

    const regIp = (await exec(`adb -s ${serial} shell ip -f inet addr show wlan0`))
      .stdout
      .match(/(?<=inet ).*(?=\/)/gm);
    if (regIp == null)
      throw new Error("Not able to receive devices's ip");
    return WifiDevice.connectDevice(regIp[0], port);
  }

  public disconnect(): Promise<ExecResult> {
    return exec(`adb disconnect ${this.serialId}`);
  }

  public get ip(): string {
    return this.serialId.split(":")[0];
  }

  public get port(): string {
    return this.serialId.split(":")[1];
  }

  public get address(): string {
    return this.serialId;
  }
}