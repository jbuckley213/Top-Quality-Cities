"use strict";

const barcaImg = document.querySelector("#barca-img");
const dublinImg = document.querySelector("#dublin-img");
const vancouverImg = document.querySelector("#vancouver-img");

console.log(barcaImg);
window.addEventListener("scroll", (e) => {
  console.log(window.pageYOffset);

  if (pageYOffset > 730) {
    barcaImg.classList = "stick";
    dublinImg.classList = "inactive-img";
    vancouverImg.classList = "inactive-img";
  } else if (pageYOffset < 730) {
    barcaImg.classList.remove("stick");
  }

  if (pageYOffset > 850) {
  }
});
