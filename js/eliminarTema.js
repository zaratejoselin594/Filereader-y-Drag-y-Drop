
// Funcion de eliminar temas
const eliminarTema = (nombre) => {
  for (let i = 0; i < localStorage.length; i++) {
    llave = localStorage.key(i)
    if (llave === nombre) {
      localStorage.removeItem(`${llave}`);
      const combinaciones = document.querySelector(".combinaciones")
      combinaciones.removeChild(document.querySelector(`${llave}`))
      console.log(llave)
    }
  }
}

let eliminar = document.querySelectorAll("#eliminar")
eliminar.forEach(e => {
  e.addEventListener("click", () => {
    console.log("click")
    
  })
});