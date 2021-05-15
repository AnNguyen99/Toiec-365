import React from "react"
import { Switch} from "react-router-dom"
import { Path } from "../constants/path";
import { DefaultAdmin } from "../pages/admin/DefaultAdmin/DefaultAdmin";
import AdminRoute from "../guards/AdminRoute";

export default function DefaultAdminRoutes() {
    return (
        <Switch>
            <AdminRoute
                path={Path.Admin}
                component={() => (<DefaultAdmin />)}
            />
        </Switch>
    )
}