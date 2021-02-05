const fs = require('fs');
const inquirer = require('./node_modules/inquirer/lib/inquirer.js');

inquirer.prompt([{
    type: 'input',
    message: 'What is the project name?',
    name: 'project',
}, {
    type: 'input',
    message: 'Describe this project in 2-3 sentences, if you can.',
    name: 'description',
},
    {
    type: 'number',
    message: 'How many sections for this REDAME (1-4)',
    name: 'sectionNum',
}])