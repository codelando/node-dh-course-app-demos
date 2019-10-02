// Core modules
const fs = require('fs');

// NPM
const chalk = require('chalk');
const yargs = require('yargs');

// My Files
const notas = require('./notas.js');

yargs.version('1.1.0');

// Add note command
yargs.command({
    command: 'agregar',
    describe: 'Agregar una nota',
    builder: {
        titulo: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
        cuerpo: {
            describe: 'Cuerpo de la nota',
            demandOption: true,
            type: 'string',
            alias: 'c'
        }
    },
    handler(argv) {
        notas.agregarNota(argv.titulo, argv.cuerpo)
    }
});

// Remove note command
yargs.command({
    command: 'borrar',
    describe: 'Borrar una nota',
    builder: {
        titulo: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv) {
        notas.borrarNota(argv.titulo);
    }
});

// List notas command
yargs.command({
    command: 'listar',
    describe: 'Listar todas las notas',
    handler() {
        notas.listarNotas();
    }
});

// Read note command
yargs.command({
    command: 'leer',
    describe: 'Leer una nota',
    builder: {
        titulo: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv) {
        notas.leerNota(argv.titulo);
    }
});

yargs.command({
    command: '*',
    handler() {
        yargs.showHelp()
    }
});

// Parse de arguments
yargs.parse();


// console.log(chalk`{underline Body}: ${cuerpo}`);
