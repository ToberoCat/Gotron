import { Device } from "./Device";

export class USBDevice extends Device {
  public static connectToDevice(serialId: string): USBDevice {
    return new USBDevice(serialId);
  }
}