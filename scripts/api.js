"use strict";

const searchBtn = document.querySelector("#search-btn");
const results = document.querySelector("#test-results");
const resultsTable = document.querySelector("#results-table");
const tableBody = document.querySelector("#table-body");
const inputSearch = document.querySelector("#city");
const description = document.querySelector("#description");
const cityTitle = document.querySelector("#city-title");
const autoCompleteDiv = document.querySelector("#auto-complete");

function getUserInput() {
  const userInput = inputSearch.value;
  const userInputCleaned = userInput.toLowerCase().split(" ").join("-");

  return userInputCleaned;
}

function lowerCase(str) {
  const lowerCaseStr = str.toLowerCase().split(" ").join("-");
  return lowerCaseStr;
}

function cleanInputAutoSearch(str) {
  const cleanInput = str.toLowerCase().split(" ").join("%");
  return cleanInput;
}

/////////////////////////////////
// Auto complete search
////////////////////////////////

inputSearch.addEventListener("keyup", function (event) {
  fetch(`https://api.teleport.org/api/cities/?search=${event.target.value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      autoComplete(data, event.target.value);
    });
});

///////////////////////
// auto complete function

function autoComplete(data, value) {
  autoCompleteDiv.innerHTML = "";
  const dataArr = data._embedded["city:search-results"];

  for (let i = 0; i < 8; i++) {
    const btn = document.createElement("button");
    //console.log(dataArr[i]);
    const autoCityArr = dataArr[i]["matching_full_name"].split(",");
    const autoCity = lowerCase(autoCityArr[0]);
    btn.classList = "btn btn-light";
    btn.innerHTML = dataArr[i]["matching_full_name"];
    btn.addEventListener("click", function () {
      event.preventDefault();
      autoSearchEventListen(autoCity);
    });
    autoCompleteDiv.append(btn);
  }

  // dataArr.forEach(function (el) {
  //   const p = document.createElement("p");
  //   p.innerHTML = el["matching_full_name"];

  //   autoCompleteDiv.append(p);
  // });
}

/////////////////////////////////////
//Get Value from search input (auto complete)
//////////////////////////////////

function autoSearchEventListen(value) {
  console.log("Clicked");
  clearScreen();
  inputSearch.value = "";
  autoCompleteDiv.innerHTML = "";
  //event.preventDefault();
  //const userInputCity = getUserInput();
  fetch(`https://api.teleport.org/api/urban_areas/slug:${value}/scores/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showData(data, upperCaseWords(value));
    });
  // .catch((reject) => {
  //   printError();
  //   return reject;
  // });
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

//////////////////////////////////
// Normal Search Bar
/////////////////////////////////

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
      showData(data, upperCaseWords(inputSearch.value));
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

    if (window.innerWidth > 767) {
      barDiv.style.width = `${2 * elementScore}rem`;
    } else {
      barDiv.style.width = `${0.9 * elementScore}rem`;
    }
    //barDiv.style.width = `${2 * elementScore}rem`;
    barDiv.style.backgroundColor = el.color;
    barDiv.classList = "bar-chart";
    rowElementName.innerHTML = el.name;
    rowElementName.classList = "name-width";

    rowElementBar.appendChild(barDiv);
    rowElementValue.innerHTML = elementScore;
    rowElementValue.style.width = "2rem";

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
