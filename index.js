// console.log('Hola mundo');
const { leerInput ,
        inquirerMenu,
        pause
      } = require('./helpers/inquirer');

console.clear();
const main = async () => {
  // const texto = await leerInput('País: ');
  // console.log(texto);
  let opt ;
  do {
    opt = await inquirerMenu();
    console.log({opt});

    if ( opt !== 0 ) await pause();

  } while (opt !== 0);
}

main();