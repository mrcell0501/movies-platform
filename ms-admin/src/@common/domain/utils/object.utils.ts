export function deepFreeze<T>(obj: T) {
  const values = Object.values(obj);

  for (const value of values) {
    if (value && value instanceof Object) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
