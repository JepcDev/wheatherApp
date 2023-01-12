
class Busquedas {
  // historial = ['Teguciagalpa', 'Madrid', 'San José'];
  historial = [];

  constructor(){
    //TODO: leer db si existe
  }

  // Es async por va a recibir informacion de una API
  async ciudad( lugar = ''){
  // Vamos a realizar la peticion http y extraer o traer la informacion
    console.log(lugar);

    return []; //reotnar una lista o array con los lugares  que coincidan con la palabra o lugar que escribio el usuario
  }
}

module.exports = Busquedas;