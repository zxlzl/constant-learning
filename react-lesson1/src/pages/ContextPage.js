import React, { Component } from 'react'
import UseContextPage from "./UseContextPage";
import ConsumerPage from "./ConsumerPage";
import ContextTypePage from "./ContextTypePage"
import { ThemeContext, UserContext } from "../Context";

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "xiaoming"
      }
    };
  }

  changeColor = () => {
    const { themeColor } = this.state.theme
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    })

  }
  render() {
    const { theme, user } = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
        <ThemeContext.Provider value={theme}>
          <UserContext.Provider value={user}>
            <ContextTypePage />
            <UseContextPage />
            <ConsumerPage />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}
