const paragraph = document.querySelector("#about-paragraph");
window.addEventListener("scroll", (e) => {
  if (pageYOffset > 300) {
    paragraph.classList.add("active");
  }
});

const cardButton = document.querySelector("#show-answer");
const p = document.querySelector("#answer");
const div = document.querySelector("#question-div");
