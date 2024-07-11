export const removeUndefinedKeys = (obj) => {
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      removeUndefinedKeys(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
};
