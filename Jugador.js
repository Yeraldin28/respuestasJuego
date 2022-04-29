//Crea una clase jugador
class Jugador {
  constructor(nombre, puntaje) {
    this.nombre = nombre;
    this.puntaje = puntaje;
  }

  // getters
  getNombre() {
    return this.nombre;
  }

  getPuntaje() {
    return this.puntaje;
  }

  //Metodo para agregar puntaje
  agregarPuntaje(puntaje) {
    this.puntaje += puntaje;
  }
}
