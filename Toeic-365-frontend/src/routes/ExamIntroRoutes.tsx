import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import ExamIntro from "../pages/user/TestOnline/intro/2020/ExamIntro";

export default function ExamIntroRoutes() {
    return (
        <Switch>
            <Route
                exact={true}
                path={Path.ExamIntro}
                component={() => (<ExamIntro />)}
            />
        </Switch>
    )
}