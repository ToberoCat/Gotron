import { DeviceActor } from "./Controller";
import { ExecResult } from "../utils/DeviceTools";
import { Device } from "../device/Device";

export class FileController extends DeviceActor {
  constructor(device: Device) {
    super(device);
  }
  public async getFile(deviceFilePath: string, localFilePath: string): Promise<ExecResult> {
    return this.device.adb(`pull ${deviceFilePath} ${localFilePath}`);
  }

  public async uploadFile(deviceFilePath: string, localFilePath: string): Promise<ExecResult> {
    return this.device.adb(`push ${localFilePath} ${deviceFilePath}`);

  }
}