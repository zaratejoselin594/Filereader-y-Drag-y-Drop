
// Funcion de eliminar temas
const eliminarTema = (nombre) => {
  for (let i = 0; i < localStorage.length; i++) {
    llave = localStorage.key(i)
    if (llave === nombre) {
      localStorage.removeItem(`${llave}`);
     
      document.querySelector(`${llave}`).remove()
    }
  }
}

let eliminar = document.querySelectorAll("#eliminar")
eliminar.forEach(e => {
  e.addEventListener("click", () => {
    console.log("funciona")
    for (let i = 0; i < localStorage.length; i++) {
      llave = localStorage.key(i)
      eliminarTema(llave)
    }
  })
});