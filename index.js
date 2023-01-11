// console.log('Hola mundo');
const { leerInput } = require('./helpers/inquirer');

const main = async() => {
  const texto = await leerInput('País: ');
  console.log(texto);
}

main();