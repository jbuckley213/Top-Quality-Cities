"use strict";

class Database {
  getAllUsers = () => {
    const userStr = localStorage.getItem("users");
    const userArr = JSON.parse(userStr);
    if (userStr === null) {
      return [];
    } else {
      return userArr;
    }
  };

  saveNewUser = (newUser) => {
    /*if (validator.errors.length !== 0) {
      return 0;
    }*/
    const usersArr = this.getAllUsers();
    usersArr.push(newUser);

    const updatedUserStr = JSON.stringify(usersArr);

    localStorage.setItem("users", updatedUserStr);
  };
}

const db = new Database();
