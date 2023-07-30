const tema = document.querySelector(".tema");
const divtema = document.querySelector(".divtema");
const equiss = document.getElementById("equis");

tema.addEventListener("click", () => {
  divtema.style.display = "flex"
})

equiss.addEventListener("click", () => {
  divtema.style.display = "none"
})

const color1 = document.getElementById("uno");
const color2 = document.getElementById("dos");
const color3 = document.getElementById("tres");
const color4 = document.getElementById("cuatro");
const color5 = document.getElementById("cinco");
const color6 = document.getElementById("seis");

const fondo = document.querySelector(".contenedor")
const predeterminado = {
  0: "#445599",
  1: "#5a6db5",
  2: "#6071b2",
  3: "#040855",
  4: "#334499",
  5: "#853ba2"
}
const c = document.querySelectorAll(".c");
const btn = document.getElementById("guardarCombinacion")
let index = 0;

const guardarColor = (...color) => {
  for (let i = 0; i < color.length; i++){
    index++
    color[i].value = predeterminado[i]
    c[i].style.backgroundColor = `${predeterminado[i]}`
    btn.addEventListener("click", () => {
      localStorage.setItem(`${index}`, `${color[i].value}`)
      for (let i = 0; i < localStorage.length; i++){
        
        crearObj("prueba", color[0].value, color[1].value, color[2].value, color[3].value, color[4].value, color[5].value)
        
      }
      console.log("funca")
    })
  }
}
const crearObj = (nombre, uno, dos, tres, cuatro, cinco, seis) => {
  let objetoo = nombre + "Obj"
  objetoo = {
    1: `${uno}`,
    2: `${dos}`,
    3: `${tres}`,
    4: `${cuatro}`,
    5: `${cinco}`,
    6: `${seis}`
  }
  console.log("funciona")
  localStorage.setItem(`${nombre}`, `${JSON.stringify(objetoo)}`)
}


localStorage.setItem("aa", `${JSON.stringify(color)}`)
guardarColor(color1, color2, color3, color4, color5, color6);