"use strict";

const searchBtn = document.querySelector("#search-btn");
const results = document.querySelector("#test-results");
const resultsTable = document.querySelector("#results-table");
const tableBody = document.querySelector("#table-body");
const tableBodyTwo = document.querySelector("#table-body-2");

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

////////////////////////////////
//ASK ABOUT API
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
  const numberCitiesDisplay = 4;

  for (let i = 0; i < numberCitiesDisplay; i++) {
    const btn = document.createElement("button");
    //console.log(dataArr[i]);
    const autoCityArr = dataArr[i]["matching_full_name"].split(",");
    const autoCity = lowerCase(autoCityArr[0]);
    btn.classList = "btn btn-light";
    btn.style.margin = "0px";
    btn.innerHTML = dataArr[i]["matching_full_name"];
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      autoSearchEventListen(autoCity);
    });
    autoCompleteDiv.append(btn);
  }
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
  //   printError(reject);
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
  resultsTable.classList.remove("inactive");

  const cityScore = (Math.round(data.teleport_city_score * 100) / 100).toFixed(
    2
  );

  cityTitle.innerHTML = userInput + ": " + cityScore;

  results.insertBefore(cityTitle, resultsTable);

  description.innerHTML = data.summary;
  results.insertBefore(description, resultsTable);
  addToTable(data.categories);
  //doubleTable(data.categories);
}

// function doubleTable(data) {
//   for (let i = 0; i < data.length; i += 2) {
//     addToTable(data[i], data[i + 1]);
//   }
// }

function addToTable(categories) {
  // const rowOne = document.createElement("tr");
  // const rowTwo = document.createElement("tr");

  // const rowElementNameOne = document.createElement("td");
  // const rowElementBarOne = document.createElement("td");
  // const rowElementValueOne = document.createElement("td");

  // const rowElementNameTwo = document.createElement("td");
  // const rowElementBarTwo = document.createElement("td");
  // const rowElementValueTwo = document.createElement("td");

  // const barDivOne = document.createElement("div");
  // const barDivTwo = document.createElement("div");

  // const elementScoreOne = (
  //   Math.round(dataOne.score_out_of_10 * 100) / 100
  // ).toFixed(2);

  // const elementScoreTwo = (
  //   Math.round(dataTwo.score_out_of_10 * 100) / 100
  // ).toFixed(2);

  // if (window.innerWidth > 767) {
  //   barDivOne.style.width = `${2 * elementScoreOne}rem`;
  //   barDivTwo.style.width = `${2 * elementScoreTwo}rem`;
  // } else {
  //   barDivOne.style.width = `${0.9 * elementScoreOne}rem`;
  //   barDivTwo.style.width = `${0.9 * elementScoreTwo}rem`;
  // }
  // //barDiv.style.width = `${2 * elementScore}rem`;
  // barDivOne.style.backgroundColor = dataOne.color;
  // barDivOne.classList = "bar-chart";
  // barDivTwo.style.backgroundColor = dataTwo.color;
  // barDivTwo.classList = "bar-chart";

  // rowElementNameOne.innerHTML = dataOne.name;
  // rowElementNameOne.classList = "name-width";
  // rowElementNameTwo.innerHTML = dataTwo.name;
  // rowElementNameTwo.classList = "name-width";

  // rowElementBarOne.appendChild(barDivOne);
  // rowElementValueOne.innerHTML = elementScoreOne;
  // rowElementValueOne.style.width = "2rem";
  // rowElementValueOne.style.margin = "2rem";

  // rowElementBarTwo.appendChild(barDivTwo);
  // rowElementValueTwo.innerHTML = elementScoreTwo;
  // rowElementValueTwo.style.width = "2rem";

  // rowOne.appendChild(rowElementNameOne);
  // rowOne.appendChild(rowElementBarOne);
  // rowOne.appendChild(rowElementValueOne);
  // //tableBody.appendChild(row);

  // rowTwo.appendChild(rowElementNameTwo);
  // rowTwo.appendChild(rowElementBarTwo);
  // rowTwo.appendChild(rowElementValueTwo);
  // tableBody.appendChild(rowOne);
  // tableBodyTwo.appendChild(rowTwo);

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

function printError(error) {
  clearScreen();
  console.log(error);
  resultsTable.classList = "inactive";
  const alert = document.createElement("div");
  alert.textContent = "Sorry we do not have the information on that city";
  alert.classList = "alert alert-danger";
  description.appendChild(alert);
}

function clearScreen() {
  tableBody.innerHTML = "";
  cityTitle.innerHTML = "";
  description.innerHTML = "";
}

function upperCaseWords(str) {
  // const arr = str.split(" ");
  // if (arr.length > 1) {
  //   const newArr = arr.map((el) => {
  //     return el[0].toUpperCase() + el.slice(1);
  //   });

  //   return newArr.join(" ");
  // }
  if (str.includes(" ")) {
    const arr = str.split(" ");
    const newArr = arr.map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    });

    return newArr.join(" ");
  } else if (str.includes("-")) {
    const autoArr = str.split("-");
    const newArr = autoArr.map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    });
    return newArr.join(" ");
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
}
