"use strict";
// const barcaDiv = document.querySelector(".test-barca");
// const dublinDiv = document.querySelector(".test-dublin");
// const vancouverDiv = document.querySelector(".test-vancouver");

const barcaImg = document.querySelector("#barca-img");
const dublinImg = document.querySelector("#dublin-img");
const vancouverImg = document.querySelector("#vancouver-img");

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

window.addEventListener("scroll", (e) => {
  console.log(window.pageYOffset);

  console.log(pageYOffset);
  if (pageYOffset > 300) {
    barcaImg.classList = "active";
  }
  if (pageYOffset > 780) {
    dublinImg.classList = "active";
  }
  if (pageYOffset > 1300) {
    vancouverImg.classList = "active";
  }
});
