"use strict";
// const barcaDiv = document.querySelector(".test-barca");
// const dublinDiv = document.querySelector(".test-dublin");
// const vancouverDiv = document.querySelector(".test-vancouver");

const barcaImg = document.querySelector("#barca-img");
const dublinImg = document.querySelector("#dublin-img");
const vancouverImg = document.querySelector("#vancouver-img");

const displayDivDublin = document.querySelector("#display-dublin");
const displayDivBarca = document.querySelector("#display-barca");
const displayDivVancouver = document.querySelector("#display-vancouver");

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// window.addEventListener("scroll", scroll);

// function scroll() {
//   console.log(window.pageYOffset);
//   if (window.innerWidth > 1040) {
//     if (window.pageXOffset > 750) {
//       console.log("slide");
//       barcaImg.classList.add("slideIn");
//       barcaImg.style.visibility = "show";
//     }
//   }
// }

let sticky = barcaImg.offsetTop;
window.addEventListener("scroll", debounce(scroll));

function scroll() {
  if (pageYOffset > 300) {
    barcaImg.classList = "active";
    displayDivBarca.classList = "active";
  }
  if (pageYOffset > 780) {
    dublinImg.classList = "active";
    displayDivDublin.classList = "active";
  }
  if (pageYOffset > 1300) {
    vancouverImg.classList = "active";
    displayDivVancouver.classList = "active";
  }
}

function callApi(city, indexOne, indexTwo, indexThree, indexFour, div) {
  fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayData(data, indexOne, indexTwo, indexThree, indexFour, div);
    });
  // .catch((reject) => {
  //   printError();
  //   return reject;
  // });
}

function printError() {
  console.log("There is a error");
}

function displayData(data, indexOne, indexTwo, indexThree, indexFour, div) {
  const divOne = createBarDiv(data, indexOne);
  const divTwo = createBarDiv(data, indexTwo);
  const divThree = createBarDiv(data, indexThree);
  const divFour = createBarDiv(data, indexFour);

  div.appendChild(divOne);
  div.appendChild(divTwo);
  div.appendChild(divThree);
  div.appendChild(divFour);
}

function createBarDiv(data, index) {
  const barDiv = document.createElement("div");
  const spanName = document.createElement("span");
  const spanValue = document.createElement("span");
  const divOne = document.createElement("div");

  divOne.classList = "homepage-bar-div";
  console.log(data.categories[index].name);
  const nameOne = data.categories[index].name;
  const scoreOne = data.categories[index].score_out_of_10;
  const elementScore = (Math.round(scoreOne * 100) / 100).toFixed(2);

  barDiv.style.width = `${2 * elementScore}rem`;
  barDiv.style.backgroundColor = data.categories[index].color;
  barDiv.classList = "home-bar-chart";

  spanName.innerHTML = nameOne;
  spanValue.innerHTML = elementScore;
  spanName.style.width = "5rem";

  divOne.appendChild(spanName);
  divOne.appendChild(barDiv);
  divOne.appendChild(spanValue);
  return divOne;
}

callApi("dublin", 3, 6, 7, 1, displayDivDublin);
callApi("barcelona", 5, 9, 2, 14, displayDivBarca);
callApi("vancouver", 8, 1, 4, 10, displayDivVancouver);
