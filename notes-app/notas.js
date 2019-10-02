const fs = require('fs');
const chalk = require('chalk');

const agregarNota = (titulo, cuerpo) => {
    const notas = cargarNotas();

    // Recorre todo el array
    // const duplicadas = notas.filter(nota => nota.titulo === titulo);

    // Se detiene en el primer resultado
    const duplicadas = notas.find(nota => nota.titulo === titulo);

    if (!duplicadas) {
        notas.push({titulo, cuerpo});
        guardarNotas(notas);
        console.log(chalk`{green.inverse Nueva nota agregada!}`);
    } else {
        console.log(chalk`{red.inverse Ya existe una nota con ese título!}`);
    }
};

const borrarNota = (titulo) => {
    const notas = cargarNotas();

    const notasFiltradas = notas.filter(nota => nota.titulo !== titulo);

    if (notas.length > notasFiltradas.length) {
        guardarNotas(notasFiltradas);
        console.log(chalk`{green.inverse Nota borrada!}`);
    } else {
        console.log(chalk`{yellow.inverse Nota no encontrada!}`);
    }
}

const listarNotas = () => {
    const notas = cargarNotas();

    console.log(chalk`{blue.inverse Tus notas:}`);

    notas.forEach((nota, index) => {
        console.log(chalk`{blue ${index + 1}. ${nota.titulo}}`);
    });
};

const leerNota = (titulo) => {
    const notas = cargarNotas();

    const nota = notas.find((nota) => nota.titulo === titulo);

    if (nota) {
        console.log(chalk`{blue.inverse ${nota.titulo}}`);
        console.log(chalk`{blue ${nota.cuerpo}}`);
    } else {
        console.log(chalk`{yellow.inverse Nota no encontrada!}`);
    }
}

const guardarNotas = (notas) => {
    const notasJSON = JSON.stringify(notas);

    fs.writeFileSync('notas.json', notasJSON);
}

const cargarNotas = () => {
    // Tratamos de leer el archivo de notas
    // Retornamos un array vacío en caso de error
    try {
        const dataBuffer = fs.readFileSync('notas.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

// Cuando creamos propiedades en un objeto de JS, podemos omitir el nombre de
// la misma y JS tomará el nombre de la variable como nombre de la propiedad
module.exports = { agregarNota, borrarNota, listarNotas, leerNota };
