import {
  isURL,
  isValidEmail,
  onlyContainNumber,
  onlyNumAndLetter,
  passwordConditions,
  startsWithLetter,
} from "..";
import { getFromLocale } from "..";

const {
  INVALID_EMAIL,
  USERNAME_LENGTH,
  PASSWORD_LENGTH,
  // NON_EXIST_USER,
  // NO_ACCOUNT_EXISTS,
  // WRONG_INFO,
  EMPTY_PASSWORD,
  ONLY_NUMBER,
  EMPTY_FULL_NAME,
  // CHOOSE_SUBJECT,
  NOT_EQUAL_PASSWORDS,
  EMPTY_EMAIL,
  MESSAGE_LENGTH,
  EMPTY_CONFIRM_PASSWORD,
  EMPTY_PHONE_NUMBER,
  EMPTY_MESSAGE,
  EMPTY_NS,
  EMPTY_DOMAIN_NAME,
  EMPTY_LINKEDIN_URL,
  WRONG_LINKEDIN_URL,
  EMPTY_GENDER,
  EMPTY_DATE,
  EMPTY_JOB_POSITION,
  DOMAIN_NAME_LENGTH,
  UNCORRECT_DOMAIN_FORMAT,
  // EMPTY_SERVICE,
  EMPTY_PROJECT_DETAIL,
  ONLY_NUMBER_PHONE,
  EMPTY_SUBJECT,
} = {
  INVALID_EMAIL:
    "Email must be in a valid email format (e.g., username@coolexample.com)",
  USERNAME_LENGTH: "Length must be between 5-50 characters",
  PASSWORD_LENGTH: "Password must be at least 9 characters",
  NON_EXIST_USER: "This username (e-mail) does not exist in our system.",
  NO_ACCOUNT_EXISTS: "No accounts exist with that username (e-mail)",
  WRONG_INFO: "Login Details Incorrect. Please try again.",
  EMPTY_FULL_NAME: "Please enter your full name correctly.",
  EMPTY_EMAIL: "Please enter a your email or phone number",
  EMPTY_PHONE_NUMBER: "Please enter a valid phone number.",
  EMPTY_PASSWORD: "Please enter your password.",
  EMPTY_CONFIRM_PASSWORD: "Please enter your confirmation password.",
  ONLY_NUMBER: "You have to use the only number.",
  ONLY_NUMBER_PHONE: "You have to use the only number on phone number.",
  NOT_EQUAL_PASSWORDS: "Passwords did not match",
  CHOOSE_SUBJECT: "Choose the related subject",
  EMPTY_MESSAGE: "Please add your message",
  MESSAGE_LENGTH: "Length must be min 15 characters",
  EMPTY_NS: "Please fill the field!",
  EMPTY_DOMAIN_NAME: "Please add your domain name",
  EMPTY_LINKEDIN_URL: "Please add your linkedin url",
  WRONG_LINKEDIN_URL: "Provided link is not correct",
  EMPTY_GENDER: "Please choose your gender",
  EMPTY_DATE: "Please add your birthdate",
  EMPTY_JOB_POSITION: "Please select position you want to apply",
  DOMAIN_NAME_LENGTH: "Domain name must be at least 3 characters",
  UNCORRECT_DOMAIN_FORMAT:
    "The domain name is not valid. The domain name can only contain letters, numbers, and the '-' character.",
  EMPTY_SERVICE: "Please add your service type",
  EMPTY_SUBJECT: "Please select a related subject",
  EMPTY_PROJECT_DETAIL: "Please write the project detail or add the files",
};

// const phoneNumberValidate = ({ numbers, authErrors }) => {
//     if (!numbers)
//         authErrors[numbers] = EMPTY_PHONE_NUMBER
//     else if (!onlyContainNumber(numbers))
//         authErrors[numbers] = ONLY_NUMBER
// }

export const authSignUpValidate = (values) => {
  const authErrors = {};
  const { fullName, emailAddress, password, individualNumber } = values;

  if (!emailAddress) authErrors.emailAddress = EMPTY_EMAIL;
  else if (!isValidEmail(emailAddress)) authErrors.emailAddress = INVALID_EMAIL;

  if (!fullName) authErrors.fullName = EMPTY_FULL_NAME;
  else if (fullName?.length < 5 || fullName?.length > 50)
    authErrors.fullName = USERNAME_LENGTH;

  if (!individualNumber) authErrors.individualNumber = EMPTY_PHONE_NUMBER;
  else if (!onlyContainNumber(individualNumber))
    authErrors.individualNumber = ONLY_NUMBER;

  if (password?.length < 9) authErrors.password = PASSWORD_LENGTH;

  return authErrors;
};

export const authSignInValidate = (values) => {
  const authErrors = {};
  const { email_phone_signin, password_signin } = values;

  if (!email_phone_signin) authErrors.email_phone_signin = EMPTY_EMAIL;
  else if (
    !isValidEmail(email_phone_signin) &&
    startsWithLetter(email_phone_signin)
  )
    authErrors.email_phone_signin = INVALID_EMAIL;
  else if (
    !startsWithLetter(email_phone_signin) &&
    !onlyContainNumber(email_phone_signin)
  )
    authErrors.email_phone_signin = ONLY_NUMBER_PHONE;

  if (!password_signin) authErrors.password_signin = EMPTY_PASSWORD;

  return authErrors;
};

export const authPasswordResetValidate = (values) => {
  const authErrors = {};
  const { email_reset } = values;

  if (!email_reset) authErrors.email_reset = EMPTY_PASSWORD;
  else if (!isValidEmail(email_reset)) authErrors.email_reset = INVALID_EMAIL;

  return authErrors;
};

export const authNewPasswordValidate = (values) => {
  const authErrors = {};
  const { password_confirmation, password } = values;
  const { feedback, hasFeedback } = passwordConditions(password);

  if (!password) authErrors.password = EMPTY_PASSWORD;
  else if (password.length < 9 || password.length > 50)
    authErrors.password = PASSWORD_LENGTH;
  else if (hasFeedback) authErrors.password = feedback;

  if (!password_confirmation)
    authErrors.password_confirmation = EMPTY_CONFIRM_PASSWORD;

  if (password_confirmation !== password)
    authErrors.password_confirmation = NOT_EQUAL_PASSWORDS;

  return authErrors;
};

export const haveProjectValidates = (values, files) => {
  const authErrors = {};
  const { email, full_name, phone_number, project_detail } = values;

  if (!full_name) authErrors.full_name = EMPTY_FULL_NAME;
  else if (full_name?.length < 5 || full_name?.length > 50)
    authErrors.full_name = USERNAME_LENGTH;

  if (!email) authErrors.email = EMPTY_PASSWORD;
  else if (!isValidEmail(email)) authErrors.email = INVALID_EMAIL;

  if (!phone_number) authErrors.phone_number = EMPTY_PHONE_NUMBER;
  else if (!onlyContainNumber(phone_number))
    authErrors.phone_number = ONLY_NUMBER;

  if (!project_detail && !files)
    authErrors.project_detail = EMPTY_PROJECT_DETAIL;

  return authErrors;
};

export const contactUsValidates = (values) => {
  const authErrors = {};
  const { full_name, email, phone_number, message, subject } = values;

  if (!full_name) authErrors.full_name = EMPTY_FULL_NAME;
  else if (full_name?.length < 5 || full_name?.length > 50)
    authErrors.full_name = USERNAME_LENGTH;

  if (!email) authErrors.email = EMPTY_PASSWORD;
  else if (!isValidEmail(email)) authErrors.email = INVALID_EMAIL;

  if (!phone_number) authErrors.phone_number = EMPTY_PHONE_NUMBER;
  else if (!onlyContainNumber(phone_number))
    authErrors.phone_number = ONLY_NUMBER;

  if (!message) authErrors.message = EMPTY_MESSAGE;
  else if (message?.length < 15) authErrors.message = MESSAGE_LENGTH;

  if (!subject) authErrors.subject = EMPTY_SUBJECT;

  return authErrors;
};

export const domainPurchaseValidates = (values) => {
  const language = getFromLocale("language") || "en";
  const authErrors = {};
  const { ns1, ns2 } = values;

  const purchasedDomain = getFromLocale("domain")?.domain;

  if (purchasedDomain?.endsWith(".az")) {
    if (!ns1)
      authErrors.ns1 =
        language === "en" ? EMPTY_NS : "NS ünvanlarını daxil edin.";
    if (!ns2)
      authErrors.ns2 =
        language === "en" ? EMPTY_NS : "NS ünvanlarını daxil edin.";
  } else {
    if (ns2 && !ns1) {
      authErrors.ns1 =
        language === "en" ? EMPTY_NS : "NS ünvanlarını daxil edin.";
    }
    if (!ns2 && ns1) {
      authErrors.ns2 =
        language === "en" ? EMPTY_NS : "NS ünvanlarını daxil edin.";
    }
  }

  return authErrors;
};

export const domainNamePurchaseValidates = (values) => {
  const authErrors = {};
  const { url } = values;

  if (!url) authErrors.url = EMPTY_DOMAIN_NAME;

  return authErrors;
};

export const domainValidate = (values) => {
  const language = getFromLocale("language") == "en";
  const authErrors = {};
  const { domainSDL } = values;
  if (!domainSDL.length) {
    authErrors.domainSDL = EMPTY_DOMAIN_NAME;
  }
  if (!onlyNumAndLetter(domainSDL))
    authErrors.domainSDL = language
      ? UNCORRECT_DOMAIN_FORMAT
      : "Domen adı düzgün deyil.Domen adında yalnız hərf, rəqəm və '-' işarəsi  ola bilər";

  if (domainSDL.length < 3 && domainSDL.length > 0)
    authErrors.domainSDL = language
      ? DOMAIN_NAME_LENGTH
      : "Domen adının uzunluğu ən az 3 olmalıdır";

  return authErrors;
};

export const applicationFormValidates = (values) => {
  const authErrors = {};
  const { full_name, birthdate, gender, phone, linkedin_url, job_id } = values;

  if (!full_name) authErrors.full_name = EMPTY_FULL_NAME;
  else if (full_name?.length < 5 || full_name?.length > 50)
    authErrors.full_name = USERNAME_LENGTH;

  if (!phone) authErrors.phone = EMPTY_PHONE_NUMBER;
  else if (!onlyContainNumber(phone)) authErrors.phone = ONLY_NUMBER;

  if (!linkedin_url) authErrors.linkedin_url = EMPTY_LINKEDIN_URL;
  else if (!isURL(linkedin_url)) authErrors.linkedin_url = WRONG_LINKEDIN_URL;

  if (!gender) authErrors.gender = EMPTY_GENDER;

  if (!birthdate) authErrors.birthdate = EMPTY_DATE;

  if (!job_id) authErrors.job_id = EMPTY_JOB_POSITION;

  return authErrors;
};
