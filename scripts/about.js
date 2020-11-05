const paragraph = document.querySelector("#about-paragraph");

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

window.addEventListener("scroll", debounce(scroll));

function scroll() {
  if (pageYOffset > 300) {
    paragraph.classList.add("active");
  }
}

const cardButton = document.querySelector("#show-answer");
const p = document.querySelector("#answer");
const div = document.querySelector("#question-div");
