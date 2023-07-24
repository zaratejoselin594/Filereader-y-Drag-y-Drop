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

  if (archivo.type === "text/plain") cargarTxt(archivo, archivo.name)
  else if (archivo.type === "image/png" || archivo.type === "image/jpeg") cargarImg(archivo, archivo.name); 
  else if (archivo.type === "video/mp4") cargarVideo(archivo, archivo.name);
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


// Muestra el nombre del archivo en una columna, agregamos escucha al evento click en el nombre de algun archivo, este se muestra nuevamente en la pantalla
let indice = 0;
const mostrarAr = (nombre, ar, archivo) => {
  const listaAr = document.querySelector(".ar");
  const p = document.createElement("p");
  indice++
  
  p.setAttribute("class",`${indice}`);
  listaAr.appendChild(p);
  p.textContent = `${nombre}`;
  sessionStorage.setItem(`${nombre}`, `${ar}`);
  sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');

  p.addEventListener("click", () => {
    if (archivo.type === "text/plain") {
      //document.querySelector(".salida").innerHTML = sessionStorage.getItem(`${nombre}`);
      reaparecerAr(nombre)
    }
    else if (archivo.type === "image/png" || archivo.type === "image/jpeg") {
      reaparecerAr(nombre)
    }
    else if (archivo.type === "video/mp4") {
    } 
  })
}

// Mostrar nuevamente el archivo en pantalla
const reaparecerAr = (nombre) => {
  for (let i = 0; i < sessionStorage.length; i++) {
    console.log(i+1)
    let llave = sessionStorage.key(i);
    if (llave === nombre) {
      document.getElementsByClassName(`${llave}`)[0].style.opacity = "1";
      document.getElementsByClassName(`${i+1}`)[0].backgroundColor = "#fff5";
    } else {
      document.getElementsByClassName(`${llave}`)[0].style.opacity = "0";
      document.getElementsByClassName(`${i+1}`)[0].backgroundColor = "#fff2";
    }
  }
}

// Cada archivo anterior, desaparece
const desaparecerAr = (obj) => {
  let i = 0;
  for (i; i <= indice; i++) {
    obj.setAttribute("id", `${i}`)
    if (i >= 1) {
      document.getElementById(`${i - 1}`).style.opacity = "0";
    }
  }
}

// Carga el texto en el div con la clase salida
const cargarTxt = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsText(ar);
  barProgress(ar);
  leer.addEventListener("load", (e) => {
    //let txtDataa = document.querySelector(".salida").innerHTML = e.currentTarget.result
    let txtData = document.createElement("p");
    desaparecerAr(txtData)
    txtData.setAttribute("class", `${nombre}`)
    document.querySelector(".salida").appendChild(txtData)
    txtData.innerHTML = e.currentTarget.result;
    mostrarAr(nombre, txtData, ar)
  })
}

// Cargar las imagenes en el div con la clase salida
const cargarImg = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsDataURL(ar);
  barProgress(ar)
  leer.addEventListener("load", (e) => {
    let IMG = document.createElement("IMG");
    desaparecerAr(IMG)
    let url = URL.createObjectURL(ar);
    IMG.setAttribute("src", url);
    IMG.setAttribute("class",`${nombre}`)
    document.querySelector(".salida").appendChild(IMG);
    mostrarAr(nombre, url, ar);
  })   
}

// Muestra el video en el div con la clase salida
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
    videoPlay.setAttribute("controls", "on")
  })
}

// Barra de progreso si se muestra tiempo de espera
const barProgress = (obj) => {
  const leer = new FileReader();
  leer.addEventListener("progress", (e) => {
    let carga = Math.round(e.loaded / obj.size * 100);
    let barra = document.querySelector(".progresoBar");
    barra.style.position = "absolute";
    barra.textContent = `${carga}%`;
  }) 
}