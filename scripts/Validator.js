"use strict";

class Validator {
  constructor() {
    this.invalidEmailError = "Enter a vaild email address";
    this.emailExistsError = "The entered email address us already taken";
    this.passwordError = "Password must be at least 6 characters long";
    this.repeatPasswordError = "Password and repeat password must match";

    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
      emailExistsError: this.emailExistsError,
    };
  }

  validateEmail = (email) => {
    if (this.emailSyntaxIsValid(email)) {
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  validatePassword = (password) => {
    validateRepeatPassword = (password, repeatPassword) => {};
  };

  emailSyntaxIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const emailIsValid = emailRegEx.test(email);
    return emailIsValid;
  };

  validateUniqueEmail = (email) => {
    const users = db.getAllUsers();

    let emailUnique = true;

    users.forEach((userObj) => {
      if (userObj.email === email) {
        emailUnique = false;
      }
    });
  };

  getErrors = () => {};
}

const validator = new Validator();
