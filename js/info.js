const inf = document.querySelector(".info");
const masInfo = document.querySelector(".masInfo");
const equis = document.querySelector(".equis");

inf.addEventListener("click", () => {
  masInfo.style.display = "flex"
})

equis.addEventListener("click", () => {
  masInfo.style.display = "none"
})
