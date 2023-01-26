require('dotenv').config()

// console.log('Hola mundo');
const { leerInput ,
        inquirerMenu,
        pause,
        listarLugares
      } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');

console.clear();
// DEV main
const main = async () => {
  // const texto = await leerInput('País: ');
  // console.log(texto);
  const busquedas = new Busquedas();
  let opt ;
  do {
    opt = await inquirerMenu();
    // console.log({opt});

    switch (opt) {
      case 1:
        // Mostrar mensaje para que la persona escriba el lugar
        const termino = await leerInput('Ciudad: ');
        // console.log(lugar);
        // Buscar los lugares que coincidas con el lugar que escribio el usuario
        const lugares = await busquedas.ciudad(termino);

        // El usuario tiene que seleccionar un lugar de la lista de lugares coincidentes
        const idSeleccion = await listarLugares(lugares);
        // Previene cuando el id es 0
        if (idSeleccion === '0') continue;

        // Extraer el lugar seleccionado
        // console.log({idSeleccion});
        // find(callback) regresa el primer elemento que cumpla la condicion que especificamos en su callback
        const lugarSeleccion = lugares.find(l => l.id === idSeleccion);
        // console.log(lugarSeleccion);
        // Guardar en DB
        busquedas.agregarHidtorial(lugarSeleccion.nombre);

        // Una vez el usuario selecciona un lugar obtenemos los datos del clima relacionados al geoLocation de ese lugar
        const clima = await busquedas.weatherPlace(lugarSeleccion.lat, lugarSeleccion.lng);
        // Mostrar resultados de la busquedas
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSeleccion.nombre.green);
        console.log('Lat: ', lugarSeleccion.lat);
        console.log('Lng: ', lugarSeleccion.lng);
        console.log('Temperatura: ', clima.temp);
        console.log('Mínima: ', clima.min);
        console.log('Máxima: ', clima.max);
        console.log('Como esta el clima: ', clima.desc.green);
      break;

      case 2:
        busquedas.historial.forEach( (lugar, i)=>{
          const idx = `${i+1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
      default:
        break;
    }

    if ( opt !== 0 ) await pause();

  } while (opt !== 0);
}

main();