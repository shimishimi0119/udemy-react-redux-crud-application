// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function App() {
  const profiles = [
    { name: 'taro', age: 12 },
    { name: 'jiro', age: 10 }
  ];
  return (
    <div>
      {profiles.map((e, index) => {
        return <User name={e.name} age={e.age} key={index} />;
      })}
    </div>
  );
}
function User(props) {
  return (
    <div>
      <p>ニャー,I am 「{props.name}」だニャー</p>
      <p>{props.age} 才だニャー</p>
      <p>テストは「{props.test}」点だニャー</p>
    </div>
  );
}

User.defaultProps = {
  test: 100
};

User.propTypes = {
  name: PropTypes.string
};

// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <label htmlFor="bar">bar</label>
//         <input type="text"></input>
//         <button>button!!</button>
//       </React.Fragment>
//     );
//   }
// }

export default App;
