import { Device } from "../device/Device";

export class DeviceActor {
  protected readonly device: Device;

  protected constructor(device: Device) {
    this.device = device;
  }
}