const fs = require('fs');
const path = require('path');
const comptemplate = require('../templates/component');
const chalk = require('chalk');
const replace = require('replace-in-file');
const prettier = require('prettier');
const mkdirp = require('mkdirp');
const actionGenerator = require('./actions');
const reducerGenerator = require('./reducers');
const constants = require('../constants');

module.exports = function(pathname, name, state, res) {
  let nameLower = name.toLowerCase();

  if (res.compRedux && state === 'sf') {
    if (!pathname) {
      pathname = path.join(__dirname + nameLower);
    } else {
      pathname = path.join(pathname + `/` + nameLower);
    }
  } else {
    if (!pathname) pathname = path.join(__dirname);
  }
  if (!name) {
    console.log(chalk.yellow.bold('Warning: No name has been specified'));
    return;
  }

  if (!fs.existsSync(pathname)) {
    let dirname = path.dirname(pathname);
    if (!fs.existsSync(dirname)) {
      mkdirp(dirname);
    }
    fs.mkdirSync(pathname);
  }

  let stream =
    res.compRedux && state === 'sf'
      ? fs.createWriteStream(`${pathname}/index.js`)
      : fs.createWriteStream(`${pathname}/${nameLower}.js`);

  try {
    if (state === 'sf') {
      stream.write(comptemplate.StateFull(name, res));
    } else {
      stream.write(comptemplate.StateLess(name));
    }
  } catch (e) {
    console.log('Error generating file' + e);
    stream.end();
  }

  stream.on('finish', () => {
    console.log(
      chalk.white.bgGreen.bold(`${name} has been generated in ${pathname}`)
    );

    if (res.compRedux && state === 'sf') {
      actionGenerator(pathname, 'Action', 'Demo');
      reducerGenerator(pathname, 'Reducer', 'Demo');
    }
    replace({
      files: path.join(constants.globalpath + '/' + 'src/pages/index.js'),
      from: ['/* Imports */', '/* Exports */'],
      to: [
        prettier.format(`
        import ${name} from './${path.basename(pathname)}/${nameLower}';
              /* Imports */
              `),
        `
      ${name},
      /* Exports */
        `
      ]
    }).then(() => {
      console.log(
        chalk.white.bgYellow.bold(`${name} has been added in pages/index`)
      );
    });

    replace({
      files: path.join(constants.globalpath + '/' + 'src/config/routeconfig.js'),
      from: ['/* Route Parameter */'],
      to: [
        `${nameLower}: '${nameLower}',
        /* Route Parameter */ 
        `
      ]
    }).then(() => {
      console.log(
        chalk.white.bgYellow.bold(`${name} has been added in route config `)
      );
    });

    replace({
      files: path.join(constants.globalpath + '/src/routes.js'),
      from: ['/* Component Imports */', '{/* Routes */}'],
      to: [
        ` /* Component Imports */
        ${name},
        `,
        `<Route path={routeconfig.${nameLower}} component={${name}} />
        {/* Routes */}
        `
      ]
    }).then(() => {
      console.log(
        chalk.white.bgYellow.bold(`${name} has been added in routes`)
      );
    });
  });

  stream.end();
};
