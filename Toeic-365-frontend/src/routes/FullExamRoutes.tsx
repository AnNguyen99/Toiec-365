import React from "react"
import { Route, Switch } from "react-router-dom"
import { Path } from "../constants/path";
import FullExam from "../pages/user/TestOnline/fulltest/exam/2020/FullExam";

export default function FullExamRoutes() {
    return (
        <Switch>
            <Route
                exact={true}
                path={Path.FullExam}
                component={() => (<FullExam />)}
            />
        </Switch>
    )
}