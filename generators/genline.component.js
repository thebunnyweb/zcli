
const compgenerator = require('./components');
const path = require('path'); 
const chalk = require('chalk');

module.exports = function(process, abspath){
  process.argv.splice(0, 3);
  let parameters = {
    type: '',
    name: '',
    state: '',
    redux: false,
    hooks: [],
    path: '',
    indexed: false
  };

  Object.keys(parameters).forEach((item, index) => {
    parameters[item] = process.argv[index];
  });

  if (!parameters.name) {
    console.log(chalk.bgRed.white.bold('Name is mandatory'));
    return;
  }

  let pathname = parameters.path
    ? path.join(abspath + '/' + parameters.path)
    : './';
  let name = parameters.name;
  let indexed = parameters.indexed === 'y' ? true : false;
  let state = !parameters.state || parameters.state !== 'sl' ? 'sf' : 'sl';
  let redux =
    parameters.redux === 'y' || parameters.state !== 'sl' && parameters.redux === 'y'  ? true : false;

  let hooks = [];
  parameters.hooks && parameters.hooks.length > 0 ? genHooks(parameters.hooks) : [];
  function genHooks(rhook) {
    function update(item) {
      if (item === 'cwm') {
        hooks.push('componentWillMount');
      } else if (item === 'cwr') {
        hooks.push('ComponentWillRecieveProps');
      } else if (item === 'cdm') {
        hooks.push('componentDidMount');
      } else if (item === 'cwu') {
        hooks.push('componentWillUpdate');
      } else if (item === 'cdu') {
        hooks.push('componentDidUpdate');
      } else if (item === 'cwum') {
        hooks.push('componentWillUnmount');
      }
    }

    let hookSplit = rhook.split('_');
    if (hookSplit.length > 1) {
      hookSplit.forEach(item => {
        update(item);
      });
    } else {
      update(rhook);
    }
  }

  let res = {
    compRedux: redux,
    CompHooks: hooks,
    compEntry: indexed
  };

  compgenerator(pathname, name, state, res);
}

