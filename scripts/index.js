"use strict";
const barcaDiv = document.querySelector(".test-barca");
const dublinDiv = document.querySelector(".test-dublin");
const vancouverDiv = document.querySelector(".test-vancouver");

const barcaImg = document.querySelector("#barca-img");
const dublinImg = document.querySelector("#dublin-img");
const vancouverImg = document.querySelector("#vancouver-img");

// function debounce(func, wait = 20, immediate = true) {
//   var timeout;
//   return function () {
//     var context = this,
//       args = arguments;
//     var later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

// window.addEventListener("scroll", debounce(scroll));

// function scroll(e) {
//   console.log(window.pageYOffset);
//   if (window.innerWidth > 1040) {
//     if (pageYOffset > 575 && pageYOffset < 750) {
//       //650
//       barcaDiv.classList.add("stick");
//       dublinDiv.classList.add("inactive-img");
//       vancouverDiv.classList.add("inactive-img");
//       barcaDiv.classList.add("test-barca");
//     } else if (pageYOffset < 750) {
//       barcaDiv.classList.remove("stick");
//       barcaDiv.classList = "test-barca";
//       //barcaImg.classList.add("img-change");
//     } else if (pageYOffset > 950 && pageYOffset < 1200) {
//       barcaDiv.classList.add("test-dublin");
//       barcaDiv.classList.remove("test-barca");
//     } else if (pageYOffset > 1200) {
//       barcaDiv.classList.add("test-vancouver");
//       barcaDiv.classList.remove("test-dublin");
//     }
//   }
// }
