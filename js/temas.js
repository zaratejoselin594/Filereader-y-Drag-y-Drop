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
const c = document.querySelectorAll(".predeterminado");

const btn = document.getElementById("btn")
const nombreTema = document.getElementById("nombreobj")

// Guardamos el colores seleccionados para crear el tema
const guardarColor = (...color) => {
  for (let i = 0; i < color.length; i++){
    // Le damos el valor a los colores de predeterminados
    color[i].value = predeterminado[i]
    c[i].style.backgroundColor = `${predeterminado[i]}`

    // Cada vez que se haga click se creara un nuevo obj con los colores del nuevo tema
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      crearObj(`${nombreTema.value}`, color[0].value, color[1].value, color[2].value, color[3].value, color[4].value, color[5].value,);
    })
  }
}
// Ejecutamos la funcion
guardarColor(color1, color2, color3, color4, color5, color6);

// Creamos la funcion que crea objetos
const crearObj = (nombre, cero, uno, dos, tres, cuatro, cinco) => {
  let objetoo = nombre + "_Obj"
  objetoo = {
    0: `${cero}`,
    1: `${uno}`,
    2: `${dos}`,
    3: `${tres}`,
    4: `${cuatro}`,
    5: `${cinco}`
  }

  // Guardamos el obj en el localStorage
  localStorage.setItem(`${nombre}`, `${JSON.stringify(objetoo)}`)
}

// Cada vez que se recarge la pagina cargar los temas en el div
window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++){
    let llave = localStorage.key(i);
    crearHtml(llave)    
  }
})

// Crear elementos html para mostrar
const crearHtml = (nombre) => {
  // Contenedor 1
  const combinaciones = document.querySelector(".combinaciones")

  // Contenedor 2
  const div = document.createElement("div");
  combinaciones.appendChild(div)
  div.setAttribute("class", `circulos ${nombre + "div"}`);

  // Dentro del contenedor 2
  // Creamos el p con el nombre del tema
  const p = document.createElement("p");
  const div2 = document.createElement("div")
  div.appendChild(p)
  div.appendChild(div2)
  p.textContent = `${nombre}`;
  

  // Creamos el icono de eliminar
  const iconoEliminar = document.createElement('ion-icon');
  iconoEliminar.setAttribute('name', 'trash');
  iconoEliminar.setAttribute('id', 'eliminar');
  iconoEliminar.setAttribute('title', 'Eliminar');
  div.appendChild(iconoEliminar)

  
  // Dentro del contenedor 2, circulos con colores
  for (let i = 0; i < 6; i++) {
    let circulos = document.createElement("div");
    circulos.setAttribute("class", `c ${nombre}`);
    div2.appendChild(circulos);
  }
  coloresCirculos(nombre)
}
// Cada vez que se de click se ejecuta la funcion crearHtml()
btn.addEventListener("click", (e) => {
  e.preventDefault()
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    crearHtml(llave)
  }
})

// Agregarle el color a los circulos dependiendo los colores que hayan sido seleccioados
const coloresCirculos = (nombre) => {
  const c2 = document.querySelectorAll(`.${nombre}`)
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    let objString = localStorage.getItem(llave);
    let obj = JSON.parse(objString)
    for (let i = 0; i < 6; i++){
      if (llave === nombre) {
        c2[i].style.backgroundColor = `${obj[i]}`;
      }
    } 
  }
}

// Crear obj con las partes de la web
const objHtml = {
  0: document.querySelector(".contenedor"),
  1: document.querySelector(".salida"),
  2: document.querySelector(".zona-arrastre"),
  3: document.querySelector(".ar"),
  4: document.querySelector(".no"),
  5: document.querySelector(".si")
} 

// Aplicar el tema a la web
const aplicarTema = () => {
  let llave;
  let obj;
  for (let i = 0; i < localStorage.length; i++) {
    llave = localStorage.key(i);
    let objString = localStorage.getItem(llave);
    obj = JSON.parse(objString)
  }
  for (let i = 0; i < 6; i++){
    if (objHtml[i] !== null) {
      objHtml[0].style.backgroundColor = `${obj[0]}`
    } 
  }
}
aplicarTema()

// Funcion de eliminar temas
const eliminarTema = (nombre) => {
  for (let i = 0; i < localStorage.length; i++){
    llave = localStorage.key(i)
    if (llave === nombre) {
      localStorage.removeItem(`${llave}`);
    }
  }
}

// Hacemos escucha al evento click para eliminar tema
document.getElementById("eliminar").addEventListener("click", () => {
  alert()
  eliminarTema("uno")
})