import { Vector2 } from "../utils/Vector2";

test("Testing vector2", () => {
  expect(new Vector2(2, 8).add(new Vector2(2, 2))).toStrictEqual(new Vector2(4, 10));
});