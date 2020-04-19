
import React, { Component } from "react";
export default class SetStatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }


  componentDidMount() {
    // document.getElementById('button').addEventListener('click',this.setCounter)
    // document.body.addEventListener('click', ()=>this.changeValue(1), false)
  }
  changeValue = v => {
    this.setState(state =>
      ({ counter: state.counter + v })
    );
    console.log("counter", this.state.counter);
  };

  setCounter = () => {
    // setTimeout(() => {
    // }, 0);
    this.changeValue(1);
    this.changeValue(2);
    this.changeValue(3);
    // console.log("counter", this.state.counter);
  };
  render() {
    const { counter } = this.state;
    return (
      <div>
        <h3>SetStatePage</h3>
        <button onClick={this.setCounter} id="button">{counter}</button>
        <button id="button">原生事件{counter}</button>
      </div>
    );
  }
}