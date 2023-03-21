import { Vector2 } from "./Vector2";

export class Bounds {
  private readonly _min: Vector2;
  private readonly _max: Vector2;

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this._min = new Vector2(minX, minY);
    this._max = new Vector2(maxX, maxY);
  }

  public center(): Vector2 {
    return this._max
      .sub(this._min)
      .div(2)
      .add(this._min);
  }


  public get min(): Vector2 {
    return this._min;
  }

  public get max(): Vector2 {
    return this._max;
  }
}