export const convertSnakeToCamelCase = (string) => {
  if (typeof string !== "string") return string;
  const newString = string
    .split("_")
    .map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
  return newString;
};

export const camelCaseKeys = (object) => {
  return Object.keys(object).reduce((convertedObject, key) => {
    const camelCaseKey = convertSnakeToCamelCase(key);
    convertedObject[camelCaseKey] = object[key];
    return convertedObject;
  }, {});
};
