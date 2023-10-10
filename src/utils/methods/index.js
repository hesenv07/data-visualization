export const isObjEmpty = (obj) => {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

export const setToLocale = ({
  value,
  key = "access_token",
  initValue = "",
}) => {
  const res = value ?? initValue;
  localStorage.setItem(key, JSON.stringify(res));
};

export const removeFromLocale = (key = "access_token") => {
  localStorage.removeItem(key);
};

export const getFromLocale = (key = "access_token") => {
  const item = key ? localStorage.getItem(key) : "";
  return JSON.parse(item);
};
