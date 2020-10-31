"use strict";

class Signup {
  constructor() {
    this.nameInput = document.querySelector("#fname");
    this.cityInput = document.querySelector("#city");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password1");
    this.repeatPasswordInput = document.querySelector("#password2");
    this.buttonInput = document.querySelector("#signup-btn");
    this.errorsWrapper = document.querySelector(".message-container");
  }

  // handleEmail
  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;
  };

  //
  handlePasswordInput = () => {
    const passwordInput = event.target;
    const password = passwordInput.value;
  };

  handleRepeatPasswordInput = () => {
    const repeatPasswordInput = event.target;
    const repeatPassword = repeatPasswordInput.value;
  };

  saveData = (event) => {
    event.preventDefault();

    const name = this.nameInput.value;
    const city = this.cityInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    const newUser = new User(name, city, email, password);

    db.saveNewUser(newUser);

    this.nameInput.value = "";
    this.cityInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";
  };

  addListeners = () => {
    this.emailInput.addEventListener("input", this.handleEmailInput);
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );

    this.buttonInput.addEventListener("click", this.saveData);
  };
}

const signup = new Signup();

window.addEventListener("load", signup.addListeners);
