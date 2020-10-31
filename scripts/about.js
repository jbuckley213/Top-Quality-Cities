const paragraph = document.querySelector("#about-article");

window.addEventListener("scroll", (e) => {
  console.log(window.pageYOffset);

  console.log(pageYOffset);
  if (pageYOffset > 100) {
    paragraph.classList = "active";
  }
});
