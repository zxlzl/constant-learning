import React, { Component,PureComponent } from 'react'

export default class PureComponentPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      // obj: {num: 0}
    }
  }

  setCount = () => {
    this.setState({
      count: 100,
      // obi: {num:1000}
    })
  }

  // shouldComponentUpdate(nextProps,nextStates){
  //   return nextStates.count !== this.state.count
  // }

  render() {
    console.log("render");
    
    const { count } = this.state
    return (
      <div>
        <h3>PureComponent</h3>
        <button onClick={this.setCount}>{count}</button>
      </div>
    )
  }
}
