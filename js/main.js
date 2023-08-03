// Llamar a la zona que recibe el evento
const zona = document.querySelector(".zona-arrastre");

// Identificar si algun obj se encuentra dentro de la zona
zona.addEventListener("dragover", (e) => {
  e.preventDefault();
  cambiarColor(e.target, "#fc53ff", "#ddf5");
})

// Indentificar si el obj se aleja
zona.addEventListener("dragleave", (e) => {
  e.preventDefault();
  cambiarColor(e.target, " #baabfd", "#ddf");
})  

// Indica si el obj se solto dentro de la zona
zona.addEventListener("drop", (e) => {
  cambiarColor(e.target, " #baabfd", "#ddf")
  e.preventDefault();
  const archivo = e.dataTransfer.files[0];
  const ars = e.dataTransfer.files;

  if (archivo.type === "text/plain") leerArs(cargarTxt, ars, archivo); 
  else if (archivo.type === "image/png" || archivo.type === "image/jpeg") leerArs(cargarImg, ars, archivo);
  else if (archivo.type === "video/mp4") leerArs(cargarVideo, ars, archivo);
  
})

// Cambiar colores para provocar impacto visual
const cambiarColor = (obj, color, ctxt) => {
  obj.style.border = `${color} dashed 4px`;
  obj.style.color = `${ctxt}`;
}

// Limpiamos la sessioStorage cada vez que se cargue la pagina
window.onload = () => {
  sessionStorage.clear();
};

// Leer varios archivos al mismo tiempo
const leerArs = (funcion, ars, ar) => {
  if (ars.length >= 1) {
    for (let i = 0; i < ars.length; i++) {
      funcion(ars[i], ars[i].name)
    }
  } else funcion(ar, ar.name)
}

// Muestra el nombre del archivo en una columna, click en el nombre del archivo seleccionado, este archivo se muestra nuevamente en la pantalla
let indice = 0;
const mostrarAr = (nombre, ar) => {
  const listaAr = document.querySelector(".ar");
  const fragmento = document.createDocumentFragment();
  const p = document.createElement("p");
  indice++

  p.setAttribute("id", `${nombre}`);

  fragmento.appendChild(p)
  listaAr.appendChild(fragmento);
  p.textContent = `${nombre}`;

  sessionStorage.setItem(`${nombre}`, `${ar}`);  
  reaparecerAr(nombre)
  p.addEventListener("click", () => {
    reaparecerAr(nombre)
  })
}

// Cada archivo anterior desaparece
const desaparecerAr = (obj) => {
  let i = 0;
  for (i; i <= indice; i++) {
    obj.setAttribute("id", `${i}`)
    if (i >= 1) {
      document.getElementById(`${i - 1}`).style.opacity = "0";
    }
  }
}

// Mostrar nuevamente el archivo en pantalla
const reaparecerAr = (nombre) => {
  for (let i = 0; i < sessionStorage.length; i++) {
    let llave = sessionStorage.key(i);
    if (llave === nombre) {
      document.getElementsByClassName(`${llave}`)[0].style.opacity = "1";
      document.getElementById(`${llave}`).setAttribute("class", "si")
    } else {
      document.getElementsByClassName(`${llave}`)[0].style.opacity = "0";
      document.getElementById(`${llave}`).setAttribute("class", "no")
    } 
  }
}

const salida = document.querySelector(".salida")
// Carga el texto en el div con la clase salida
const cargarTxt = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsText(ar);
  leer.addEventListener("load", (e) => {
    let txtData = document.createElement("p");
    salida.appendChild(txtData)
    txtData.setAttribute("class", `${nombre}`)
    txtData.innerHTML = e.currentTarget.result;

    desaparecerAr(txtData)
    mostrarAr(nombre, txtData, ar)
  })
}

// Cargar las imagenes en el div con la clase salida
const cargarImg = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsDataURL(ar);
  leer.addEventListener("load", () => {
    let IMG = document.createElement("IMG");
    let url = URL.createObjectURL(ar);
    IMG.setAttribute("src", url);
    IMG.setAttribute("class", `${nombre}`)
    salida.appendChild(IMG);

    desaparecerAr(IMG)
    mostrarAr(nombre, url, ar);
  })
}

// Muestra el video en el div con la clase salida
const cargarVideo = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsArrayBuffer(ar);
  
  leer.addEventListener("load", (e) => {
    let video = new Blob([new Uint8Array(e.currentTarget.result)],{ type: "video/mp4" });
    
    let url = URL.createObjectURL(video);
    let videoPlay = document.createElement("video");

    videoPlay.setAttribute("src", url);
    salida.appendChild(videoPlay);
    videoPlay.play()
    videoPlay.setAttribute("controls", "on")

    desaparecerAr(videoPlay)
    mostrarAr(nombre, url, ar)
  })
}

// Barra de progreso se muestra tiempo de carga del archivo
const barProgress = (obj) => {
  const leer = new FileReader();
  leer.addEventListener("progress", (e) => {
    let carga = Math.round(e.loaded / obj.size * 100);
    let barra = document.querySelector(".progresoBar");
    barra.style.position = "absolute";
    barra.textContent = `${carga}%`;
  }) 
}