const fs = require('fs');
const path = require('path');
const actiontemplate = require('../templates/actions');
const chalk = require('chalk');

module.exports = function(pathname, name, type) {
  if (!pathname) pathname = path.join(__dirname);
  if (!name || name === '') {
    name = 'action';
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
    stream.write(actiontemplate.Init(name, type));
  } catch (e) {
    console.log('Error generating file' + e);
    stream.end();
  }

  stream.on('finish', () => {
    console.log(
      chalk.white.bgGreen.bold(
        `${name} action has been generated in ${pathname}`
      )
    );
  });

  stream.end();
};
