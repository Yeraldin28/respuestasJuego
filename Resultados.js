//Crea una clase resultados con mayor untaje y jugadores[]
class Resultados {
  constructor(mayorPuntaje, jugadores) {
    this.mayorPuntaje = mayorPuntaje;
    this.jugadores = jugadores;
  }

  // getters
  getmayorPuntaje() {
    return this.mayorPuntaje;
  }

  getJugadores() {
    return this.jugadores;
  }

  //Metodo para calcular el mayor puntaje
  calcularMayorPuntaje() {
    let mayorPuntaje = 0;
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].getPuntaje() > mayorPuntaje) {
        mayorPuntaje = this.jugadores[i].getPuntaje();
      }
    }
    this.mayorPuntaje = mayorPuntaje;
  }

  //Metodo para agregar jugador
  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }
}
