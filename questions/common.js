const inquirer = require('inquirer');

module.exports = {
  component: [
    {
      message: 'Name of the component ?',
      type: 'input',
      name: 'compname',
      validate: function(name) {
        return name !== '';
      }
    },
    {
      message: 'How would you like the component ?',
      type: 'list',
      name: 'compoption',
      choices: ['statefull', 'stateless']
    },
    {
      type: 'confirm',
      message: 'Are you using redux ? (default redux component is statefull)',
      name: 'compRedux'
    },
    {
      type: 'checkbox',
      message: 'Select any life cycle hooks',
      name: 'CompHooks',
      choices : [
        'componentWillMount',
        'ComponentWillRecieveProps',
        'componentDidMount',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount'
      ]
    },
    {
      message: 'Path of the file you want to save in ? (root: ./)',
      type: 'input',
      name: 'comppath'
    },
    
  ],
  action: [
    {
      message: 'Name of the action ? (default name : action)',
      type: 'input',
      name: 'actionName'
    },
    {
      message:
        'Action type name ? (same prefix for PENDING, SUCCESS & FALIURE)',
      type: 'input',
      name: 'actionTypeName'
    },
    {
      message: 'Path of the file you want to save in ? (root: ./)',
      type: 'input',
      name: 'actionPath'
    }
  ],
  reducer: [
    {
      message: 'Name of the reducer ?',
      type: 'input',
      name: 'reducerName',
      validate: function(name) {
        return name !== '';
      }
    },
    {
      message: 'Path of the file you want to save in ? (root: ./)',
      type: 'input',
      name: 'reducerPath'
    }
  ],
  service: [
    {
      message: 'Name of the service ?',
      type: 'input',
      name: 'serviceName',
      validate: function(name) {
        return name !== '';
      }
    },
  ],
};
