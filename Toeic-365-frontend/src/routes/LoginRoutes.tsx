import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import Login from "../pages/auth/Login/Login";

export default function LoginRoutes() {
    return (
        <Switch>
            <Route
                exact={true}
                path={Path.Login}
                component={() => (<Login />)}
            />
        </Switch>
    )
}