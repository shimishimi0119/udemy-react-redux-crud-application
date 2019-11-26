import React, { Component } from 'react';

function App() {
  const profiles = [
    { name: 'taro', age: 12 },
    { name: 'taro', age: 12 },
    { name: 'taro', age: 12 },
    { name: 'taro', age: 12 },
    { name: 'taro', age: 12 },
    { name: 'taro', age: 12 },
    { name: 'jiro', age: 10 }
  ];
  return (
    <div>
      {profiles.map((e, index) => {
        return <User name={e.name} age={e.age} />;
      })}
    </div>
  );
}
function User(props) {
  return (
    <div>
      <p>
        <div>ニャー,I am 「{props.name}」だニャー</div>
        <div>{props.age} 才だニャー</div>
        <div>テストは「{props.test}」点だニャー</div>
      </p>
    </div>
  );
}
User.defaultProps = {
  test: 100
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
