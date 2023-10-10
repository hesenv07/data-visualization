export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const onlyContainNumber = (numberSet) => {
  const onlyNumberRegex = /^\d+$/;
  return onlyNumberRegex.test(numberSet);
};

export const onlyNumAndLetter = (text) => {
  const regex = /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*$/;
  return regex.test(text);
};

export const startsWithLetter = (text) => {
  return /^[a-zA-Z]/.test(text);
};

let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$?.,%^&+=!]).{8,}$/;
export const passwordConditions = (password) => {
  let feedback = "";
  if (!passwordRegex.test(password)) {
    !/(?=.*[a-z])/.test(password)
      ? (feedback += "Must contain at least one lowercase letter (a-z)\n")
      : !/(?=.*[A-Z])/.test(password)
      ? (feedback += "Must contain at least one uppercase letter (A-Z)\n")
      : !/(?=.*\d)/.test(password)
      ? (feedback += "Must contain at least one digit (0-9)\n")
      : !/(?=.*[@#$%^&+=!])/.test(password)
      ? (feedback +=
          "Must contain at least one special character (!, %, @, #, etc.)\n")
      : /.{1,7}$/.test(password)
      ? (feedback += "Must be at least 8 characters long\n")
      : "";
    console.log(feedback);
  }
  return feedback ? { hasFeedback: true, feedback } : { hasFeedback: false };
};

export const isURL = (urlText) => {
  const urlRegex =
    /^(?:http|https):\/\/[\w]+(?:\.[\w]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return urlRegex.test(urlText);
};
