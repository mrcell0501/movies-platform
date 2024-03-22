import { ValueObject } from "./value-object";

class Stub extends ValueObject<unknown> {}

describe("ValueObject", () => {
  it("should set value", () => {
    let vo = new Stub("string value");
    expect(vo.value).toBe("string value");

    vo = new Stub(1);
    expect(vo.value).toBe(1);

    vo = new Stub(true);
    expect(vo.value).toBe(true);

    vo = new Stub({ prop: "value" });
    expect(vo.value).toStrictEqual({ prop: "value" });
  });

  it("should store an immutable value", () => {
    const expectedError = new Error(
      `Cannot set property value of #<ValueObject> which has only a getter`
    );
    const firstValue = { prop: "value" };
    const vo = new Stub(firstValue);

    expect(() => {
      // @ts-ignore
      vo.value = { prop: "other value" };
    }).toThrow(expectedError);
  });

  it("should convert to string", () => {
    const date = new Date();
    const arrange = [
      { value: null, expected: "null" },
      { value: undefined, expected: "undefined" },
      { value: "", expected: "" },
      { value: "string value", expected: "string value" },
      { value: 0, expected: "0" },
      { value: 1, expected: "1" },
      { value: true, expected: "true" },
      { value: false, expected: "false" },
      { value: date, expected: date.toString() },
      { value: {}, expected: JSON.stringify({}) },
      { value: { prop: "value" }, expected: JSON.stringify({ prop: "value" }) },
    ];

    for (const item of arrange) {
      expect(new Stub(item.value).toString()).toBe(item.expected);
    }
  });
});
