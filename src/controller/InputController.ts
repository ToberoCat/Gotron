// noinspection JSUnusedGlobalSymbols

import { Device } from "../device/Device";
import { ExecResult } from "../utils/DeviceTools";
import { DeviceActor } from "./Controller";

export class InputController extends DeviceActor {

  constructor(device: Device) {
    super(device);
  }

  public swipe(x1: number, y1: number, x2: number, y2: number): Promise<ExecResult> {
    return this.device.shell(`input touchscreen swipe ${x1} ${y1} ${x2} ${y2}`);
  }

  public click(x: number, y: number): Promise<ExecResult> {
    return this.device.shell(`input tap ${x} ${y}`);
  }

  public pressKey(key: string): Promise<ExecResult> {
    return this.device.shell(`input keyevent ${key}`);
  }

  public back(): Promise<ExecResult> {
    return this.pressKey("KEYCODE_BACK");
  }

  public home(): Promise<ExecResult> {
    return this.pressKey("KEYCODE_HOME");
  }

  public recent(): Promise<ExecResult> {
    return this.pressKey("KEYCODE_MENU");
  }

  public enter(): Promise<ExecResult> {
    return this.pressKey("66");
  }

  public type(text: string): Promise<ExecResult> {
    return this.device.shell(`input text "${text.replaceAll(" ", "%s")}"`);
  }
}