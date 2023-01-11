const inquirer = require('inquirer');
// import inquirer from 'inquirer';
require('colors');

// Lista de opciones del usuario
const optionQestion = [
  {
    type : 'list',
    name: 'option',
    message: '¿ Que quieres hacer ?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad o lugar`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      },
    ]
  }
];

// Menu iterativo inquirer
const inquirerMenu = async() => {
  console.clear();
  console.log('============================='.green);
  console.log('    Seleccione una opción'.white);
  console.log('============================='.green);

  // aqui va la lista de las preguntas de la app
  // devuelve el numero o valor de la opcion que elegimos
  const {option}= await inquirer.prompt(optionQestion);
  return option;
}

// Pone en pausa el prompt hasta que presionemos enter
// DEV - pause
const pause = async() => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);
}

// DEV - leerInput
const leerInput = async(message)=> {
  const question = [
    {
      type: 'input',
      name: 'desc',
      // message : mensaje
      message,
      validate(value){
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];
  const {desc} = await inquirer.prompt(question);
  return desc;
}

// DEV listadoTareasBorrar
const listadoTareasBorrar = async( tareas = [] ) => {
  // map regresa un nuevo arreglo pero transforma los hijos del array
  // es decir los valores del arreglo actal los tranforma a lo que yo quiera
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.green
    // lo que retornemos es como van a lusir cada uno de los nuevos items del arreglo
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas);
  return id;
  // {
  //   value: tareas.id,
  //   name:`${'1.'.green} Crear tarea`
  // }
}

// DEV confirmation
// Confirmar si se quiere borrar una tarea
const confirmation = async(message) =>{

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const {ok} = await inquirer.prompt(question);
  return ok;
}

// DEV mostrarListadoCheckList
const mostrarListadoCheckList = async( tareas = [] ) => {
  // map regresa un nuevo arreglo pero transforma los hijos del array
  // es decir los valores del arreglo actal los tranforma a lo que yo quiera
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.green
    // lo que retornemos es como van a lusir cada uno de los nuevos items del arreglo
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn)? true:false
    }
  });

  // regresa un lista de tareas completadas
  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
}

// DEV - exports
module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmation,
  mostrarListadoCheckList
}