import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import * as ExamApi from "../../../apis/ExamApi";

import "./library/bootstrap.min.scoped.css";
import "./library/bootstrap";
import "./TestOnline.scoped.css";

import NavbarComponent from "../../../components/user/home/navbar.component";

function TestOnline() {

    const [exam, setExam]: any = useState([]);
    const getAllExam = async () => {
        try {
            const response = await ExamApi.getAllExam();

            setExam(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllExam();
    }, [])

    return (
        <>
            <NavbarComponent/>

            <div className="container layout-main">
                <div className="row page-title">
                    <div className="col-sm-12">
                        <h2 className="home-t">Free TOEIC <br/> Practice Tests</h2>
                    </div>
                </div>
                <div className="section-toeic-test mt-5">
                    <div className="row">
                        <div className="testfullwrap">
                            <div className="testfullwrapinner testfullwrap_one">
                                <span className="testfullonetwo testfull-one">TEST FULL</span>
                                <span className="testfullonetwo testfull-two">LISTEN + READING</span>
                            </div>
                            <div className="testfullwrapinner testfullwrap_two">
                                <span className="testfullonetwo testfull-one">KIỂM TRA ĐẦY ĐỦ</span>
                                <span className="testfullonetwo testfull-two">NGHE + ĐỌC</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        {exam && exam.length ?
                            exam.map((element: any, index: number) => {
                                return (
                                    <>
                                        <div className="col-sm-3" key={element.id}>
                                            <div className="toeic-item toeic-item-1">
                                                <Link to={`toeictest/introtest/2021/${element.id}`}
                                                      className="link-wrap">
                                                    <div className="image image-center">
                                                        <img
                                                            src="https://toeicexamstore.com/website/assets/img/bg_thi_toeic.png"
                                                            alt=""/>
                                                        <div className="centered">0{index + 1}</div>
                                                    </div>
                                                    <div className="content">
                                                        <h3 className="item-title">
                                                            {element.examName}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            : <></>
                        }

                    </div>
                </div>
            </div>
            <footer className="text-center text-white footer">
                <div className="container p-4">
                    <section className="mb-4">
                        <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"><i className="pi pi-facebook"/></Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"><i className="pi pi-twitter" /></Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"><i className="pi pi-google"/></Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"><i className="pi pi-github" /></Link>
                    </section>
                    <section>
                        <form>
                            <div className="row d-flex justify-content-center">
                                <div className="col-auto">
                                    <p className="pt-2">
                                        <strong>Email hỗ trợ</strong>
                                    </p>
                                </div>
                                <div className="col-md-5 col-12">
                                    <div className="form-outline form-white mb-4">
                                        <input type="email" id="form5Example2" placeholder="toeic365@gmail.com" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-outline-light mb-4">
                                        Gửi
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © 2021 Copyright:
                    <Link className="text-white" to="#"> Toeic365.com</Link>
                </div>
            </footer>
        </>
    );
}

export default TestOnline;