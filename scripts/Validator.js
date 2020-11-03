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
    };
  }

  validateEmail = (email) => {
    if (this.emailSyntaxIsValid(email)) {
      delete this.errors.invalidEmailError;
      //this.errors.passwordError = "";
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  validatePassword = (password) => {
    if (password.length >= 6) {
      delete this.errors.passwordError;
      //this.errors.passwordError = "";
    } else {
      this.errors.passwordError = this.passwordError;
    }
  };

  validateRepeatPassword = (password, repeatPassword) => {
    if (password === repeatPassword) {
      delete this.errors.repeatPasswordError;
      //this.errors.repeatPasswordError = "";
    } else {
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
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

    if (emailUnique) {
      delete this.errors.emailExistsError;
      //this.errors.emailExistsError = "";
    } else {
      this.errors.emailExistsError = this.emailExistsError;
    }
  };

  getErrors = () => {
    return this.errors;
  };
}

const validator = new Validator();
