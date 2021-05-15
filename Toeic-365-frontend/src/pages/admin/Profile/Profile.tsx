import React, {useEffect, useRef, useState} from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import './bootstrap.min.scoped.css';
import "./Profile.scoped.css";

import * as AccountApi from "../../../apis/AccountApi";

import avatar from "./avatar_admin.png";

function Profile() {
    let initialProfile = {
        id: null,
        fullName: '',
        password: '',
        confirmPassword: ''
    }
    const toast = useRef(null);
    const [profile, setProfile]: any = useState(null);
    const [changeProfile, setChangeProfile] = useState(initialProfile);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        AccountApi.getCurrentUser().then((res) => {
            setProfile(res.data);
            console.log(res.data);
        })
    }, [])

    const handleInput = (e: any, name: string) => {
        setChangeProfile({...changeProfile, [`${name}`]: e.target.value})
    }

    const {fullName, password, confirmPassword} = changeProfile

    const handleUpdateProfile = (e: any) => {
        e.preventDefault();

        setSubmitted(true);
        let id = profile.id;
        if (id && fullName.trim() && password.trim() && confirmPassword.trim()) {
            if (password === confirmPassword) {
                AccountApi.updateUser({id, fullName, password}).then(() => {

                    // @ts-ignore
                    toast.current.show({ severity: "success", summary: "Successful", detail: "Account Updated", life: 3000 });
                }).catch(error => {
                    // @ts-ignore
                    toast.current.show({ severity: "error", summary: "Error", detail: "Account Updated Error", life: 3000 });
                })
            } else {
                // @ts-ignore
                toast.current.show({ severity: 'info', summary: 'Info', detail: 'Password No Match'});
            }
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`${avatar}`} alt="avatar.png" className="rounded-circle" width={150} />
                                        <div className="mt-3">
                                            <h4>{profile ? profile.fullName : <></>}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <InputText onChange={e => handleInput(e, "fullName")} placeholder={profile ? profile.fullName : null} /> <br/>
                                            {submitted && !changeProfile.fullName && <small className="p-invalid" style={{color: '#f44336'}}>fullName is required.</small>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary"><InputText disabled={true} placeholder={profile ? profile.email : null} /></div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Roles</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{profile && profile.roles.length ? profile.roles.map((role: string) => {
                                            return (
                                                <>
                                                    {role}
                                                </>
                                            )
                                        }) : <></>}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Password</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <Password onChange={e => handleInput(e, "password")} toggleMask /> <br/>
                                            {submitted && !changeProfile.password && <small className="p-invalid" style={{color: '#f44336'}}>password is required.</small>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Confirm Password</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <Password onChange={e => handleInput(e, "confirmPassword")} toggleMask /> <br/>
                                            {submitted && !changeProfile.confirmPassword && <small className="p-invalid" style={{color: '#f44336'}}>confirmPassword is required.</small>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button label="Update" onClick={e => handleUpdateProfile(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
