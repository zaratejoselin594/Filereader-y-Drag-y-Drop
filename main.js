"use scrict";
const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover", (e) => {
  e.preventDefault();
  cambiarColor(e.target, "#fb47", "#ddf5");
  zona.style.boxShadow ="-10px -10px 15px #0003"
})

zona.addEventListener("dragleave", (e) => {
  e.preventDefault();
  cambiarColor(e.target, "#ab68fd", "#ddf");
  zona.style.boxShadow = "10px 10px 15px #0003"
})

let indice = 0;

zona.addEventListener("drop", (e) => {
  cambiarColor(e.target, "#ab68fd", "#ddf")
  e.preventDefault();
  zona.style.boxShadow = "10px 10px 15px #0003"
  const archivo = e.dataTransfer.files[0];

  if (archivo.type === "text/plain")  cargarTxt(archivo, archivo.name)
  else if (archivo.type === "image/png" || archivo.type === "image/jpeg") cargarImg(archivo, archivo.name); 
  else if (archivo.type === "video/mp4") cargarVideo(archivo, archivo.name);
})

const cambiarColor = (obj, color, ctxt) => {
  obj.style.border = `${color} solid 5px`;
  obj.style.color = `${ctxt}`;
}

const cargarTxt = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsText(ar);
  barProgress(ar);
  leer.addEventListener("load", (e) => { 
    let txtData = document.querySelector(".salida").textContent = e.currentTarget.result;
    mostrarAr(nombre, txtData, ar)
  })
}
const mostrarAr = (nombre, ar, archivo) => {
  const listaAr = document.querySelector(".contenido");
  const p = document.createElement("p");
  indice++
  p.classList.add(`${indice}`)
  listaAr.appendChild(p);
 
  p.textContent = `${nombre}`;
  sessionStorage.setItem(`${nombre}`, `${ar}`);
  p.addEventListener("click", () => {
    console.log(archivo)
    if (archivo.type === "text/plain") {
      if (nombre == p.textContent) document.querySelector(".salida").textContent = sessionStorage.getItem(`${nombre}`);
    }
    else if (archivo.type === "image/png" || archivo.type === "image/jpeg") {
      if (nombre == p.textContent) {
        console.log("hola")
      }
    }
    else if (archivo.type === "video/mp4") {
    } 
  })
}


const cargarImg = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsDataURL(ar);
  barProgress(ar)
  leer.addEventListener("load", (e) => {
    let url = URL.createObjectURL(ar);
    mostrarAr(nombre, url)
    let IMG = document.createElement("IMG");
    IMG.setAttribute("src", url);
    document.querySelector(".salida").appendChild(IMG);
  })
}

const cargarVideo = (ar) => {
  const leer = new FileReader();
  leer.readAsArrayBuffer(ar);
  barProgress(ar)
  
  leer.addEventListener("load", (e) => {
    let video = new Blob([new Uint8Array(e.currentTarget.result)],{ type: "video/mp4" });
    
    let url = URL.createObjectURL(video);
    let videoPlay = document.createElement("video");

    videoPlay.setAttribute("src", url);
    document.querySelector(".salida").appendChild(videoPlay);

    videoPlay.play()
  })
}

const barProgress = (obj) => {
  const leer = new FileReader();
  leer.addEventListener("progress", (e) => {
    let carga = Math.round(e.loaded / obj.size * 100);
    let barra = document.querySelector(".progresoBar");
    barra.style.position = "absolute";
    barra.textContent = `${carga}%`;
    let load = document.querySelector(".loader");
    load.style.opacity = "1";
    if (carga == 100) load.style.opacity = "0";
  })
  
  leer.addEventListener("loadend", e => {
    setTimeout(() => {
      document.querySelector(".progresoBar").style.opacity = "0";     
    }, 1500);
  })
}