const prettier = require('prettier');
module.exports = {
  StateFull: function(name, res) {
    let reduxTemplate = `import { connect } from 'react-redux';

    @connect(
      store => ({
        storedata: store
      }),
      {
        // actions here
      }
    )
    `;
    let componentWillMount = `componentWillMount() {}`;
    let ComponentWillRecieveProps = `componentWillReceiveProps(nextProps){}`;
    let componentDidMount = `componentDidMount(){}`;
    let componentWillUpdate = `componentWillUpdate(){}`;
    let componentDidUpdate = `componentDidUpdate(){}`;
    let componentWillUnmount = `componentWillUnmount(){}`;

    let template = `
    import React from 'React';
    ${res.compRedux ? reduxTemplate : ''}
    class ${name} extends React.Component {
      state = {};
      
      ${
        res.CompHooks.indexOf('componentWillMount') > -1
          ? componentWillMount
          : ''
      }
      ${
        res.CompHooks.indexOf('ComponentWillRecieveProps') > -1
          ? ComponentWillRecieveProps
          : ''
      }
      ${
        res.CompHooks.indexOf('componentDidMount') > -1 ? componentDidMount : ''
      }
      ${
        res.CompHooks.indexOf('componentWillUpdate') > -1
          ? componentWillUpdate
          : ''
      }
      ${
        res.CompHooks.indexOf('componentDidUpdate') > -1
          ? componentDidUpdate
          : ''
      }
      ${
        res.CompHooks.indexOf('componentWillUnmount') > -1
          ? componentWillUnmount
          : ''
      }
      render(){
        return (
          <React.Fragment>
            <p> ${name} works !</p>
          </React.Fragment>
        )
      }
    }
    
    export default ${name};
    `;

    let ef = prettier.format(template, { singleQuote: true, printWidth: 80 });
    return ef;
  },
  StateLess: function(name) {
    return prettier.format(
      `
    import React from 'React';

    const ${name} = () => (
      <React.Fragment>
        <p> ${name} works !</p>
      </React.Fragment>
    )

    export default ${name};
    `,
      { singleQuote: true, printWidth: 80 }
    );
  },
};
