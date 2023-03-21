import { DeviceActor } from "../controller/Controller";
import { SelectedValue } from "xpath";
import { Device } from "../device/Device";
import { ExecResult, waitForMs } from "../utils/DeviceTools";
import { Bounds } from "../utils/Bounds";

export class AppElement extends DeviceActor {
  private readonly _rawElement: SelectedValue;
  private readonly _index: string;
  private readonly _text: string;
  private readonly _resourceId: string;
  private readonly _className: string;
  private readonly _packageName: string;
  private readonly _contentDesc: string;
  private readonly _checkable: boolean;
  private readonly _checked: boolean;
  private readonly _clickable: boolean;
  private readonly _enabled: boolean;
  private readonly _focusable: boolean;
  private readonly _focused: boolean;
  private readonly _scrollable: boolean;
  private readonly _longClickable: boolean;
  private readonly _password: boolean;
  private readonly _selected: boolean;
  private readonly _bounds: Bounds;

  // @ts-ignore
  constructor(device: Device, rawElement) {
    super(device);
    this._rawElement = rawElement;
    this._index = rawElement.attributes["0"].value;
    this._text = rawElement.attributes["1"].value;
    this._resourceId = rawElement.attributes["2"].value;
    this._className = rawElement.attributes["3"].value;
    this._packageName = rawElement.attributes["4"].value;
    this._contentDesc = rawElement.attributes["5"].value;
    this._checkable = rawElement.attributes["6"].value;
    this._checked = rawElement.attributes["7"].value;
    this._clickable = rawElement.attributes["8"].value;
    this._enabled = rawElement.attributes["9"].value;
    this._focusable = rawElement.attributes["10"].value;
    this._focused = rawElement.attributes["11"].value;
    this._scrollable = rawElement.attributes["12"].value;
    this._longClickable = rawElement.attributes["13"].value;
    this._password = rawElement.attributes["14"].value;
    this._selected = rawElement.attributes["15"].value;

    const bounds = rawElement.attributes["16"].value.split(/[\[\],]/gm).filter((x: any) => x).map(parseFloat);
    this._bounds = new Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
  }

  public click(): Promise<ExecResult> {
    // ToDo: Implement automatic scrolling to make the element visible
    const center = this._bounds.center();
    return this.device.inputs.click(center.x, center.y);
  }

  public async type(text: string): Promise<ExecResult> {
    await this.click();
    await waitForMs(100);
    return this.device.inputs.type(text);
  }

  public get rawElement(): SelectedValue {
    return this._rawElement;
  }


  public get index(): string {
    return this._index;
  }

  public get text(): string {
    return this._text;
  }

  public get resourceId(): string {
    return this._resourceId;
  }

  public get className(): string {
    return this._className;
  }

  public get packageName(): string {
    return this._packageName;
  }

  public get contentDesc(): string {
    return this._contentDesc;
  }

  public get checkable(): boolean {
    return this._checkable;
  }

  public get checked(): boolean {
    return this._checked;
  }

  public get clickable(): boolean {
    return this._clickable;
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public get focusable(): boolean {
    return this._focusable;
  }

  public get focused(): boolean {
    return this._focused;
  }

  public get scrollable(): boolean {
    return this._scrollable;
  }

  public get longClickable(): boolean {
    return this._longClickable;
  }

  public get password(): boolean {
    return this._password;
  }

  public get selected(): boolean {
    return this._selected;
  }

  public get bounds(): Bounds {
    return this._bounds;
  }
}