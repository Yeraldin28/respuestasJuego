//Seleccion de todos los elementos requeridos de la página
const botonComenzar = document.querySelector(".botonComenzar button");
const reglasDelJuego = document.querySelector(".reglasDelJuego");
const botonSalir = reglasDelJuego.querySelector(".botones .salir");
const continue_btn = reglasDelJuego.querySelector(".botones .reiniciar");
const preguntas = document.querySelector(".preguntas");
const puntuacionFinal = document.querySelector(".puntuacionFinal");
const opcionesPregunta = document.querySelector(".opcionesPregunta");
const lineaDeTiempo = document.querySelector("header .lineaDeTiempo");
const textoDelTiempo = document.querySelector(".temporizador .tiempoRestante ");
const categoria = document.querySelector(".categoria");
const timeCount = document.querySelector(".temporizador .segundosTemporizador");

// Funcion para mostrar las reglas del juego
botonComenzar.onclick = () => {
  reglasDelJuego.classList.add("reglas");
};

// Funcion para ocultar las reglas del juego
botonSalir.onclick = () => {
  reglasDelJuego.classList.remove("reglas");
};

// Funcion para comenzar con las preguntas
continue_btn.onclick = () => {
  reglasDelJuego.classList.remove("reglas"); // Se ocultan las reglas
  preguntas.classList.add("comenzarCuestionario"); //Se muestran las preguntas
  mostrarPreguntas(0);
  contadorPreguntas(1); // Se muestra el numero en el que empiezan el contador
  comenzarTemporizador(15); // Se inicia el contador
  comenzarLineaTemporizador(0); // Se inicia la linea del contador
};

let tiempo = 15;
let contPreguntas = 0;
let numeroPregunta = 1;
let puntuacionUsuario = 0;
let contador;
let contadorLinea;
let ancho = 0;

const reiniciarCuestionario = puntuacionFinal.querySelector(
  ".botones .reiniciar"
);
const salirDelCuestionario = puntuacionFinal.querySelector(".botones .salir");

// Funcion que se activa al oprimir el boton de reiniciar
reiniciarCuestionario.onclick = () => {
  preguntas.classList.add("comenzarCuestionario"); //Muestra las preguntas
  puntuacionFinal.classList.remove("activarResultado"); //Esconde los resultados
  tiempo = 15;
  contPreguntas = 0;
  numeroPregunta = 1;
  puntuacionUsuario = 0;
  ancho = 0;
  mostrarPreguntas(contPreguntas);
  contadorPreguntas(numeroPregunta); //pasa el valor de numeroPregunta a contadorPreguntas
  clearInterval(contador); //reinicia el contador
  clearInterval(contadorLinea); // reinicia el la linea del contador
  comenzarTemporizador(tiempo);
  comenzarLineaTemporizador(ancho);
  textoDelTiempo.textContent = "Tiempo restante"; //cambia el texto del tiempo al tiempo restante
  botonSiguiente.classList.remove("mostrar"); // Oculta el boton de "siguiente"
};

// Sale del juego recargando la pagina
salirDelCuestionario.onclick = () => {
  window.location.reload();
};

const botonSiguiente = document.querySelector("footer .botonSiguiente");
const contadorDePreguntas = document.querySelector("footer .puntuacion");

// Funcion que cambia de pregunta al clickear el boton "siguiente"
botonSiguiente.onclick = () => {
  if (contPreguntas < arrayPreguntas.length - 1) {
    // Si el contador de preguntas es menor que el numero de preguntas
    contPreguntas++; // Se aumenta el contador de preguntas
    numeroPregunta++; // Se aumenta el numero de pregunta
    mostrarPreguntas(contPreguntas); // Se muestra la pregunta
    contadorPreguntas(numeroPregunta); // Se muestra el numero de pregunta
    clearInterval(contador); // Se reinicia el contador
    clearInterval(contadorLinea); // Se reinicia la linea del contador
    comenzarTemporizador(tiempo);
    comenzarLineaTemporizador(ancho);
    textoDelTiempo.textContent = '<span>'+  arrayPreguntas[index].categoria +'</span>'; //cambia el texto del tiempo al tiempo restante
    botonSiguiente.classList.remove("mostrar"); // Oculta el boton de "siguiente"
  } else {
    clearInterval(contador); // Se reinicia el contador
    clearInterval(contadorLinea); // Se reinicia la linea del contador
    mostrarPuntuacion(); // Se muestra la puntuacion
  }
};

// Se muestran las preguntas del array
function mostrarPreguntas(index) {
  const enunciadoPregunta = document.querySelector(".enunciadoPregunta");

  // Se crea un span y un div para las preguntas y
  let preguntaEnunciado =
    "<span>" +
    arrayPreguntas[index].numero +
    ". " +
    arrayPreguntas[index].pregunta +
    "</span>";
  let preguntaOpcion =
    '<div class="opcion"><span>' +
    arrayPreguntas[index].opciones[0] +
    "</span></div>" +
    '<div class="opcion"><span>' +
    arrayPreguntas[index].opciones[1] +
    "</span></div>" +
    '<div class="opcion"><span>' +
    arrayPreguntas[index].opciones[2] +
    "</span></div>" +
    '<div class="opcion"><span>' +
    arrayPreguntas[index].opciones[3] +
    "</span></div>";
  let categoria_opt = '<span>'+  arrayPreguntas[index].categoria +'</span>';
  enunciadoPregunta.innerHTML = preguntaEnunciado; // Se muestra el enunciado de la pregunta
  opcionesPregunta.innerHTML = preguntaOpcion; //  Se muestran las opciones de la pregunta
  categoria.innerHTML = categoria_opt;
  const opcion = opcionesPregunta.querySelectorAll(".opcion");

  // pone un atributo a cada opcion
  for (i = 0; i < opcion.length; i++) {
    opcion[i].setAttribute("onclick", "opcionSeleccionada(this)");
  }
}
// Agrega los iconos a las opciones
let iconoOpcionSeleccionada =
  '<div class="icono tick"><i class="fas fa-check"></i></div>';
let iconoCruz = '<div class="icono cross"><i class="fas fa-times"></i></div>';

// Funcion que se activa al clickear una opcion
function opcionSeleccionada(respuesta) {
  clearInterval(contador); // Se reinicia el contador
  clearInterval(contadorLinea); // Se reinicia la linea del contador
  let respuestaUsuario = respuesta.textContent; // Se guarda la respuesta del usuario
  let respuestaCorrecta = arrayPreguntas[contPreguntas].respuesta; // Se guarda la respuesta correcta
  const todasLasOpciones = opcionesPregunta.children.length; // Se guarda todas las opciones

  if (respuestaUsuario == respuestaCorrecta) {
    // Si la respuesta del usuario es correcta
    puntuacionUsuario += 1; //  Se aumenta la puntuacion del usuario
    respuesta.classList.add("correcta"); //  Se agrega la clase correcta a la opcion seleccionada
    respuesta.insertAdjacentHTML("beforeend", iconoOpcionSeleccionada); //  Se agrega el icono de "correcto"
  } else {
    respuesta.classList.add("incorrecta"); // Se agrega la clase incorrecta a la opcion seleccionada
    respuesta.insertAdjacentHTML("beforeend", iconoCruz); // Se agrega el icono de "incorrecto"

    for (i = 0; i < todasLasOpciones; i++) {
      if (opcionesPregunta.children[i].textContent == respuestaCorrecta) {
        // Se busca la opcion correcta
        opcionesPregunta.children[i].setAttribute("class", "opcion correcta"); //añade color verde a la respuesta correcta
        opcionesPregunta.children[i].insertAdjacentHTML(
          "beforeend",
          iconoOpcionSeleccionada
        ); // Se agrega el icono de "correcto"
      }
    }
  }
  for (i = 0; i < todasLasOpciones; i++) {
    opcionesPregunta.children[i].classList.add("deshabilitar"); // cuando el usuaario selecciona una opcion se deshabilitan las demas opciones
  }
  botonSiguiente.classList.add("mostrar"); //  Se muestra el boton de "siguiente"
}

function mostrarPuntuacion() {
  reglasDelJuego.classList.remove("reglas"); // Se oculta la regla del juego
  preguntas.classList.remove("comenzarCuestionario"); // Se oculta la pregunta
  puntuacionFinal.classList.add("activarResultado"); // Se muestra la puntuacion final
  const scoreText = puntuacionFinal.querySelector(".textoPuntaje");
  if (puntuacionUsuario > 3) {
    // Si la puntuacion del usuario es mayor a 3 se muestra el mensaje de felicitaciones
    let textoPuntaje =
      "<span>Felicitaciones! , tu puntuación es <p>" +
      puntuacionUsuario +
      "</p> de <p>" +
      arrayPreguntas.length +
      "</p></span>";
    scoreText.innerHTML = textoPuntaje; // Se muestra el mensaje de felicitaciones
  } else if (puntuacionUsuario > 1) {
    // Si la puntuacion del usuario es mayor a 1 se muestra el mensaje de buen trabajo
    let textoPuntaje =
      "<span> Bien , tu puntuació es <p>" +
      puntuacionUsuario +
      "</p> de <p>" +
      arrayPreguntas.length +
      "</p></span>";
    scoreText.innerHTML = textoPuntaje;
  } else {
    // Si la puntuacion del usuario es menor a 1 se muestra el mensaje de lo lamento
    let textoPuntaje =
      "<span>Lo lamento , tu puntuación es: <p>" +
      puntuacionUsuario +
      "</p> de <p>" +
      arrayPreguntas.length +
      "</p></span>";
    scoreText.innerHTML = textoPuntaje;
  }
}

function comenzarTemporizador(tiempo) {
  contador = setInterval(temporizador, 1000);
  function temporizador() {
    timeCount.textContent = tiempo; // Se muestra el tiempo restante
    tiempo--; // Se disminuye el tiempo restante
    if (tiempo < 9) {
      // Si el tiempo restante es menor a 9 se muestra un 0 antes del tiempo restante
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; // Se agrega un 0 al tiempo restante
    }
    if (tiempo < 0) {
      // Si el tiempo restante es menor a 0 se reinicia el contador
      clearInterval(contador); // Se reinicia el contador
      textoDelTiempo.textContent = "Acabo el tiempo"; // Se muestra el mensaje de "Acabo el tiempo"
      const todasLasOpciones = opcionesPregunta.children.length; // Se guarda todas las opciones
      let respuestaCorrecta = arrayPreguntas[contPreguntas].respuesta; // Se guarda la respuesta correcta
      for (i = 0; i < todasLasOpciones; i++) {
        if (opcionesPregunta.children[i].textContent == respuestaCorrecta) {
          // Se busca la opcion correcta
          opcionesPregunta.children[i].setAttribute("class", "opcion correcta"); //añade color verde a la respuesta correcta
          opcionesPregunta.children[i].insertAdjacentHTML(
            "beforeend",
            iconoOpcionSeleccionada
          ); // Se agrega el icono de "correcto"
        }
      }
      for (i = 0; i < todasLasOpciones; i++) {
        opcionesPregunta.children[i].classList.add("deshabilitar"); // cuando el usuaario selecciona una opcion se deshabilitan las demas opciones
      }
      botonSiguiente.classList.add("mostrar"); // Se muestra el boton de "siguiente"
    }
  }
}

function comenzarLineaTemporizador(tiempo) {
  contadorLinea = setInterval(temporizador, 29);
  function temporizador() {
    tiempo += 1; // Va aumentando la linea del temporizador
    lineaDeTiempo.style.width = tiempo + "px"; // Incrementa el ancho de la linea a medida que pasa el tiempo
  }
}

function contadorPreguntas(index) {
  let totalContadorPreguntas =
    "<span><p>" +
    index +
    "</p> de <p>" +
    arrayPreguntas.length +
    "</p> arrayPreguntas</span>";
  contadorDePreguntas.innerHTML = totalContadorPreguntas; //adding new span tag inside contadorDePreguntas
}
