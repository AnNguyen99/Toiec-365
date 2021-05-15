import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import TestOnline from "../pages/user/TestOnline/TestOnline";
import PrivateRoute from "../guards/PrivateRoute";

export default function LoginRoutes() {
    return (
        <Switch>
            <PrivateRoute
                exact={true}
                path={Path.TestOnline}
                component={() => (<TestOnline />)}
            />
        </Switch>
    )
}