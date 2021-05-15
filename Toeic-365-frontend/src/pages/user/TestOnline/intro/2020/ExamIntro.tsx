import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";

import * as ExamApi from "../../../../../apis/ExamApi";

import "./css/bootstrap-3.min.scoped.css";
import "./css/IntroExam.scoped.css";
import "./css/IntroExamCustom.scoped.css";
import * as swal from "sweetalert";

function ExamIntro() {
    let history = useHistory();

    const [exam, setExam]: any = useState(null);
    let params: any = useParams();
    const id = params.id;

    const getIntroExamById = async () => {
        try {
            const response = await ExamApi.getIntroExamById({id});

            setExam(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getIntroExamById();
    },[]);

    const handleStartExam = (e: any) => {
        e.preventDefault();

        // @ts-ignore
        swal({
            title: "Start!",
            text: "Are you ready?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willExit: any) => {
            if (willExit) {
                history.push(`../../../toeictest/fulltest/2021/${exam.id}`);
            }
        });
    }

    return (
        <>
            <div className="top-nav">
                <div className="container">
                    <div className="row test-page">
                        <h4 className="sm black bold part-tile">
                            <Link to="#" className="logo-h"><img
                                src="https://toeicexamstore.com/websites/images/toeiclogo.png"
                                alt="toiec365.com"/></Link>
                            <Link to="#" className="logo-h"><b>toeic365</b></Link>
                        </h4>
                        <ul className="top-nav-list float-md-right">
                            <li className="backpage header-b exit">
                                <Link className="exit-exam" to="../../../toeictest">
                                    <svg width="20px" height="20px" viewBox="0 0 16 16"
                                         className="bi bi-caret-right-fill" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                    <b>Test List</b>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section id="quizz-intro-section" className="quizz-intro-section learn-section"
                     style={{minHeight: '650px'}}>
                <div className="container">
                    <div className="question-content-wrap">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 exam-content">
                                <div className="question-content intro-content"
                                     style={{height: 'auto !important', minHeight: '0px !important'}}>
                                    <div className="exam-info" style={{height: 'auto !important'}}>
                                        <h4 className="sm">
                                            {exam ? <b>{exam.examName}</b> : <></>}
                                        </h4>
                                        <br/>
                                        <p className="total-time-info"><b>Total time: 120 minutes</b></p>
                                        <p>
                                            <svg width="13px" height="13px" viewBox="0 0 16 16"
                                                 className="bi bi-circle-fill" fill="#3ABF7C"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx={8} cy={8} r={8}/>
                                            </svg>
                                            <b>Listening: 45 minutes</b>
                                        </p>
                                        <p>
                                            <svg width="13px" height="13px" viewBox="0 0 16 16"
                                                 className="bi bi-circle-fill" fill="#3ABF7C"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx={8} cy={8} r={8}/>
                                            </svg>
                                            <b>Reading: 75 minutes</b>
                                        </p>
                                    </div>
                                    <div className="text-center btn-start">
                                        {exam ? <Link to="#" onClick={handleStartExam} className="btn-start mc-btn btn-style-6"><b>START</b></Link> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExamIntro;
