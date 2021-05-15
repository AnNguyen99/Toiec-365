import React from "react"
import { BrowserRouter } from "react-router-dom"
import DefaultAdminRoutes from "./DefaultAdminRoutes";
import AppRoutes from "./AppRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from "./RegisterRoutes";
import ExamIntroRoutes from "./ExamIntroRoutes";
import FullExamRoutes from "./FullExamRoutes";
import TestOnlineRoutes from "./TestOnlineRoutes";

export default function Routes() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <LoginRoutes />
            <RegisterRoutes />
            <TestOnlineRoutes />
            <ExamIntroRoutes />
            <FullExamRoutes />
            <DefaultAdminRoutes />
        </BrowserRouter>
    )
}