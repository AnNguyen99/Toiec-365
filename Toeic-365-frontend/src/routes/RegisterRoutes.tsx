import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import Register from "../pages/auth/Register/Register";

export default function RegisterRoutes() {
    return (
        <Switch>
            <Route
                exact={true}
                path={Path.Register}
                component={() => (<Register />)}
            />
        </Switch>
    )
}