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
    this.emailMessage = document.querySelector("#email-error");
    this.passwordMessage = document.querySelector("#password-error");
    this.repeatPasswordMessage = document.querySelector(
      "#repeat-password-error"
    );
  }

  // handleEmail
  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateEmail(email);
    validator.validateUniqueEmail(email);

    //const errors = validator.getErrors();
    this.setErrorMessages();
  };

  //
  handlePasswordInput = () => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  handleRepeatPasswordInput = () => {
    const passwordInput = this.passwordInput;
    const repeatPasswordInput = event.target;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  setErrorMessages = () => {
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();
    const errorStringArr = Object.values(errorsObj);
    console.log(errorStringArr);

    // const validEmailStr = errorStringArr[0];
    // const passwordLengthStr = errorStringArr[1];
    // const repeatPasswordStr = errorStringArr[2];
    // const emailTakenStr = errorStringArr[3];

    // this.emailMessage.innerHTML = "";
    // this.passwordMessage.innerHTML = "";
    // this.repeatPasswordMessage.innerHTML = "";
    // if(validEmailStr)
    // const p = document.createElement("p");
    // p.classList = "alert alert-danger error-message";
    // p.textContent = str;
    // this.emailMessage.appendChild(p);

    errorStringArr.forEach((str) => {
      this.emailMessage.innerHTML = "";
      this.passwordMessage.innerHTML = "";
      this.repeatPasswordMessage.innerHTML = "";

      if (str.includes("already taken")) {
        const p = document.createElement("p");
        p.classList = "alert alert-danger error-message";

        p.textContent = str;
        this.emailMessage.appendChild(p);
      }
      if (str.includes("vaild email")) {
        const p = document.createElement("p");
        p.classList = "alert alert-danger error-message";

        p.textContent = str;
        this.emailMessage.appendChild(p);
      }
      if (str.includes("long")) {
        console.log("error");
        const p = document.createElement("p");
        p.classList = "alert alert-danger error-message";

        p.textContent = str;
        this.passwordMessage.appendChild(p);
      }
      if (str.includes("repeat password")) {
        console.log("Repeat error");

        const p = document.createElement("p");
        p.classList = "alert alert-danger error-message";

        p.textContent = str;
        this.repeatPasswordMessage.appendChild(p);
      }
    });

    // errorStringArr.forEach((str) => {
    //   const p = document.createElement("p");
    //   p.textContent = str;
    //   p.classList = "alert alert-danger";
    //   this.errorsWrapper.appendChild(p);
    // });
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
