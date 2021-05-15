import React, { Component } from "react";
import {Redirect, Route } from "react-router-dom";
import {isAuth} from "../hepers/Authentication";

const AdminRoute = ({component: Component, ...rest}: any) => {
    return(
      <Route
          {...rest}
          render={(props) =>
              isAuth() && isAuth().roles.includes("ROLE_ADMIN") ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                          pathname: "/login",
                          state: { from: props.location },
                      }}
                  />
              )
          }
      />
    );
}

export default AdminRoute;