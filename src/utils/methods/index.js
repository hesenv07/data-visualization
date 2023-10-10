import slugify from "slugify";

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

export const calcOfVpsValues = ({ key, count }) => {
  const keys = {
    cpu: 2.2,
    memory: 0.0026666, //1024 vurmaq
    storage: 0.116,
    ipv4: 1.5,
    month: 0.4619,
    bandwidth: 1.5,
  };

  let sum = 0;
  sum = key === "memory" ? keys[key] * 1024 * count : keys[key] * count;

  return Number(sum.toFixed(2));
};

export const getCurrencyCode = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "AZN":
      return "₼";
    default:
      return getCurrencyCode(getFromLocale("currency") ?? "USD");
  }
};
export const typeCheck = (type, array) => {
  if (type == 1) {
    return array[1];
  } else {
    return array[0];
  }
};

export const slugFormat = (text) => {
  return slugify(text, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: getFromLocale("language"),
  });
};
