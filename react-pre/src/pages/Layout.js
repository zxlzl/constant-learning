import React, { Component } from 'react'
import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar";

export default class Layout extends Component {
  componentDidMount(){
    const {title="商城"} = this.props
    document.title = title
  }
  render() {
    const {children,showBottomBat,showTopBar} = this.props
    console.log('children',children);
    return (
      <div>
        {showTopBar &&<TopBar />}
        {children.content}
        {children.text}
        <button onClick={children.btnclick}>sdaad</button>
        {showBottomBat&&<BottomBar />}
      </div>
    )
  }
}

