const PASSWORD_REGEX = /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,20}$/;
const isValidPassword = (password) => PASSWORD_REGEX.test(password);

const throwError = (text, code) => (next) => {
  const err = new Error(text);

  if (code) {
    err.code = code;
  }

  next(err);
};

module.exports = {
  isValidPassword,
  throwError,
};
