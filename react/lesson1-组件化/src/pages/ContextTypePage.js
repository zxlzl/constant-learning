import React, {Component} from "react";
import {ThemeContext} from "../Context";

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;
  render(){
    const {themeColor} = this.context || {}
    return (
      <div>
        <h3 className={themeColor}>ContextTypePage</h3>
        <Child></Child>
      </div>
    )
  }
}

export function Child(props){
  // const themeColor = useContext(ThemeContext)
  console.log("themeContext----", ThemeContext);
  return <div className="border">-------Child</div>;
}