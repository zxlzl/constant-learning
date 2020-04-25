import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default connect(({ user }) => {
  // console.log(user);
  return { isLogin: user.isLogin };
})(function PrivateRoute({ isLogin, component: Component, ...rest }) {
  console.log();
  return (
    <Route
      {...rest}
      render={(props) =>
      //   {
      //   console.log(props);
      // }
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirect: props.location.pathname },
            }}
          />
        )
      }
    />
  );
});
