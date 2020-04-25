import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import PrivateRoute from "./pages/PrivateRoute";

// 1、保护UserPage，如果没有登陆，跳转登陆页，登陆后跳转回UserPage
// 2、没有登陆，直接进入登陆页，登陆完成进入首页
// 3、如果已登陆，进入LoginPage的话自动跳转到首页
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/login">登陆</Link>
        <Link to="/user">用户中心</Link>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />

          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
