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

//////////////////////////////////
//Get Value from URL
//////////////////////////////////

const url = new URL(document.URL);

if (url.searchParams.has("city")) {
  const city = url.searchParams.get("city");
  fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showData(data, upperCaseWords(city));
    });
}

/////////////////////////////////////
//Get Value from search input
//////////////////////////////////

searchBtn.addEventListener("click", function (event) {
  console.log("Clicked");
  clearScreen();
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
      showData(data, upperCaseWords(inputBtn.value));
    });
  // .catch((reject) => {
  //   printError();
  //   return reject;
  // });
});

function showData(data, userInput) {
  results.classList = "active";

  const cityScore = (Math.round(data.teleport_city_score * 100) / 100).toFixed(
    2
  );

  cityTitle.innerHTML = userInput + ": " + cityScore;

  results.insertBefore(cityTitle, resultsTable);

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

    barDiv.style.width = `${1 * elementScore}%`;

    //barDiv.style.width = `${2 * elementScore}rem`;
    barDiv.style.backgroundColor = el.color;
    barDiv.classList = "bar-chart";
    rowElementName.innerHTML = el.name;
    rowElementName.classList = "name-width";

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

function upperCaseWords(str) {
  const arr = str.split(" ");
  if (arr.length > 1) {
    const newArr = arr.map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    });

    return newArr.join(" ");
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
}
