const fs = require('fs');
const path = require('path');
const reducerTemplate = require('../templates/reducer');
const chalk = require('chalk');

module.exports = function(pathname, name, type) {
  if (!pathname) pathname = path.join(__dirname);
  if (!name || name === '') {
    name = 'reducer'
  }

  if (!fs.existsSync(pathname)) {
    let dirname = path.dirname(pathname);
    if (!fs.existsSync(dirname)) {
      mkdirp(dirname);
    }
    fs.mkdirSync(pathname);
  }
  
  let nameLower = name.toLowerCase();
  let stream = fs.createWriteStream(`${pathname}/${nameLower}.js`);

  try {
    stream.write(reducerTemplate.Init());
  } catch (e) {
    console.log('Error generating file' + e);
    stream.end();
  }

  stream.on('finish', () => {
    console.log(chalk.white.bgGreen.bold(`${name} reducer has been generated in ${pathname}`));
  });

  stream.end();
};
