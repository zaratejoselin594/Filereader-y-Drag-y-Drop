const tema = document.querySelector(".tema");
const divtema = document.querySelector(".divtema");
const equiss = document.getElementById("equis");

tema.addEventListener("click", () => {
  divtema.style.display = "flex"
})

equiss.addEventListener("click", () => {
  divtema.style.display = "none"
})
