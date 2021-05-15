import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import App from "../app/App";

export default function DefaultAdminRoutes() {
    return (
        <Switch>
            <Route
                exact={true}
                path={Path.Home}
                component={() => (<App />)}
            />
        </Switch>
    )
}