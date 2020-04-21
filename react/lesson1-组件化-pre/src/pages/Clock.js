import React, { Component } from 'react'

export default class componentName extends Component {
  constructor(prop){
    super(prop)
    this.state={
      date: new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000);
  }
  render() {
    const {date} = this.state
    return (
      <div>
        <h3>class clock</h3>
        <p>{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
