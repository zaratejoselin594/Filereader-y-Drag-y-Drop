
//llamar a la zona que recibe el evento
const zona = document.querySelector(".zona-arrastre");

//identificar si algun obj se encuentra dentro de la zona
zona.addEventListener("dragover", (e) => {
  e.preventDefault();
  cambiarColor(e.target, "#ff57", "#ddf5");
  zona.style.boxShadow ="-10px -10px 15px #0003"
})

//indentificaar si el oobj se aleja
zona.addEventListener("dragleave", (e) => {
  e.preventDefault();
  cambiarColor(e.target, " #baabfd", "#ddf");
  zona.style.boxShadow = "10px 10px 15px #0003"
})

let indice = 0;

//indica si el obj se solto dentro de la zona
zona.addEventListener("drop", (e) => {
  cambiarColor(e.target, " #baabfd", "#ddf")
  e.preventDefault();
  zona.style.boxShadow = "10px 10px 15px #0003"
  const archivo = e.dataTransfer.files[0];

  if (archivo.type === "text/plain")  cargarTxt(archivo, archivo.name)
  else if (archivo.type === "image/png" || archivo.type === "image/jpeg") cargarImg(archivo, archivo.name); 
  else if (archivo.type === "video/mp4") cargarVideo(archivo, archivo.name);
})

//cambiar colores para provocar impacto visual
const cambiarColor = (obj, color, ctxt) => {
  obj.style.border = `${color} dashed 4px`;
  obj.style.color = `${ctxt}`;
}

window.onload = function () {
  sessionStorage.clear();
};

//muestra el nombre del archivo en una columna, y con una funcion de click en el nombre de algun archivo este se muestra nuevamente en la pantalla
const mostrarAr = (nombre, ar, archivo) => {
  const listaAr = document.querySelector(".contenido");
  const p = document.createElement("p");
  indice++
  
  p.classList.add(`${indice}`);
  listaAr.appendChild(p);
  p.textContent = `${nombre}`;
  sessionStorage.setItem(`${nombre}`, `${ar}`);
  sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');

  p.addEventListener("click", () => {
    if (archivo.type === "text/plain") {
      if (nombre == p.textContent) document.querySelector(".salida").textContent = sessionStorage.getItem(`${nombre}`);
    }
    else if (archivo.type === "image/png" || archivo.type === "image/jpeg") {
      if (nombre == p.textContent) {
        for (let i = 0; i < sessionStorage.length; i++) {
          let llave = sessionStorage.key(i);
          if (llave === nombre) {
            console.log("SI:  " + llave);
            document.getElementsByClassName(`${llave}`)[0].style.opacity = "1";
          } else{
            console.log("NO:  " + llave);
            document.getElementsByClassName(`${llave}`)[0].style.opacity = "0";
          }
        }
      } 
    }
    else if (archivo.type === "video/mp4") {
    } 
  })
}

//carga el texto en el div con la clase salida
const cargarTxt = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsText(ar);
  barProgress(ar);
  leer.addEventListener("load", (e) => {
    let txtData = document.querySelector(".salida").textContent = e.currentTarget.result;
    mostrarAr(nombre, txtData, ar)
  })
}

//cargar las imagenes en el div con la clase salida
const cargarImg = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsDataURL(ar);
  barProgress(ar)
  leer.addEventListener("load", (e) => {
    let url = URL.createObjectURL(ar);
    mostrarAr(nombre, url, ar);
    let IMG = document.createElement("IMG");
    IMG.setAttribute("src", url);
    IMG.classList.add(`${nombre}`)
    document.querySelector(".salida").appendChild(IMG);
  })   
}

//muestra el video e el div con la clase salida
const cargarVideo = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsArrayBuffer(ar);
  barProgress(ar)
  
  leer.addEventListener("load", (e) => {
    let video = new Blob([new Uint8Array(e.currentTarget.result)],{ type: "video/mp4" });
    
    let url = URL.createObjectURL(video);
    let videoPlay = document.createElement("video");

    videoPlay.setAttribute("src", url);
    document.querySelector(".salida").appendChild(videoPlay);
    mostrarAr(nombre, url, ar)
    videoPlay.play()
  })
}

//barra de progreso si se muestra tiempo de espera
const barProgress = (obj) => {
  const leer = new FileReader();
  leer.addEventListener("progress", (e) => {
    let carga = Math.round(e.loaded / obj.size * 100);
    console.log(carga)
    let barra = document.querySelector(".progresoBar");
    barra.style.position = "absolute";
    barra.textContent = `${carga}%`;
  })
  
  
}