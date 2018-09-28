const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const compgenerator = require('./generators/components');
const questions = require('./questions/common');
const actiongenerator = require('./generators/actions');
const reducergenerator = require('./generators/reducers');
const genlineComponent = require('./generators/genline.component');

let args = process.argv;
if (process.argv.indexOf('genline') > -1) {
  if (process.argv.indexOf('c') > -1) {
    genlineComponent(process, path.join(__dirname));
  }
} else {
  program
    .command('generate')
    .option('-c, --component', 'Generate Component')
    .option('-s, --service', 'Generate Service')
    .option('-a, --action', 'Generate Service')
    .option('-r, --reducer', 'Generate Service')
    .description('Generating Component')
    .action(function(option, pathName, name, stateflag) {
      if (
        program.rawArgs.indexOf('--component') > -1 ||
        program.rawArgs.indexOf('-c') > -1
      ) {
        inquirer.prompt(questions.component).then(function(res) {
          if (res.compoption === 'statefull') {
            compgenerator(
              path.join(__dirname + '/' + res.comppath),
              res.compname,
              'sf',
              res
            );
          } else {
            compgenerator(
              path.join(__dirname + '/' + res.comppath),
              res.compname,
              'sl',
              res
            );
          }
        });
      } else if (
        program.rawArgs.indexOf('--service') > -1 ||
        program.rawArgs.indexOf('-s') > -1
      ) {
        inquirer.prompt(questions.service).then(function(res) {
          console.log(res);
        });
      } else if (
        program.rawArgs.indexOf('--action') > -1 ||
        program.rawArgs.indexOf('-a') > -1
      ) {
        inquirer.prompt(questions.action).then(function(res) {
          actiongenerator(
            path.join(__dirname + '/' + res.actionPath),
            res.actionName,
            res.actionTypeName
          );
        });
      } else if (
        program.rawArgs.indexOf('--reducer') > -1 ||
        program.rawArgs.indexOf('-r') > -1
      ) {
        inquirer.prompt(questions.reducer).then(function(res) {
          reducergenerator(
            path.join(__dirname + '/' + res.reducerPath),
            res.reducerName
          );
        });
      } else if (
        program.rawArgs.indexOf('--service') > -1 ||
        program.rawArgs.indexOf('-s') > -1
      ) {
        inquirer.prompt(questions.service).then((res)=>{
          console.log(res)
        })
      } else {
        console.log(
          chalk.white.bgYellow(`
      Property is not specified 
      Please check out help for more details `)
        );
      }
    });
}

program.parse(process.argv);
