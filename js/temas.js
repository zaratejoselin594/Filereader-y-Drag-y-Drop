const tema = document.querySelector(".tema");
const divtema = document.querySelector(".divtema");
const equiss = document.getElementById("equis");

// Mostrar en pantalla el div
tema.addEventListener("click", () => {
  divtema.style.display = "flex"
})
// No mostrar en pantalla el div
equiss.addEventListener("click", () => {
  divtema.style.display = "none"
})


// Colores seleccionados para crear el tema
const color1 = document.getElementById("uno");
const color2 = document.getElementById("dos");
const color3 = document.getElementById("tres");
const color4 = document.getElementById("cuatro");
const color5 = document.getElementById("cinco");
const color6 = document.getElementById("seis");

// Fondo de la web
const fondo = document.querySelector(".contenedor")

// Tema de la web predeterminado
const predeterminado = {
  0: "#445599",
  1: "#5a6db5",
  2: "#6071b2",
  3: "#040855",
  4: "#334499",
  5: "#853ba2"
}

// Circulos de colores
const c = document.querySelectorAll(".c");

const btn = document.getElementById("btn")
const nombreTema = document.getElementById("nombreobj")

// Guardamos el colore seleccionados para crear el tema
const guardarColor = (...color) => {
  for (let i = 0; i < color.length; i++){
    // Le damos el valor de los colores predeterminados
    color[i].value = predeterminado[i]
    c[i].style.backgroundColor = `${predeterminado[i]}`

    // Cada vez que se haga click se creara un nuevo obj con los colores del nuevo tema
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      crearObj(`${nombreTema.value}`, color[0].value, color[1].value, color[2].value, color[3].value, color[4].value, color[5].value,);
    })
  }
}

// Creamos la funcion que crea objetos
const crearObj = (nombre, uno, dos, tres, cuatro, cinco, seis) => {
  let objetoo = nombre + "_Obj"
  objetoo = {
    1: `${uno}`,
    2: `${dos}`,
    3: `${tres}`,
    4: `${cuatro}`,
    5: `${cinco}`,
    6: `${seis}`
  }

  // Guardamos el obj en el localStorage
  localStorage.setItem(`${nombre}`, `${JSON.stringify(objetoo)}`)
}

// Cada vez que se recarge la pagina cargar los temas en el div
window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++){
    let llave = localStorage.key(i);
    crearTema(llave)    
  }
})

// Cada vez que haya algun cambio cargar los temas en el div
localStorage.addEventListener("change", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    crearTema(llave)
  }
})
btn.addEventListener("click", () => {
  crearTema(nombreTema.value)
})
guardarColor(color1, color2, color3, color4, color5, color6);

const crearTema = (nombre) => {
  // Contenedor 1
  const combinaciones = document.querySelector(".combinaciones")

  // Contenedor 2
  const div = document.createElement("div");
  combinaciones.appendChild(div)
  div.setAttribute("class", "circulos")

  // Dentro del contenedor 2
  const p = document.createElement("p");
  const div2 = document.createElement("div")
  div.appendChild(p)
  div.appendChild(div2)
  p.textContent = `${nombre}`;
  p.setAttribute("class", "nombreDelTema")
  
  // Dentro del contenedor 2, circulos con colores
  for (let i = 0; i < 6; i++) {
    let circulos = document.createElement("div");
    circulos.setAttribute("class", "c");
    div2.appendChild(circulos);
    let c = document.querySelectorAll(".c")
  }
  
}
/*
const colores = (colores) => {
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave == nombre) {
      colores[i].style.backgroundColor=`${llave[i]}`
      crearTema(localStorage.key(i))
    }
  }
}
*/