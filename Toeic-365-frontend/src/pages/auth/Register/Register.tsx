import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import * as AuthApi from '../../../apis/AuthApi';
import { Toast } from "primereact/toast";
import {Input} from "antd";

import "./library/bootstrap.min.scoped.css";
import "./Register.scoped.css";

import RegisterBGR from "./assets/register.svg";
import Logo from "./assets/logo_toeic365.png";

interface IAccount {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const schema = yup.object().shape({
    fullName: yup.string().min(6).required(),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().min(6).required()
});

function Register() {

    const  toast = useRef(null);

    const { register, handleSubmit, formState: { errors } } = useForm<IAccount>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (Account: IAccount) => {
        if (Account.password === Account.confirmPassword) {
            AuthApi.Register(Account).then((res) => {
                // @ts-ignore
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Register success'});
            }).catch(error => {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Email already exists'});
                console.log(error);
            })
        } else {
            // @ts-ignore
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Password No Match'});
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div id="app" className="h-100">
                <div className="auth-wrapper auth-v1">
                    <div className="row auth-inner m-0">
                        <div className="col-md-8 auth-left auth-bg d-none d-lg-flex align-items-center p-5 col-lg-8">
                            <div className="brand-logo d-lg-flex">
                                <Link to="">
                                    <img src={`${Logo}`} alt="logo.png" style={{width: '40px', height: '40px'}} />
                                </Link>
                                <h2 className="brand-text ml-1"> Toeic365 </h2>
                            </div>
                            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                                <img
                                    src={`${RegisterBGR}`} alt="registerBGR.svg"
                                />
                            </div>
                        </div>
                        <div className="col-md-4 auth-form">
                            <h2 className="card-title font-weight-bold mb-1">Adventure starts here 🚀</h2>
                            <p className="card-text mb-2">Make your app management easy and fun!</p>
                            <form onSubmit={handleSubmit(onSubmit)} action="" className="auth-login-form mt-4">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <Input tabIndex={1} {...register("fullName")} placeholder="Angela" />
                                    <small className="p-invalid">{errors.fullName?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <Input tabIndex={2} {...register("email")} type="email" placeholder="angela@example.com" />
                                    <small className="p-invalid">{errors.email?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input.Password {...register("password")} className="form-input" style={{borderRadius: '.357rem', padding: '.438rem 1rem', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid #d8d6de'}} tabIndex={3} placeholder="*********" />
                                    <small className="p-invalid">{errors.password?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Input.Password tabIndex={4} style={{borderRadius: '.357rem', padding: '.438rem 1rem', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid #d8d6de'}} {...register("confirmPassword")}  placeholder="*********" />
                                    <small className="p-invalid">{errors.confirmPassword?.message}</small>
                                </div>
                                <button type="submit" tabIndex={6} className="btn btn-primary btn-block"> Sign up</button>
                            </form>
                            <p className="card-text text-center mt-4">
                                <span>Already have an account?</span>
                                <Link to="./login" className="" target="_self"><span> Sign in instead</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

