import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames";
import {Route} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import {AdminHeader} from "../../../components/admin/AdminHeader/AdminHeader";
import {AdminFooter} from "../../../components/admin/AdminFooter/AdminFooter";
import {AdminMenu} from "../../../components/admin/AdminMenu/AdminMenu";
import {AdminProfile} from "../../../components/admin/AdminProfile/AdminProfile";

import {DashBoard} from "../Dashboard/DashBoard";
import {Exam} from "../Exam/Exam";
import {Part} from "../Part/Part";
import {GroupQuestion} from "../GroupQuestion/GroupQuesiton";
import Question from "../Question/Question";
import {Account} from "../Account/Account";
import Profile from "../Profile/Profile";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import "../../../assets/scss/admin/layout.scss";
import "../../../assets/scss/admin/DefaultAdmin.scss";
import "../../../assets/scss/admin/defaultAdminCustom.scoped.css";

import Logo from "./assets/logo_toeic365.png";

export const DefaultAdmin = () => {

    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("dark");
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(false);

    const sidebar = useRef<HTMLInputElement>(null);
    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);


    const onWrapperClick = () => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    };

    const onToggleMenu = (event: any) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                setOverlayMenuActive((prevState) => !prevState);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMenuItemClick = (event: any) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };

    const menu = [
        {label: "Dashboard", icon: "pi pi-fw pi-home", to: "/admin"},
        {label: "Quản Lý Đề Thi", icon: "pi pi-fw pi-book", to: "/admin/exam"},
        {label: "Quản Lý Phần Thi", icon: "pi pi-fw pi-list", to: "/admin/part"},
        {label: "Quản Lý Nhóm Câu Hỏi", icon: "pi pi-fw pi-question-circle", to: "/admin/group-question"},
        {label: "Quản Lý Câu Hỏi", icon: "pi pi-fw pi-question-circle", to: "/admin/question"},
        {label: "Quản Lý Tài Khoản", icon: "pi pi-fw pi-user", to: "/admin/account"}
    ];

    const addClass = (element: any, className: any) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element: any, className: any) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === "static") return !staticMenuInactive;
            else if (layoutMode === "overlay") return overlayMenuActive;
            else return true;
        }

        return true;
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": !ripple,
    });

    const sidebarClassName = classNames("layout-sidebar", {
        "layout-sidebar-dark": layoutColorMode === "dark",
        "layout-sidebar-light": layoutColorMode === "light",
    });

    return (
        <>
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AdminHeader onToggleMenu={onToggleMenu}/>

                <CSSTransition classNames="layout-sidebar" timeout={{enter: 200, exit: 200}} in={isSidebarVisible()} unmountOnExit>
                    <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo">
                            <img alt="Logo.png" src={`${Logo}`} width="32px" height="32px" />
                            <span style={{color: '#fff', marginLeft: '10px', fontWeight: 'bold'}}>Toeic365</span>
                        </div>
                        <AdminProfile/>
                        <AdminMenu model={menu} onMenuItemClick={onMenuItemClick}/>
                    </div>
                </CSSTransition>

                <div className="layout-main">
                    <Route path="/admin" exact component={DashBoard}/>
                    <Route path="/admin/exam" exact component={Exam}/>
                    <Route path="/admin/part" exact component={Part}/>
                    <Route path="/admin/group-question" exact component={GroupQuestion}/>
                    <Route path="/admin/question" exact component={Question}/>
                    <Route path="/admin/account" exact component={Account}/>
                    <Route path="/admin/me" exact component={Profile}/>
                </div>

                <AdminFooter/>
            </div>
        </>
    );
};
