import { deepFreeze } from "./object.utils";

describe("deepFreeze", () => {
  it("should freeze an object completely", () => {
    const firstValue = {
      level1: {
        level2: {
          prop: "value",
        },
      },
    };
    const freezedValue = deepFreeze(firstValue);

    expect(freezedValue).toBe(firstValue);

    expect(() => {
      // @ts-ignore
      freezedValue.level1.newProp = "this is a new prop";
    }).toThrow(
      new Error(`Cannot add property newProp, object is not extensible`)
    );

    expect(() => {
      // @ts-ignore
      freezedValue.level1.level2.prop = "new value";
    }).toThrow(
      new Error(
        `Cannot assign to read only property 'prop' of object '#<Object>'`
      )
    );
  });

  it("should not freeze a scalar value", () => {
    const str = "some string";
    expect(typeof deepFreeze(str)).toBe("string");

    let bool = true;
    expect(typeof deepFreeze(bool)).toBe("boolean");
    bool = false;
    expect(typeof deepFreeze(bool)).toBe("boolean");

    const num = 123;
    expect(typeof deepFreeze(num)).toBe("number");
  });
});
