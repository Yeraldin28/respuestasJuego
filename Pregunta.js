class Pregunta {
  constructor(categoria, enunciado, imagen, opciones) {
    this.categoria = categoria;
    this.enunciado = enunciado;
    this.imagen = imagen;
    this.opciones = opciones;
  }

  getCategoria() {
    return this.categoria;
  }

  getEnunciado() {
    return this.enunciado;
  }

  getImagen() {
    return this.imagen;
  }

  getOpciones() {
    return this.opciones;
  }
}
