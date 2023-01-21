const axios = require('axios');

class Busquedas {
  // historial = ['Teguciagalpa', 'Madrid', 'San José'];
  historial = [];

  constructor(){
    //TODO: leer db si existe
  }

  // Es async por va a recibir informacion de una API
  async ciudad( lugar = ''){
  // Vamos a realizar la peticion http y extraer o traer la informacion
    // console.log('ciudad',lugar);
    try {
      // const resp = await axios.get('https://reqres.in/api/users?page=2');
      const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?limit=5&language=es&access_token=pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2tvZHh4Y3YwMDhnMnBvY3ozbHUxdGJvIn0.3zptKSSxJrM5VmfjnkKMYA');
      console.log(resp.data);

      return []; //reotnar una lista o array con los lugares  que coincidan con la palabra o lugar que escribio el usuario
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;