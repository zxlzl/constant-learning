// import React from 'react'
// import { Component } from 'react'
// import ReactDOM from "react-dom"

import React from "./zreact";
import ReactDOM from "./zreact/react-dom";
import Component from "./zreact/Component";

class ClassComponent extends Component {
  static defaultProps = {
    color: "red",
  };
  render() {
    return <div className="border">i m class</div>;
  }
}

function FunctionComponent({ name }) {
  return (
    <div className="border">
      {name}
      <button onClick={() => console.log("omg")}>btn</button>
    </div>
  );
}

const jsx = (
  <div>
    <p>
      <span>saas</span>
    </p>
    <p>hello world</p>
    <p>12</p>

    <FunctionComponent name="function组件"></FunctionComponent>

    <ClassComponent></ClassComponent>

    <>
      <li>fragment1</li>
      <li>fragment2</li>
    </>

    {[1, 2, 3].map((item) => (
      <div key={item}>
        {item}
        <h6>文本{item}</h6>
      </div>
    ))}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
