// console.log('Hola mundo');
const { leerInput ,
        inquirerMenu,
        pause
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
        const lugar = await leerInput('Ciudad: ');
        console.log(lugar);
        // Buscar los lugares que coincidas con el lugar que escribio el usuario

        // El usuario tiene que seleccionar un lugar de la lista de lugares coincidentes

        // Una vez el usuario selecciona un lugar obtenemos los datos del clima relacionados al geoLocation de ese lugar

        // Mostrar resultados de la busquedas
        console.log('\n Información de la ciudad\n'.green);
        console.log('Ciudad: ',);
        console.log('Lat: ');
        console.log('Lng: ');
        console.log('Temperatura: ');
        console.log('Míniam: ');
        console.log('Máxima: ');
      break;

      default:
        break;
    }

    if ( opt !== 0 ) await pause();

  } while (opt !== 0);
}

main();