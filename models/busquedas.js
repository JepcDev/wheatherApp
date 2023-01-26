const fs = require('fs');

const axios = require('axios');

// Process contiene todo lo que son nuestras variables de entorno
// console.log(process.env);
// DEV Busquedas
class Busquedas {
  // historial = ['Teguciagalpa', 'Madrid', 'San José'];
  historial = [];
  dbPat = './db/data.json';
  constructor(){
    //TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      // access_token:
      'access_token' : process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsOpenWeather(){
    return{
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }
  // Es async por va a recibir informacion de una API
  async ciudad( lugar = ''){
    try {
      // Vamos a realizar la peticion http y extraer o traer la informacion
      // console.log('ciudad',lugar);
      // const resp = await axios.get('https://reqres.in/api/users?page=2');
      // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?limit=5&language=es&access_token=pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2tvZHh4Y3YwMDhnMnBvY3ozbHUxdGJvIn0.3zptKSSxJrM5VmfjnkKMYA');
      // Todo lo demas que viene despues de un signo de interrogacion en una peticcion url es conocidos como params
      const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
        // params: {
          // access_token:
        //   'access_token' :'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2tvZHh4Y3YwMDhnMnBvY3ozbHUxdGJvIn0.3zptKSSxJrM5VmfjnkKMYA',
        //   'limit': 5,
        //   'language': 'es'
        // }
      });

      const resp = await instance.get();
      // console.log(resp.data.features);
      // aqui dentro hay que hacer un return del objeto que quiero que sea parte del nuevo elemento de mi arreglo
      // lugar =>({}) significa que voy a regresar un objeto de forma implicita, un nuevo objeto no un nuevo elemento extra en el arreglo sino un nuevo objeto con caracteristicas o elementos propios
      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre : lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }));

      // return []; //retonar una lista o array con los lugares  que coincidan con la palabra o lugar que escribio el usuario
    } catch (error) {
      return [];
    }
  }

  // https://api.openweathermap.org/data/2.5/weather?lat=37.336191&lon=-121.890583&appid=58e06af4ed842ec91c0321d6c2942dd5&units=metric&lang=es
  //DEV weatherPlace Obtener el clima del lugar
  // Cuando la parametro que nos envian tiene el mismo nombre que el parametro o atributo de la funcion no es necesario ponerlo de nuevo
  async weatherPlace( lat = '', lon = '' ){
    try {
      // create es de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon}
        // params:{
        //   lat,//parametro con el mismo valor que el parametro que nos envian
        //   lon,
        //   appid: process.env.OPENWEATHER_KEY,
        //   units: 'metric',
        //   lang:'es'
        // }
      });

      // get es de axios
      const resp = await instance.get();
      // console.log(resp);
      // data es de axios
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
    } catch (error) {
      console.log(error);
    }
  }

  // DEV agregarHidtorial
  agregarHidtorial(lugar = ''){
    // TODO: prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    // añadir un lugar al historial - unshift para ponerlo al inicio
    this.historial.unshift(lugar.toLocaleLowerCase())

    // TODO: grabar en una DB
    this.saveDB();

  }

  // DEv saveDB
  saveDB(){

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync( this.dbPat, JSON.stringify(payload) );
  }

  // DEV readDB
  readDB(){

  }
}

module.exports = Busquedas;