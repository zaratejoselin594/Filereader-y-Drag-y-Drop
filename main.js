
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

  if (archivo.type === "text/plain") cargarTxt(archivo, archivo.name)
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
      for (let i = 0; i < sessionStorage.length; i++) {
        let llave = sessionStorage.key(i);
        if (llave === nombre) {
          document.getElementsByClassName(`${llave}`)[0].style.opacity = "1";
        } else {
          document.getElementsByClassName(`${llave}`)[0].style.opacity = "0";
        }
      }
    }
    else if (archivo.type === "image/png" || archivo.type === "image/jpeg") {
      for (let i = 0; i < sessionStorage.length; i++) {
        let llave = sessionStorage.key(i);
        if (llave === nombre) {
          document.getElementsByClassName(`${llave}`)[0].style.opacity = "1";
        } else{
          document.getElementsByClassName(`${llave}`)[0].style.opacity = "0";
        }
      }
    }
    else if (archivo.type === "video/mp4") {
    } 
  })
}

// cada archivo anterior, desaparece
const desaparecer = (obj) => {
  let i = 0;
  for (i; i <= indice; i++) {
    obj.setAttribute("id", `${i}`)
    if (i >= 1) {
      document.getElementById(`${i - 1}`).style.opacity = "0";
    }
  }
}
//carga el texto en el div con la clase salida
const cargarTxt = (ar, nombre) => {
  const leer = new FileReader();
  leer.readAsText(ar);
  barProgress(ar);
  leer.addEventListener("load", (e) => {
    //let txtDataa = document.querySelector(".salida").innerHTML = e.currentTarget.result
    let txtData = document.createElement("p");
    desaparecer(txtData)
    txtData.setAttribute("class", `${nombre}`)
    document.querySelector(".salida").appendChild(txtData)
    txtData.innerHTML = e.currentTarget.result;
    mostrarAr(nombre, txtData, ar)
  })
}

//cargar las imagenes en el div con la clase salida
const cargarImg = (ar, nombre) => {
  let index = 1;
  const leer = new FileReader();
  leer.readAsDataURL(ar);
  barProgress(ar)
  leer.addEventListener("load", (e) => {
    let IMG = document.createElement("IMG");
    desaparecer(IMG)
    let url = URL.createObjectURL(ar);
    IMG.setAttribute("src", url);
    IMG.setAttribute("class",`${nombre}`)
    document.querySelector(".salida").appendChild(IMG);
    mostrarAr(nombre, url, ar);
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
    let barra = document.querySelector(".progresoBar");
    barra.style.position = "absolute";
    barra.textContent = `${carga}%`;
  }) 
}