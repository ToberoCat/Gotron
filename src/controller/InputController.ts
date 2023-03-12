// noinspection JSUnusedGlobalSymbols

import { Device } from "../Device";
import { ExecResult } from "../index";
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

  public back(): Promise<ExecResult> {
    return this.device.shell("input keyevent 4");
  }

  public home(): Promise<ExecResult> {
    return this.device.shell("input keyevent KEYCODE_HOME");
  }

  public recent(): Promise<ExecResult> {
    return this.device.shell("input keyevent 1");
  }

  public type(text: string): Promise<ExecResult> {
    return this.device.shell(`input text ${text.replaceAll(" ", "%s")}`);
  }
}