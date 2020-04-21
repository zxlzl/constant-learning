import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">首页</Link>

          <Link to="/user">用户中心</Link>

          <Switch>
            <Route exact path="/"
              // children={() => <div>children</div>}
              // component={HomePage}
              render={() => <div>render</div>}
            />
            <Route path="/user" component={UserPage} />
            <Route component={EmtPage}></Route>
          </Switch>

        </Router>
      </div>
    )
  }
}


class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    )
  }
}


class UserPage extends Component {
  render() {
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    )
  }
}

class EmtPage extends Component {
  render() {
    return (
      <div>
        <h3>EmtPage-404</h3>
      </div>
    )
  }
}




