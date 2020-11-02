"use strict";

const searchBtn = document.querySelector("#search-btn");
const results = document.querySelector("#test-results");
const resultsTable = document.querySelector("#results-table");
const tableBody = document.querySelector("#table-body");
const inputBtn = document.querySelector("#city");
const description = document.querySelector("#description");
const cityTitle = document.querySelector("#city-title");

function getUserInput() {
  const userInput = inputBtn.value;
  const userInputCleaned = userInput.toLowerCase().split(" ").join("-");

  return userInputCleaned;
}

searchBtn.addEventListener("click", function (event) {
  console.log("Clicked");
  //clearScreen();
  //console.log(tableBody);
  //results.innerHTML = "Hellp";

  event.preventDefault();
  const userInputCity = getUserInput();
  fetch(
    `https://api.teleport.org/api/urban_areas/slug:${userInputCity}/scores/`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showData(data, inputBtn.value);
    });
  // .catch((reject) => {
  //   printError();
  //   return reject;
  // });
});

function showData(data, userInput) {
  results.classList = "active";

  //   const cityName = document.createElement("h3");
  //   cityTitle.classList = "remove";
  const cityScore = (Math.round(data.teleport_city_score * 100) / 100).toFixed(
    2
  );

  cityTitle.innerHTML = userInput + ": " + cityScore;

  results.insertBefore(cityTitle, resultsTable);

  //   const div = document.createElement("div");
  //   description.classList = "remove";

  description.innerHTML = data.summary;
  results.insertBefore(description, resultsTable);
  addToTable(data.categories);
}

function addToTable(categories) {
  categories.forEach((el) => {
    const row = document.createElement("tr");
    const rowElementName = document.createElement("td");
    const rowElementBar = document.createElement("td");
    const rowElementValue = document.createElement("td");
    const barDiv = document.createElement("div");

    const elementScore = (Math.round(el.score_out_of_10 * 100) / 100).toFixed(
      2
    );

    barDiv.style.width = `${2 * elementScore}rem`;
    barDiv.style.backgroundColor = el.color;
    barDiv.classList = "bar-chart";
    rowElementName.innerHTML = el.name;

    rowElementBar.appendChild(barDiv);
    rowElementValue.innerHTML = elementScore;

    row.appendChild(rowElementName);
    row.appendChild(rowElementBar);
    row.appendChild(rowElementValue);
    tableBody.appendChild(row);
  });
}

function printError() {
  const alert = document.createElement("div");
  alert.textContent = "We do not have the information on that city";
  alert.classList = "alert alert-danger";
  results.appendChild(alert);
}

function clearScreen() {
  tableBody.innerHTML = "";
  cityTitle.innerHTML = "";
  description.innerHTML = "";
}

// const mainPageBtns = document.querySelectorAll(".main-page-city");

// mainPageBtns.forEach((el) => {
//   el.addEventListener("click", function (e) {
//     clearScreen();
//     //console.log(tableBody);
//     //results.innerHTML = "Hellp";

//     event.preventDefault();
//     const userInputCity = getUserInput();
//     fetch(
//       `https://api.teleport.org/api/urban_areas/slug:${userInputCity}/scores/`
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         showData(data, inputBtn.value);
//       })
//       .catch((reject) => {
//         printError();
//         return reject;
//       });
//   });
// });
