class Opciones {
  constructor(respuesta, incorrecta1, incorrecta2, incorrecta3) {
    this.respuesta = respuesta;
    this.incorrecta1 = incorrecta1;
    this.incorrecta2 = incorrecta2;
    this.incorrecta3 = incorrecta3;
  }

  // getters
  getRespuesta() {
    return this.respuesta;
  }

  getIncorrecta1() {
    return this.incorrecta1;
  }

  getIncorrecta2() {
    return this.incorrecta2;
  }

  getIncorrecta3() {
    return this.incorrecta3;
  }
}
