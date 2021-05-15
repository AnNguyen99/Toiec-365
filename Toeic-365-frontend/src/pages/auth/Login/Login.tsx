import React, {useRef} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {isAuth} from "../../../hepers/Authentication";
import * as AuthApi from "../../../apis/AuthApi";
import * as Auth from "../../../hepers/Authentication";
import { Input } from 'antd';
import "./library/bootstrap.min.scoped.css";
import "./Login.scoped.css";
import LoginBGR from "./assets/login.svg";
import Logo from "./assets/logo_toeic365.png";
import {Toast} from "primereact/toast";

interface IAccount {
    email: string,
    password: string,
}

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().min(6).required(),
});

function Login() {

    const history = useHistory();
    const  toast = useRef(null);

    const { register, handleSubmit, formState: { errors } } = useForm<IAccount>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (account: IAccount) => {
        AuthApi.Login(account).then((res) => {
            Auth.saveUserAndToken(res);
            Auth.isAuth() && Auth.isAuth().roles.includes("ROLE_ADMIN")
                ? history.push('/admin') : history.push('/');
        }).catch((error) => {
            // @ts-ignore
            toast.current.show({ severity: "error", summary: "Error", detail: "Account or password is incorrect", life: 3000 });
            console.log(error);
        })
    }

    return (
        <>
            <Toast ref={toast} />
            {isAuth() ? <Redirect to='/'/> : null}
            <div id="app" className="h-100">
                <div className="auth-wrapper auth-v1">
                    <div className="row auth-inner m-0">
                        <div className="col-md-8 auth-left auth-bg d-none d-lg-flex align-items-center p-5 col-lg-8">
                            <div className="brand-logo d-lg-flex">
                                <Link to="">
                                    <img src={`${Logo}`} alt={"logo"} style={{width: '40px', height: '40px'}} />
                                </Link>
                                <h2 className="brand-text ml-1"> Toeic365 </h2>
                            </div>
                            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                                <img
                                    src={`${LoginBGR}`} alt={"loginBGR"}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 auth-form">
                            <h2 className="card-title font-weight-bold mb-1"> Welcome to Toeic365! 👋 </h2>
                            <p className="card-text mb-2"> Please sign-in to your account and start the adventure </p>
                            <form action="" onSubmit={handleSubmit(onSubmit)} className="auth-login-form mt-4">
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <Input  tabIndex={1} {...register("email")} type="email" placeholder="angela@example.com" />
                                    <small className="p-invalid">{errors.email?.message}</small>
                                </div>
                                <fieldset className="form-group">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <span>
                                        <span className="input-group input-group-merge">
                                            <Input.Password {...register("password")} className="custom-password" style={{borderRadius: '.357rem', padding: '.438rem 1rem', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid #d8d6de'}} tabIndex={2} placeholder="*********" />
                                            <small className="p-invalid">{errors.password?.message}</small>
                                        </span>
                                    </span>
                                </fieldset>
                                <button type="submit" tabIndex={4} className="btn btn-primary btn-block"> Sign in</button>
                            </form>
                            <p className="card-text text-center mt-4">
                                <span>New on our platform?</span>
                                <Link to="./register" className="" target="_self"><span> Create an account</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;