import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const App = () => {
  return <Counter></Counter>;
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  handlePlusButton = () => {
    console.log('handlePlusButton!!');
    this.setState({ count: this.state.count + 1 });
  };
  handleMinusButton = () => {
    console.log('handleMinusButton!!');
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <React.Fragment>
        <div>count : {this.state.count}</div>
        <button onClick={this.handlePlusButton}>+1</button>
        <button onClick={this.handleMinusButton}>-1</button>
      </React.Fragment>
    );
  }
}

export default App;
