export class Vector2 {
  private _x: number;
  private _y: number;


  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public add(vector: Vector2): Vector2 {
    return new Vector2(this._x + vector._x, this._y + vector._y);
  }

  public sub(vector: Vector2): Vector2 {
    return new Vector2(this._x - vector._x, this._y - vector._y);
  }

  public div(value: number): Vector2 {
    return new Vector2(this._x / value, this._y / value);
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}