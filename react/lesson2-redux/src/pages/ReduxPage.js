import React, { Component } from "react";
import store from "../store/";


export default class ReduxPage extends Component {
  test = () => {
    const arr = [1, 2, 3, 5];
    let sum = arr.reduce((value, item) => {
      return value + item;
    });
    // console.log(sum);

    function f1(arg1) {
      console.log("f1", arg1);
      return arg1;
    }
    function f2(arg2) {
      console.log("f2", arg2);
      return arg2;
    }
    function f3(arg3) {
      console.log("f3", arg3);
      return arg3;
    }
    function compose(...funcs) {
      return funcs.reduce((a, b) => (...args) => a(b(...args)));
    }
    let res = compose(f1, f2, f3)("img");
  };

  componentDidMount() {
    store.subscribe(()=>{
      this.forceUpdate()
    })
  }

  add = () => {
    store.dispatch({type: 'ADD', payload:1})
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
      </div>
    );
  }
}
