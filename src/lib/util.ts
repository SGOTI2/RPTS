export function getKeyByValue(value: any, object: object) {
  return Object.keys(object).find((key) => object[key as keyof typeof object] === value);
}

export function seperateByCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function pseudoEnumName(value: any, object: object) {
  const enumName = getKeyByValue(value, object);
  return seperateByCamelCase(enumName!)
}

export function dayOf(date: Date) {
  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)
  return date
}