import React from 'React';
import { connect } from 'react-redux';

@connect(
  store => ({
    storedata: store
  }),
  {
    // actions here
  }
)
class StateFullComponent extends React.Component {
  state = {};

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <p> StateFullComponent works !</p>
      </React.Fragment>
    );
  }
}

export default StateFullComponent;
