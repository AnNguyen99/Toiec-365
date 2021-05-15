import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Avatar } from 'primereact/avatar';

import * as Auth from '../../../hepers/Authentication';
import * as AccountApi from "../../../apis/AccountApi";

import avatar from "./assets/avatar_admin.png";

export const AdminProfile = () => {

    const history = useHistory();

    const [expanded, setExpanded] = useState(false);
    const [user, setUser]: any = useState(null);

    const getCurrentUser = async () => {
        try {
            const response = await AccountApi.getCurrentUser();
            if (response) setUser(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [])

    const onClick = (event: any) => {
        setExpanded(prevState => !prevState);
        event.preventDefault();
    }

    const me = () => {
        history.push('/admin/me');
    }

    const handleLogout = () => {
        Auth.logout();
        setUser(null);
        history.push('/');
    }

    return (
        <div className="layout-profile">
            <div>
                <Avatar image={`${avatar}`} imageAlt="avatar.png" className="p-mr-2" size="large" shape="circle" />
            </div>
            <button className="p-link layout-profile-link" onClick={onClick}>
                <span className="username">{user ? user.fullName : <></>}</span>
                <i className="pi pi-fw pi-cog" />
            </button>
            <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={expanded} unmountOnExit>
                <ul className={classNames({ 'layout-profile-expanded': expanded })}>
                    <li><button type="button" onClick={me} className="p-link"><i className="pi pi-fw pi-user" /><span>Account</span></button></li>
                    <li><button type="button" className="p-link"><i className="pi pi-fw pi-inbox" /><span>Notifications</span></button></li>
                    <li><button type="button" className="p-link" onClick={handleLogout} ><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </CSSTransition>
        </div>
    );

}
