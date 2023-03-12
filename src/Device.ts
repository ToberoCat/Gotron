import { AppController } from "./controller/AppController";
import { InputController } from "./controller/InputController";
import { exec, ExecResult } from "./index";
import { Hierarchy } from "./controller/HierarchyController";

export class Device {
  private readonly _serialId: string;
  private readonly _appController: AppController;
  private readonly _inputController: InputController;

  protected constructor(serialId: string) {
    this._serialId = serialId;
    this._appController = new AppController(this);
    this._inputController = new InputController(this);
  }

  public async platformVersion(): Promise<string> {
    return (await this.shell("getprop ro.build.version.release"))
      .stdout
      .split("\n")[0]
      .trim();
  }

  public async adb(command: string): Promise<ExecResult> {
    return exec(`adb -s ${this._serialId} ${command}`);
  }

  public async shell(command: string): Promise<ExecResult> {
    return this.adb(`shell ${command}`);
  }

  public async hierarchy(): Promise<Hierarchy> {
    return new Hierarchy(this, (await this.adb("exec-out uiautomator dump /dev/tty"))
      .stdout
      .replace("UI hierchary dumped to: /dev/tty", "")
      .trim());
  }

  public waitTillBoot(): Promise<void> {
    return new Promise(async resolve => {
      await this.adb("wait-for-device");
      const intervalId = setInterval(async () => {
        if ((await this.shell("getprop sys.boot_completed")).stdout.trim() != "1")
          return;

        clearInterval(intervalId);
        resolve();
      }, 200);
    });
  }

  public get apps(): AppController {
    return this._appController;
  }

  public get inputs(): InputController {
    return this._inputController;
  }

  public get serialId(): string {
    return this._serialId;
  }
}