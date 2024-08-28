export function hasKey<K extends string>(
  obj: object,
  key: K,
): obj is { [P in K]: unknown } {
  return key in obj;
}

export function hasStringKey<K extends string>(
  obj: object,
  key: K,
): obj is { [P in K]: string } {
  return hasKey(obj, key) && typeof obj[key] === "string";
}

export function hasBoolKey<K extends string>(
  obj: object,
  key: K,
): obj is { [P in K]: boolean } {
  return hasKey(obj, key) && typeof obj[key] === "boolean";
}
