import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";

import "./bootstrap.min.scoped.css";
import 'bootstrap/dist/js/bootstrap.js';
import "./navbar.scoped.css";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import * as AccountApi from "../../../apis/AccountApi";
import * as Auth from '../../../hepers/Authentication';
import { Avatar } from 'primereact/components/avatar/Avatar';

function NavbarComponent() {

    let history = useHistory();
    const [user, setUser]: any = useState(null);

    const getCurrentUser = async () => {
        try {
            const response = await AccountApi.getCurrentUser();
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [])

    const handleLogout = (e: any) => {
        setUser(null);
        Auth.logout();
        history.push("/");
    }

    return (
        <div className="header_area">
            <div className="container">
                <div className="main-menu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand" to="#">
                            <img src="https://toeicexamstore.com/websites/images/toeiclogo.png"
                                 style={{width: "40px", height: "40px"}}
                                 alt="logo"
                            />
                            <b className="ml-3">TOEIC365</b>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="mr-auto"/>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link online-link" to="./toeictest">test online</Link>
                                </li>
                                {user ? <>
                                    <li className="nav-item dropdown d-flex">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <Avatar icon="pi pi-user" className="p-mr-2" style={{ backgroundColor: '#9c27b0', color: '#ffffff', marginTop: '-5px' }} shape="circle" />
                                            {user.fullName}
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {user.roles[0] === 'ROLE_ADMIN' ? <Link className="dropdown-item" to="./admin"><i className="bi bi-person"/> Admin</Link> : <></>}
                                            <a onClick={handleLogout} className="dropdown-item" href="/"><i className="bi bi-box-arrow-right" /> Sign Out</a>
                                        </div>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link className="btn-danger btn Ripple-parent" id="btn-sign-in" to="./login">sign in</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn-sign-up btn btn-outline-danger" to="./register">sign up</Link>
                                    </li>
                                </>}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NavbarComponent;
