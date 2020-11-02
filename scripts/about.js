const paragraph = document.querySelector("#about-article");
window.addEventListener("scroll", (e) => {
  if (pageYOffset > 100) {
    paragraph.classList = "active";
  }
});
