// import React from 'react'
// import { Component } from 'react'
// import ReactDOM from "react-dom"

import "./index.css";

import React from "./zreact";
import ReactDOM from "./zreact/react-dom";
import Component from "./zreact/Component";

class ClassComponent extends Component {
  static defaultProps = {
    color: {
      aaa: 11,
    },
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
  <div className="border" >
    <p>
      <span>saas</span>
      <p>hello world</p>
      <p>12</p>
      <FunctionComponent name="function组件"></FunctionComponent>
      <ClassComponent></ClassComponent>
    </p>
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
