import { AppController } from "../controller/AppController";
import { InputController } from "../controller/InputController";
import { exec, ExecResult } from "../utils/DeviceTools";
import { Hierarchy } from "../controller/HierarchyController";
import { FileController } from "../controller/FileController";

export class Device {
  private readonly _serialId: string;
  private readonly _appController: AppController;
  private readonly _inputController: InputController;
  private readonly _fileController: FileController;

  protected constructor(serialId: string) {
    this._serialId = serialId;
    this._appController = new AppController(this);
    this._inputController = new InputController(this);
    this._fileController = new FileController(this);
  }

  public static async getDevices(): Promise<string[]> {
    return (await exec("adb devices"))
      .stdout
      .split("\n")
      .slice(1)
      .map(x => x.trim())
      .map(x => x.split("\t")[0])
      .filter(x => x);
  }

  public static waitForDevice(serial: string): Promise<void> {
    return new Promise<void>(resolve => {
      const id = setInterval(async () => {
        if (!(await Device.getDevices()).includes(serial))
          return;
        clearInterval(id);
        resolve();
      }, 200);
    });
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
        if ((await this.shell("getprop sys.boot_completed")).stdout.trim() !== "1")
          return;

        clearInterval(intervalId);
        resolve();
      }, 200);
    });
  }

  public async screenshot(filePath: string): Promise<void> {
    const name = Date.now() + ".png";
    await this.shell(`screencap /sdcard/${name}`);
    await this._fileController.getFile(`/sdcard/${name}`, filePath);
  }

  public get apps(): AppController {
    return this._appController;
  }

  public get inputs(): InputController {
    return this._inputController;
  }


  public get files(): FileController {
    return this._fileController;
  }

  public get serialId(): string {
    return this._serialId;
  }
}