import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';

import "./css/bootstrap-3.min.scoped.css";
import "./css/exam.scoped.css";
import "./css/exam_custom.scoped.css";
import 'jquery-countdown/dist/jquery.countdown.min';
import $ from 'jquery';
import * as swal from 'sweetalert';
import {Radio} from 'antd';

import {baseUrl} from "../../../../../../apis/BaseApi";
import * as examApi from "../../../../../../apis/ExamApi";
import {Dialog} from 'primereact/dialog';
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/core";
import * as AccountApi from "../../../../../../apis/AccountApi";
import moment from "moment";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #42BF80;
  position: absolute;
  top: 250px;
  left: 50%;
  z-index: 9999;
`

function FullExam() {

    let params: any = useParams();
    let history = useHistory();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser]: any = useState(null);
    const [exam, setExam]: any = useState(null);
    const [userAnswerChoose, setUserAnswerChoose]: any = useState({});
    const [correctAnswerSubmit, setCorrectAnswerSubmit]: any = useState([]);
    const [isSubmit, SetIsSubmit]: any = useState(false);
    const [isShowResult, setIsShowResult] = useState(false);

    const [scoreListening, setScoreListening]: any = useState(0);
    const [scoreReading, setScoreReading]: any = useState(0);
    const [pointListening, setPointListening]: any = useState(0);
    const [pointReading, setPointReading]: any = useState(0);
    const [scorePartOne, setScorePartOne]: any = useState(0);
    const [scorePartTwo, setScorePartTwo]: any = useState(0);
    const [scorePartThree, setScorePartThree]: any = useState(0);
    const [scorePartFour, setScorePartFour]: any = useState(0);
    const [scorePartFive, setScorePartFive]: any = useState(0);
    const [scorePartSix, setScorePartSix]: any = useState(0);
    const [scorePartSeven, setScorePartSeven]: any = useState(0);

    const handleUserAnswerChoose = (index: number, e: any) => {
        setUserAnswerChoose({...userAnswerChoose, [("question_" + (index))]: e.target.value});
    }

    useEffect(() => {
        let userAnswers = {};
        for (let i = 1; i < 101; i++) {
            (userAnswers as any)["question_" + i] = "";
        }
        setUserAnswerChoose(userAnswers);
    }, [])

    const checkPoint1 = (userAnswers: any, answerCorrects: any) => {
        /*let point = 0;
        for (let i = 1; i <= Object.keys(userAnswers).length; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                point += 9.9;
            }
        }
        return point;*/

        let PartOne = 0;
        for (let i = 1; i < 4; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartOne += 1;
            }
        }

        return PartOne;
    }

    const checkPoint2 = (userAnswers: any, answerCorrects: any) => {
        let PartTwo = 0;
        for (let i = 4; i < 16; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartTwo += 1;
            }
        }

        return PartTwo;
    }

    const checkPoint3 = (userAnswers: any, answerCorrects: any) => {
        let PartThree = 0;
        for (let i = 16; i < 36; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartThree += 1;
            }
        }

        return PartThree;
    }

    const checkPoint4 = (userAnswers: any, answerCorrects: any) => {
        let PartFour = 0;
        for (let i = 36; i < 51; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartFour += 1;
            }
        }

        return PartFour;
    }

    const checkPoint5 = (userAnswers: any, answerCorrects: any) => {
        let PartFive = 0;
        for (let i = 51; i < 81; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartFive += 1;
            }
        }

        return PartFive;
    }

    const checkPoint6 = (userAnswers: any, answerCorrects: any) => {
        let PartSix = 0;
        for (let i = 81; i < 87; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartSix += 1;
            }
        }

        return PartSix;
    }

    const checkPoint7 = (userAnswers: any, answerCorrects: any) => {
        let PartSeven = 0;
        for (let i = 87; i < 101; i++) {
            const valueChoice = userAnswers["question_" + i];
            if (valueChoice === answerCorrects[i - 1]) {
                PartSeven += 1;
            }
        }

        return PartSeven;
    }

    const getExamById = async () => {
        try {
            const response = await examApi.getExamById({id});
            setExam(response.data);
            setIsLoading(false);

            let timeDB = moment(response.data.totalTime).format('HH:mm:ss');
            let timeFormat = timeDB.split(':');

            let hours = 0;
            hours = (parseInt(timeFormat[0]) * 3600000);
            let minute = 0;
            minute = (parseInt(timeFormat[1]) * 60000);
            let seconds = 0;
            seconds = (parseInt(timeFormat[2]) * 1000);
            let timeOut = seconds + minute + hours;
            /*let timeOut = 7200000;*/

            //x??? l?? time
            if (!isSubmit) {
                if (typeof timeOut !== 'undefined') {
                    let fiveSeconds = new Date().getTime() + timeOut;
                    // @ts-ignore
                    $('.countdown').countdown(fiveSeconds)
                        .on('update.countdown', function (event: any) {
                            // @ts-ignore
                            let $this = $(this);
                            $this.html(event.strftime('%H:%M:%S'));
                        })
                        .on('finish.countdown', function (e: any) {
                            e.preventDefault();
                            // @ts-ignore
                            swal(
                                {
                                    text: "Time is up. Check test results.",
                                    icon: "warning",
                                    title: "Wow!",
                                    button: "OK",
                                    closeOnClickOutside: false
                                }).then(() => {

                                let correctAnswerSubmit = correctAnswer();

                                let hiddenTimer = document.querySelector(".timer");

                                let ScoreLis = 0;
                                let pointLis = 0;
                                let ScoreRed = 0;
                                let pointRed = 0;
                                setIsShowResult(true);
                                SetIsSubmit(true);
                                setCorrectAnswerSubmit(correctAnswerSubmit);
                                console.log('answerChoose', userAnswerChoose);
                                console.log('correctSubmit', correctAnswerSubmit);

                                let pointPartOne = checkPoint1(userAnswerChoose, correctAnswerSubmit);
                                console.log('one', pointPartOne);
                                let pointPartTwo = checkPoint2(userAnswerChoose, correctAnswerSubmit);
                                let pointPartThree = checkPoint3(userAnswerChoose, correctAnswerSubmit);
                                let pointPartFour = checkPoint4(userAnswerChoose, correctAnswerSubmit);
                                let pointPartFive = checkPoint5(userAnswerChoose, correctAnswerSubmit);
                                let pointPartSix = checkPoint6(userAnswerChoose, correctAnswerSubmit);
                                let pointPartSeven = checkPoint7(userAnswerChoose, correctAnswerSubmit);
                                setScorePartOne(pointPartOne);
                                setScorePartTwo(pointPartTwo);
                                setScorePartThree(pointPartThree);
                                setScorePartFour(pointPartFour);
                                setScorePartFive(pointPartFive);
                                setScorePartSix(pointPartSix);
                                setScorePartSeven(pointPartSeven);

                                pointLis = pointPartOne + pointPartTwo + pointPartThree + pointPartFour;
                                pointRed = pointPartFive + pointPartSix + pointPartSeven;
                                setPointListening(pointLis);
                                setPointReading(pointRed);

                                ScoreLis = Math.round((pointLis * 9.9) * 100) / 100;
                                ScoreRed = Math.round((pointRed * 9.9) * 100) / 100;

                                setScoreListening(ScoreLis);
                                setScoreReading(ScoreRed);

                                // @ts-ignore
                                hiddenTimer.setAttribute('style', 'display: none')


                            });
                        });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getExamById();
    }, [])


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

    const timing = () => {
        if (exam) {
            let timeDB = moment(exam.totalTime).format('HH:mm:ss');
            let timeFormat = timeDB.split(':');

            let hours = 0;
            hours = (parseInt(timeFormat[0]) * 3600000);
            let minute = 0;
            minute = (parseInt(timeFormat[1]) * 60000);
            let seconds = 0;
            seconds = (parseInt(timeFormat[2]) * 1000);
            let totalTime = seconds + minute + hours;
            return totalTime;
        }
    }

    function correctAnswer() {
        let listCorrectAnswer = [];
        for (let i = 1; i < 101; i++) {
            let nameCorrectAnswerRadio = "correctAnswer-" + i;
            // @ts-ignore
            let value = document.getElementById("submitForm").elements.namedItem(nameCorrectAnswerRadio).value;
            if (value !== "") listCorrectAnswer.push(value);
        }

        return listCorrectAnswer;
    }

    useEffect(() => {
        /*let timeOut = timing();
        console.log(timeOut);*/
        let sideBarInterval: any;
        let isRunning = 0;

        $(function () {

            // x??? l?? s??? ki???n ????ng m??? side bar
            $('.outline-learn').click(function () {
                if (isRunning !== 0) {
                    return;
                }

                isRunning = 1;
                if (window.innerHeight > 900) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $('.exam-content').removeClass('col-md-8');
                        $('.exam-content').addClass('col-md-12');
                        $('.sidebar-content').removeClass('show');

                        $('.sidebar-content')[0].setAttribute('style', 'transform: translateX(100%);');

                        setCookie('sideBar', 'off', 1000);

                        isRunning = 0;
                    } else {
                        $(this).addClass('active');
                        $('.exam-content').addClass('col-md-8');
                        $('.exam-content').removeClass('col-md-12');
                        $('.sidebar-content').addClass('show');

                        $('.sidebar-content')[0].setAttribute('style', 'transform: translateX(0);');

                        setCookie('sideBar', 'on', 1000);

                        $('.sidebar-content')[0].setAttribute('style', 'display: none !important;');
                        sideBarInterval = setInterval(sideBarOff, 2000);
                    }
                } else {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        $('.exam-content').removeClass('col-md-8');
                        $('.exam-content').addClass('col-md-12');
                        $('.sidebar-content').removeClass('show');

                        $('.sidebar-content')[0].setAttribute('style', 'transform: translateX(100%);');

                        setCookie('sideBar', 'off', 1000);
                    } else {
                        $(this).addClass('active');

                        $('.exam-content').addClass('col-md-8');
                        $('.exam-content').removeClass('col-md-12');
                        $('.sidebar-content').addClass('show');

                        $('.sidebar-content')[0].setAttribute('style', 'transform: translateX(0);');

                        setCookie('sideBar', 'on', 1000);
                    }
                    isRunning = 0;
                }
            });
        });

        function setCookie(cname: any, cvalue: any, exdays: any) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function sideBarOff() {
            $('.sidebar-content')[0].setAttribute('style', 'display: flex !important;');
            clearInterval(sideBarInterval);
            isRunning = 0;
        }

        // x??? l?? checked
        $(function () {
            $('.answer-list li label').click(function () {
                let pr = $(this).parents('li');
                let radio = $('input[type="radio"]', pr)[0];
                // @ts-ignore
                radio.checked = !radio.checked;
            });
        });

        /*//x??? l?? time
        if (typeof timeOut !== 'undefined') {
            let fiveSeconds = new Date().getTime() + timeOut;
            // @ts-ignore
            $('.countdown').countdown(fiveSeconds)
                .on('update.countdown', function (event: any) {
                    // @ts-ignore
                    let $this = $(this);
                    $this.html(event.strftime('%H:%M:%S'));
                })
                .on('finish.countdown', function () {
                    // @ts-ignore
                    swal(
                        {
                            text: "Time is up. Check test results.",
                            icon: "warning",
                            title: "Wow!",
                            button: "OK",
                            closeOnClickOutside: false
                        }).then(function () {
                        window.location.replace(baseUrl + "result");
                    });
                });
        }*/

    }, []);


    const handleSubmit = (e: any) => {
        e.preventDefault();

        let correctAnswerSubmit = correctAnswer();

        let hiddenTimer = document.querySelector(".timer");

        if (!isSubmit) {
            // @ts-ignore
            swal({
                title: "Wow!",
                text: "Time is not up yet. Do you want to submit your answers?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willExit: any) => {
                if (willExit) {
                    let ScoreLis = 0;
                    let pointLis = 0;
                    let ScoreRed = 0;
                    let pointRed = 0;
                    setIsShowResult(true);
                    SetIsSubmit(true);
                    setCorrectAnswerSubmit(correctAnswerSubmit);
                    let pointPartOne = checkPoint1(userAnswerChoose, correctAnswerSubmit);
                    let pointPartTwo = checkPoint2(userAnswerChoose, correctAnswerSubmit);
                    let pointPartThree = checkPoint3(userAnswerChoose, correctAnswerSubmit);
                    let pointPartFour = checkPoint4(userAnswerChoose, correctAnswerSubmit);
                    let pointPartFive = checkPoint5(userAnswerChoose, correctAnswerSubmit);
                    let pointPartSix = checkPoint6(userAnswerChoose, correctAnswerSubmit);
                    let pointPartSeven = checkPoint7(userAnswerChoose, correctAnswerSubmit);
                    setScorePartOne(pointPartOne);
                    setScorePartTwo(pointPartTwo);
                    setScorePartThree(pointPartThree);
                    setScorePartFour(pointPartFour);
                    setScorePartFive(pointPartFive);
                    setScorePartSix(pointPartSix);
                    setScorePartSeven(pointPartSeven);

                    pointLis = pointPartOne + pointPartTwo + pointPartThree + pointPartFour;
                    pointRed = pointPartFive + pointPartSix + pointPartSeven;
                    setPointListening(pointLis);
                    setPointReading(pointRed);

                    ScoreLis = Math.round((pointLis * 9.9) * 100) / 100;
                    ScoreRed = Math.round((pointRed * 9.9) * 100) / 100;

                    setScoreListening(ScoreLis);
                    setScoreReading(ScoreRed);

                    // @ts-ignore
                    hiddenTimer.setAttribute('style', 'display: none')
                }
            });
        } else {
            setIsShowResult(true);
        }

    }

    const handleExitExam = (e: any) => {
        e.preventDefault();

        history.push("/");
    }

    const viewDetails = () => {
        setIsShowResult(false);
    }

    return (
        <>
            <ClipLoader color={"#42BF80"} loading={isLoading} size={80} css={override}/>
            <div id="page-wrap">
                <div className="top-nav">
                    <div className="container">
                        <div className="row test-page">
                            <h4 className="sm black bold part-tile">
                                <Link to="https://toeic365.com/en"
                                      className="logo-h">
                                    <img src="https://toeicexamstore.com/websites/images/toeiclogo.png"
                                         alt="toeic365.com"/>
                                </Link>
                                <b>toeic365</b>
                            </h4>
                            <ul className="top-nav-list ">
                                <li className="timer"><Link to="#"><b className="countdown"/></Link></li>
                                <li className="end-exam header-b"><Link className="finish-all" to="#"
                                                                        onClick={(e) => {
                                                                            handleSubmit(e)
                                                                        }}><b>{isSubmit ? "RESULT" : "SUBMIT"}</b></Link>
                                </li>
                                <li className="header-b outline-learn active part-list">
                                    <Link to="#"><b>Question List</b></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <section id="quizz-intro-section" className="quizz-intro-section learn-section"
                         style={{minHeight: '920px'}}>
                    <div className="container">
                        <div className="question-content-wrap">
                            <div className="row">
                                <div className="col-md-8 col-sm-12 exam-content">
                                    <div className="question-content">
                                        <form method="post" acceptCharset="utf-8" action="" id="submitForm">

                                            {/* SHOW PART ONE */}
                                            {exam && exam.part.length && exam.part[0] ? <>
                                                <h4 className="sm"
                                                    id={`#${exam.part[0].partName}`}>{exam && exam.part.length ? exam.part[0].partName : <></>}</h4>
                                                <p className="text-justify">{exam && exam.part.length ? <div
                                                    dangerouslySetInnerHTML={{__html: exam.part[0].partDesc}}/> : <></>}</p>
                                                <p className="text-justify">
                                                    {exam.part[0].groupQuestion.length ?
                                                        <b>{exam.part[0].groupQuestion[0].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[0].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[0].groupQuestion[0].groupQuestionDesc}}/> : <></>}
                                                <p><b>Audio: </b></p>

                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[0].groupQuestion[0].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[0].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <img
                                                                src={`${baseUrl()}/fileFolders/${element.questionImg}`}
                                                                alt="1. Select the answer" style={{width: '100%'}}/>
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {isSubmit && userAnswerChoose["question_" + element.questionNumber] ? element.option1 : <></>}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {isSubmit && userAnswerChoose["question_" + element.questionNumber] ? element.option2 : <></>}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {isSubmit && userAnswerChoose["question_" + element.questionNumber] ? element.option3 : <></>}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {isSubmit && userAnswerChoose["question_" + element.questionNumber] ? element.option4 : <></>}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <br/>
                                            </> : <></>}
                                            {/* END PART ONE */}

                                            {/* Show Part 2 */}
                                            {exam && exam.part.length && exam.part[1] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam.part[1].partName}</h4>
                                                <p className="text-justify"
                                                   dangerouslySetInnerHTML={{__html: exam.part[1].partDesc}}/>
                                                <p className="text-justify">
                                                    <b dangerouslySetInnerHTML={{__html: exam.part[1].groupQuestion[0].title}}/>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam.part[1].groupQuestion[0].groupQuestionDesc}}/>
                                                <p><b>Audio: </b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[1].groupQuestion[0].audio}`}/>
                                                </audio>
                                                <div className="row">
                                                    {exam.part[1].groupQuestion[0].question.map((element: any) => {
                                                        return (
                                                            <>
                                                                <input className="hidden" id="correctAnswer"
                                                                       name={`correctAnswer-${element.questionNumber}`}
                                                                       value={`${element.correctAnswer}`}
                                                                />

                                                                {isSubmit === false ? <>
                                                                    <div className="col-md-3" id="question-4-to-7">
                                                                        <div className="answer"
                                                                             id={`question-${element.questionNumber}`}>
                                                                            <p><b>{element.questionNumber}.</b></p>
                                                                            <ul className="answer-list">
                                                                                <Radio.Group
                                                                                    name={`Answers-${element.questionNumber}`}
                                                                                    onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                                    <Radio value="A">A</Radio> <br/>
                                                                                    <Radio
                                                                                        value="B">B</Radio> <br/>
                                                                                    <Radio
                                                                                        value="C">C
                                                                                    </Radio> <br/>
                                                                                </Radio.Group>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </> : <></>}

                                                                {isSubmit ? <>
                                                                    <div className="answer"
                                                                         id={`question-${element.questionNumber}`}>
                                                                        <p>
                                                                            <b>{element.questionNumber}. {userAnswerChoose["question_" + element.questionNumber] ? element.questionContent : <></>}</b>
                                                                        </p>
                                                                        <ul className="answer-list">
                                                                            <Radio.Group
                                                                                name={`Answers-${element.questionNumber}`}
                                                                                onChange={(e) => handleUserAnswerChoose(element.questionNumber, e)}
                                                                                value={userAnswerChoose["question_" + element.questionNumber]}>
                                                                                <Radio value="A">
                                                                                    A. {userAnswerChoose["question_" + element.questionNumber] ? element.option1 : <></>}
                                                                                    <i className={userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" : userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                                </Radio>
                                                                                <br/>
                                                                                <Radio value="B">
                                                                                    B. {userAnswerChoose["question_" + element.questionNumber] ? element.option2 : <></>}
                                                                                    <i className={userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" : userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                                </Radio>
                                                                                <br/>
                                                                                <Radio value="C">
                                                                                    C. {userAnswerChoose["question_" + element.questionNumber] ? element.option3 : <></>}
                                                                                    <i className={userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" : userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                                </Radio>
                                                                                <br/>
                                                                            </Radio.Group>
                                                                        </ul>
                                                                    </div>
                                                                </> : <></>}

                                                            </>
                                                        )
                                                    })}

                                                </div>
                                            </> : <></>}
                                            {/* End Part 2 */}

                                            {/* Show Part 3 */}
                                            {exam && exam.part.length && exam.part[2] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam.part[2].partName}</h4>
                                                <p className="text-justify"
                                                   dangerouslySetInnerHTML={{__html: exam.part[2].partDesc}}/>
                                                <hr/>
                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[0].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[0].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[0].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber]&& correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber]&& userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[1].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[1].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[1].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[1].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[2].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[2].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[2].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[2].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[3].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[3].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[3].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[3].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[4].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[4].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[4].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[4].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[5].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[5].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[5].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[5].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[2].groupQuestion[6].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[2].groupQuestion[6].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[2].groupQuestion[6].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[2].groupQuestion[6].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <></>}
                                            {/* End Part 3 */}

                                            {/* Show Part 4 */}
                                            {exam && exam.part.length && exam.part[3] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam.part[3].partName}</h4>
                                                <p className="text-justify"
                                                   dangerouslySetInnerHTML={{__html: exam.part[3].partDesc}}/>

                                                <hr/>
                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[3].groupQuestion[0].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[3].groupQuestion[0].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[3].groupQuestion[0].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[3].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[3].groupQuestion[1].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[3].groupQuestion[1].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[3].groupQuestion[1].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[3].groupQuestion[1].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[3].groupQuestion[2].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[3].groupQuestion[2].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[3].groupQuestion[2].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[3].groupQuestion[2].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[3].groupQuestion[3].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[3].groupQuestion[3].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[3].groupQuestion[3].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[3].groupQuestion[3].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[3].groupQuestion[4].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[3].groupQuestion[4].groupQuestionDesc}}/>
                                                <p><b>Audio:</b></p>
                                                <audio preload="auto" controls style={{width: '100%'}}>
                                                    <source
                                                        src={`${baseUrl()}/fileFolders/${exam.part[3].groupQuestion[4].audio}`}/>
                                                </audio>

                                                {exam && exam.part.length && exam.part[3].groupQuestion[4].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <></>}
                                            {/* End Part 4 */}

                                            {/* Show Part 5 */}
                                            {exam && exam.part.length && exam.part[4] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam.part[4].partName}</h4>
                                                <p className="text-justify"
                                                   dangerouslySetInnerHTML={{__html: exam.part[4].partDesc}}/>

                                                <hr/>
                                                <p className="text-justify">
                                                    <b>{exam && exam.part.length && exam.part[4].groupQuestion[0].title}</b>
                                                </p>
                                                <hr/>
                                                <p dangerouslySetInnerHTML={{__html: exam && exam.part.length && exam.part[4].groupQuestion[0].groupQuestionDesc}}/>

                                                {exam && exam.part.length && exam.part[4].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />

                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <></>}
                                            {/* End Part 5 */}

                                            {/* Show Part 6 */}
                                            {exam && exam.part.length && exam.part[5] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam && exam.part.length ? exam.part[5].partName : <></>}</h4>
                                                <p className="text-justify">{exam && exam.part.length ? <div
                                                    dangerouslySetInnerHTML={{__html: exam.part[5].partDesc}}/> : <></>}</p>

                                                <p className="text-justify">
                                                    {exam.part[0].groupQuestion.length ?
                                                        <b>{exam.part[5].groupQuestion[0].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[0].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[5].groupQuestion[0].groupQuestionDesc}}/> : <></>}
                                                <p dangerouslySetInnerHTML={{__html: exam.part[5].groupQuestion[0].paragraph}}/>

                                                {exam && exam.part.length && exam.part[5].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    {exam.part[0].groupQuestion.length ?
                                                        <b>{exam.part[5].groupQuestion[1].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[0].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[5].groupQuestion[1].groupQuestionDesc}}/> : <></>}
                                                <p dangerouslySetInnerHTML={{__html: exam.part[5].groupQuestion[1].paragraph}}/>

                                                {exam && exam.part.length && exam.part[5].groupQuestion[1].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <></>}
                                            {/* End show part 6 */}

                                            {/* Show Part 7 */}
                                            {exam && exam.part.length && exam.part[6] ? <>
                                                <hr/>
                                                <h4 className="sm">{exam && exam.part.length ? exam.part[6].partName : <></>}</h4>
                                                <p className="text-justify">{exam && exam.part.length ? <div
                                                    dangerouslySetInnerHTML={{__html: exam.part[6].partDesc}}/> : <></>}</p>

                                                <p className="text-justify">
                                                    {exam.part[0].groupQuestion.length ?
                                                        <b>{exam.part[6].groupQuestion[0].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[6].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[0].groupQuestionDesc}}/> : <></>}
                                                <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[0].paragraph}}/>

                                                {exam && exam.part.length && exam.part[6].groupQuestion[0].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] &&  userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    {exam.part[6].groupQuestion.length ?
                                                        <b>{exam.part[6].groupQuestion[1].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[0].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[1].groupQuestionDesc}}/> : <></>}
                                                <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[1].paragraph}}/>

                                                {exam && exam.part.length && exam.part[6].groupQuestion[1].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <p className="text-justify">
                                                    {exam.part[6].groupQuestion.length ?
                                                        <b>{exam.part[6].groupQuestion[2].title}</b> : <></>}
                                                </p>
                                                <hr/>
                                                {exam.part[0].groupQuestion.length ?
                                                    <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[2].groupQuestionDesc}}/> : <></>}
                                                <p dangerouslySetInnerHTML={{__html: exam.part[6].groupQuestion[2].paragraph}}/>

                                                {exam && exam.part.length && exam.part[6].groupQuestion[2].question.map((element: any) => {
                                                    return (
                                                        <div key={element.questionNumber}>
                                                            <input className="hidden" id="correctAnswer"
                                                                   name={`correctAnswer-${element.questionNumber}`}
                                                                   value={`${element.correctAnswer}`}
                                                            />
                                                            <div className="answer"
                                                                 id={`question-${element.questionNumber}`}>
                                                                <p>
                                                                    <b>{element.questionNumber + ". " + element.questionContent}</b>
                                                                </p>
                                                                <ul className="answer-list">
                                                                    <Radio.Group
                                                                        name={`Answers-${element.questionNumber}`}
                                                                        onChange={e => handleUserAnswerChoose(element.questionNumber, e)}>
                                                                        <Radio
                                                                            value="A">A. {element.option1}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "A" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "A" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="B">B. {element.option2}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "B" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "B" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="C">C. {element.option3}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "C" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "C" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio> <br/>
                                                                        <Radio
                                                                            value="D">D. {element.option4}<i
                                                                            className={
                                                                                isSubmit && userAnswerChoose["question_" + element.questionNumber] && correctAnswerSubmit[element.questionNumber - 1] === "D" ? "pi pi-check p-mr-2" :
                                                                                    isSubmit && userAnswerChoose["question_" + element.questionNumber] && userAnswerChoose["question_" + element.questionNumber] === "D" ? "pi pi-times" : "d-none"}/>
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <></>}
                                            {/* End show part 7 */}
                                        </form>

                                        <div className="card p-fluid">
                                            <Dialog header="Result" visible={isShowResult}
                                                    style={{width: '557px', marginTop: '75px'}} modal
                                                    onHide={() => setIsShowResult(false)}>
                                                <h4 className="sm"> {user ? `Hi, ${user.fullName}` : <></>} </h4>
                                                <h4 className="sm">
                                                    {exam ? exam.examName : <></>}
                                                </h4>
                                                <i> Thank you for completing the trial tests on TOEIC Exam Store. </i>
                                                <br/>
                                                {exam && exam.part.length ? <>
                                                    <table className="table-question" style={{border: 'none'}}>
                                                        <thead>
                                                        {exam.part[0] || exam.part[1] || exam.part[2] || exam.part[3] ? <>
                                                            <tr>
                                                                <th colSpan={2} style={{color: '#d93425'}}>
                                                                    Listening: {pointListening}/50
                                                                </th>
                                                                <th className="right-answer"
                                                                    style={{color: '#d93425'}}>Score: {scoreListening}/495
                                                                </th>
                                                            </tr>
                                                        </> : <></>}
                                                        </thead>
                                                        <tbody>
                                                        {exam.part[0] ? <>
                                                            <tr>
                                                                <td><b>1 - 3</b></td>
                                                                <td className="td-quest">Part I: Picture
                                                                    Description <b>({scorePartOne}/3)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        {exam.part[1] ? <>
                                                            <tr>
                                                                <td><b>4 - 15</b></td>
                                                                <td className="td-quest">Part II: Question -
                                                                    Response <b>({scorePartTwo}/12)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        {exam.part[2] ? <>
                                                            <tr>
                                                                <td><b>16 - 35</b></td>
                                                                <td className="td-quest">Part III: Short
                                                                    Conversations <b>({scorePartThree}/20)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        {exam.part[3] ? <>
                                                            <tr>
                                                                <td><b>36 - 50</b></td>
                                                                <td className="td-quest">Part IV: Short
                                                                    Talks <b>({scorePartFour}/15)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        </tbody>
                                                    </table>

                                                </> : <></>}

                                                {exam && exam.part.length ? <>
                                                    <table className="table-question" style={{border: 'none'}}>
                                                        <thead>
                                                        {exam.part[4] || exam.part[5] || exam.part[6] ? <>
                                                            <tr>
                                                                <th colSpan={2} style={{color: '#d93425'}}>
                                                                    Reading: {pointReading}/50
                                                                </th>
                                                                <th className="right-answer"
                                                                    style={{color: '#d93425'}}>Score: {scoreReading}/495
                                                                </th>
                                                            </tr>
                                                        </> : <></>}
                                                        </thead>
                                                        <tbody>
                                                        {exam.part[4] ? <>
                                                            <tr>
                                                                <td><b>51 - 80</b></td>
                                                                <td className="td-quest">Part V: Incomplete
                                                                    Sentences <b>({scorePartFive}/30)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        {exam.part[5] ? <>
                                                            <tr>
                                                                <td><b>81 - 86</b></td>
                                                                <td className="td-quest">Part VI: Incomplete
                                                                    Sentences <b>({scorePartSix}/6)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        {exam.part[6] ? <>
                                                            <tr>
                                                                <td><b>87 - 100</b></td>
                                                                <td className="td-quest">Part VII: Reading
                                                                    Comprehension <b>({scorePartSeven}/14)</b></td>
                                                                <td className="td-right-answer">
                                                                    <Link to="#" onClick={viewDetails}>Details</Link>
                                                                </td>
                                                            </tr>
                                                        </> : <></>}
                                                        </tbody>
                                                    </table>
                                                </> : <></>}
                                                <div className="text-center">
                                                    <Link to="#" onClick={e => handleExitExam(e)}
                                                          className="mc-btn btn-style-6">Exit</Link>
                                                </div>
                                                <hr/>
                                                {0 <= (scoreListening + scoreReading) && (scoreListening + scoreReading) < 351 ?
                                                    <>
                                                        <p className="text-justify bold">?????ng v???i r???i trang nh??, b???n c?? th???
                                                            tham kh???o ????nh gi?? s?? b??? v?? n??ng cao tr??nh ????? ti???ng anh c???a m??nh
                                                            b???ng nh???ng ????? xu???t d?????i d??y: </p>
                                                        <p style={{textAlign: 'justify'}}><span
                                                            style={{fontSize: '16px'}}><strong>A. NG??? PH??P</strong></span><br/>
                                                            <span style={{fontSize: '14px'}}>Ng??? ph??p ????ng m???t vai tr?? v?? c??ng quan tr???ng trong qu?? tr??nh h???c ti???ng Anh n??i chung v?? luy???n thi TOEIC n??i ri??ng. Tuy nhi??n, b???n h??y nh??? l?? m??nh h???c <strong>Ng??? ph??p TOEIC</strong> ch??? kh??ng gi???ng nh?? to??n b??? <strong>Ng??? ph??p ti???ng Anh trong ch????ng tr??nh ph??? th??ng</strong> nh??. H??y c??ng ??i???m qua c??c ch??? ??i???m ng??? ph??p xu???t hi???n trong ????? thi Toeic d?????i ????y ????? ?????t ??i???m cao h??n:</span>
                                                        </p>
                                                        <table cellPadding={0} cellSpacing={0} style={{width: 'auto'}}
                                                               className="table table-bordered table-striped">
                                                            <tbody>
                                                            <tr>
                                                                <td style={{
                                                                    width: '142px',
                                                                    backgroundColor: 'rgb(255, 153, 51)'
                                                                }}>
                                                                    <p style={{textAlign: 'center'}}><span
                                                                        style={{fontSize: '16px'}}><strong>Ch??? ??i???m ??n t???p</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{
                                                                    width: '415px',
                                                                    backgroundColor: 'rgb(255, 153, 51)'
                                                                }}>
                                                                    <p style={{textAlign: 'center'}}><span
                                                                        style={{fontSize: '16px'}}><strong>N???i dung ch??nh</strong></span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>C??c th?? c?? b???n</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>B???n c???n ph???i n???m ???????c c???u tr??c v?? c??ch s??? d???ng c???a 6 th?? c?? b???n sau:</span>
                                                                    </p>
                                                                    <ol>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hi???n t???i ????n</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Qu?? kh??? ????n</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>T????ng lai ????n</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hi???n t???i ti???p di???n</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Qu?? kh??? ti???p di???n</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hi???n t???i ho??n th??nh</span>
                                                                        </li>
                                                                    </ol>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>C??u b??? ?????ng</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px'}}>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Trong ????? thi TOEIC kh??ng th??? thi???u ph???n c??u b??? ?????ng. V?? v???y, b???n c???n ph???i n???m ???????c c???u tr??c c??u b??? ?????ng c???a 6 th?? c?? b???n trong ph???n n??y. D?????i ????y l?? c??ng th???c chung m??nh ????a ra</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>C??ng th???c t???ng qu??t c???a c??u b??? ?????ng:</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{
                                                                        marginLeft: '39.6pt',
                                                                        textAlign: 'justify'
                                                                    }}><span style={{fontSize: '14px'}}><strong>S + tobe + Vpp (+ by + O)</strong></span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px', height: '303px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>C??u ??i???u ki???n</strong></span>
                                                                    </p>
                                                                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                                                                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                                                                </td>
                                                                <td style={{width: '415px', height: '303px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>C??ng nh?? c??u b??? ?????ng, c??u ??i???u ki???n l?? ph???n thi???t y???u c???a b??i thi TOEIC. ?????i v???i ti??u ch?? ??? m???c ??i???m n??y, b???n c???n n???m ???????c c???u tr??c c?? b???n c???a 3 lo???i c??u ??i???u ki???n c?? b???n: lo???i 1, lo???i 2 v?? lo???i 3.</span>
                                                                    </p>
                                                                    <div className="table-responsive2">
                                                                        <table cellPadding={0} cellSpacing={0}
                                                                               style={{width: 'auto'}}
                                                                               className="table table-bordered table-striped">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style={{width: '58px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>Lo???i 1</span>
                                                                                    </p>
                                                                                </td>
                                                                                <td style={{width: '329px'}}>
                                                                                    <ol style={{listStyleType: 'upper-roman'}}>
                                                                                        <li style={{textAlign: 'justify'}}>
                                                                                            <span
                                                                                                style={{fontSize: '14px'}}>f + S + V(s,es), S + will/can/shall + V (nguy??n th???)</span>
                                                                                        </li>
                                                                                    </ol>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{width: '58px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>Lo???i 2</span>
                                                                                    </p>
                                                                                </td>
                                                                                <td style={{width: '329px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>If + S + Ved, S +would/ could/ should + V (nguy??n th???)</span>
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{width: '58px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>Lo???i 3</span>
                                                                                    </p>
                                                                                </td>
                                                                                <td style={{width: '329px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>If + S + had + Vpp, S + would/ could/ should + have + Vpp.</span>
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px', height: '162px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>M???nh ????? quan h???</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px', height: '162px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>?????i t??? quan h???, m???nh ????? quan h??? l?? ph???n c?? th??? n??i kh?? ph???c t???p trong ph???n ng??? ph??p. ??? b???t c??? ????? thi TOEIC n??o b???n c??ng c?? th??? b???t g???p n???i dung n??y. V?? v???y, m??nh mong r???ng b???n c?? th??? n???m ???????c ki???n th???c c?? b???n c???a ph???n n??y. ??? m???c ??i???m n??y, b???n n??n t???p trung c??ch d??ng c???a 3 lo???i ?????i t??? quan h??? sau:</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Who: ??TQH thay th??? cho danh t??? ng?????i, l??m ch??? ng??? ho???c t??n ng???.</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{
                                                                        marginLeft: '17.1pt',
                                                                        textAlign: 'justify'
                                                                    }}><span style={{fontSize: '14px'}}>Ex: I would like to thank Mrs. Song, <u>who</u> has agreed to give an opening speech at our annual conference. (who thay th??? cho Mrs. Song).</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Which: ??TQH thay th??? cho danh t??? ch??? v???t, l??m ch??? ng??? ho???c t??n ng???.</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Ex: Do you see the coffee shop&nbsp;
                                                                        <em><u>which</u></em>&nbsp;was located on Nguyen Huu Huan street?</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>That: ??TQH thay th??? ???????c cho c??? ng?????i v?? v???t.</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Ex: This is one of the first books <u>that</u> I love so much.</span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>

                                                        <span
                                                            style={{fontSize: '16px'}}><strong>B. T??? V???NG</strong></span><br/>
                                                        <span style={{fontSize: '14px'}}><em>B???n c?? th??? tham kh???o cu???n Very easy TOEIC ????? h???c t??? v???ng nh??. </em></span>
                                                        <span style={{fontSize: '14px'}}><em>Ch??ng ta s??? c???n l??u ?? ?????n h??nh th???c, v??? tr?? v?? ch???c n??ng c???a 4 t??? lo???i quan tr???ng b???c nh???t trong c??u. ???? l??:</em></span>
                                                        <div>
                                                            <ul>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Danh t???</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>T??nh t???</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>?????ng t???</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Tr???ng t???</span></li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <div className="table-responsive2">
                                                                <table cellPadding={0} cellSpacing={0}
                                                                       style={{width: 'auto'}}
                                                                       className="table table-bordered table-striped">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td style={{
                                                                            width: '126px',
                                                                            backgroundColor: 'rgb(255, 153, 51)'
                                                                        }}>
                                                                            <p style={{textAlign: 'center'}}><span
                                                                                style={{fontSize: '16px'}}><strong>T??? lo???i</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{
                                                                            width: '432px',
                                                                            backgroundColor: 'rgb(255, 153, 51)'
                                                                        }}>
                                                                            <p style={{textAlign: 'center'}}><span
                                                                                style={{fontSize: '16px'}}><strong>Ch???c n??ng c?? b???n v?? d???u hi???u nh???n bi???t chung</strong></span>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{width: '126px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Danh t???</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Ch???c n??ng: </strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>????ng ch???c n??ng l?? ch??? ng???, t??n ng??? trong c??u.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>D???u hi???u nh???n bi???t:</strong> th?????ng l?? nh???ng t??? c?? ???ending - ??u??i??? nh?? sau:</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>??u??i danh t??? s??? v???t, s??? vi???c ph??? bi???n:</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}>-tion, -ation, -ment, -ing, -age, -ship, -ism, -ity, -ness.</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>??u??i danh t??? ch??? ng?????i ph??? bi???n:</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}>-or, -er, -ant, -ee.</span>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{width: '126px', height: '138px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>T??nh t???</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px', height: '138px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Ch???c n??ng:</strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>?????ng tr?????c danh t??? b??? ngh??a cho danh t???.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>?????ng sau Tobe.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{
                                                                                marginLeft: '-0.9pt',
                                                                                textAlign: 'justify'
                                                                            }}><span style={{fontSize: '14px'}}><strong>D???u hi???u nh???n bi???t:</strong> th?????ng l?? nh???ng t??? c?? ???ending - ??u??i??? nh?? sau:</span>
                                                                            </p>
                                                                            <p style={{
                                                                                marginLeft: '17.1pt',
                                                                                textAlign: 'justify'
                                                                            }}><span style={{fontSize: '14px'}}>-ful, -ive, -ous, -less, -al, -ly, -ish, -y, -like, -ed, -ing, -ic.</span>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{width: '126px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>?????ng t???</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Ch???c n??ng: </strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Di???n t??? h??nh ?????ng, tr???ng th??i c???a ch??? ng???.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>C?? hai lo???i: ?????ng t??? th?????ng v?? ?????ng t??? Tobe.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{
                                                                                marginLeft: '-0.9pt',
                                                                                textAlign: 'justify'
                                                                            }}><span style={{fontSize: '14px'}}><strong>D???u hi???u nh???n bi???t:</strong> th?????ng l?? nh???ng t??? c?? ???ending - ??u??i??? nh?? sau:</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>-ate, -fy, -ize, -ise, -en.</span>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{width: '126px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Tr???ng ng???</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Ch???c n??ng:</strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>?????ng tr?????c ho???c sau ?????ng t??? ????? b??? ngh??a cho ?????ng t???.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>?????ng tr?????c t??nh t???, sau tobe ????? b??? ngh??a cho t??nh t???.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>D???u hi???u nh???n bi???t: </strong>th?????ng l?? nh???ng t??? c?? ???ending - ??u??i??? nh?? sau:</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Tr???ng t??? c?? k???t c???u kh?? ????n gi???n: <strong>ADV = ADJ + ly</strong>. (B???n ch??? c???n th??m ??u??i ???ly v??o sau t??nh t???).</span>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <p style={{textAlign: 'justify'}}><span
                                                                style={{fontSize: '14px'}}><strong>C. NGHE</strong></span>
                                                            </p>
                                                            <ul>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}><strong>T???ng quan: </strong></span>
                                                                </li>
                                                            </ul>
                                                            <p style={{textAlign: 'justify'}}><span
                                                                style={{fontSize: '14px'}}>??? giai ??o???n v?? c??ng c?? b???n n??y, b???n ?????ng v???i luy???n ????? thi TOEIC c??? 4 ph???n nghe nh??. S??? nhanh ch??ng b??? cho??ng v?? s??? ????. Thay v?? ????, h??y nghe nh???ng file nghe ????n gi???n, nh??ng c?? li??n quan ?????n ph???n thi TOEIC. Nh?? b???n ???? bi???t, ph???n Part 1 (M?? t??? tranh) v?? Part 2 (H???i ??? ????p) l?? hai ph???n d??? nh???t trong ????? thi. Do ???? b???n n??n t???p trung v??o hai ph???n d??? n??y ????? ki???m ??i???m nh??.</span>
                                                            </p>
                                                            <ul>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}><strong>Ph????ng ph??p luy???n nghe:</strong></span>
                                                                </li>
                                                            </ul>
                                                            <p style={{textAlign: 'justify'}}><span
                                                                style={{fontSize: '14px'}}>Ph????ng ph??p Nghe - Ch??p ch??nh t??? l?? ph????ng ph??p ???????c ch???n l???a nhi???u nh???t. Nghe c?? v??? c??ng nan gi???i ph???i kh??ng? Ban ?????u khi ch??a ch??p ???????c nh???ng c??u d??i th?? b???n c?? th??? d??ng ph????ng ph??p ???take-note???. Ngh??a l?? h??y ghi t???t c??? nh???ng t??? m??nh nghe ???????c ra gi???y, c??? d???n d???n b???n s??? ch??p ???????c c??? c??u ????. m??nh cam ??oan v???i b???n r???ng ph????ng ph??p n??y s??? v?? c??ng hi???u qu??? cho vi???c nghe c???a b???n ????. B??n c???nh ????, k?? n??ng nghe y??u c???u kh??? n??ng ph???n x??? v???i ti???ng Anh. V???y n??n, b???n h??y d??nh m???i ng??y ??t nh???t 30 ph??t ????? luy???n nghe cho quen tai nh??.</span>
                                                            </p>
                                                        </div>
                                                    </> : <></>}
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>

                                {exam && exam.part.length ? <>
                                    <div className="col-md-4 sidebar-content show">
                                        <div className="list-item-body outline-learn-body ps-container">
                                            {exam.part[0] || exam.part[1] || exam.part[2] || exam.part[3] ? <>
                                                <div className="section-learn-outline">
                                                    <h5 className="section-title">LISTENING TEST</h5>
                                                    <ul className="section-list">
                                                        {exam.part[0] ? <>
                                                            <li className="o-view">
                                                                <div className="list-body">
                                                                    <h5>Part I: Picture Description
                                                                        <a href="#">Instruction</a>
                                                                    </h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[0].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}
                                                        {exam.part[1] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part II: Question - Response
                                                                        <Link to="#">Instruction</Link>
                                                                    </h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[1].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}

                                                        {exam.part[2] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part III: Short Conversations <Link
                                                                        to="#">Instruction</Link></h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[2].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[1].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[2].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[3].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[4].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[5].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[2].groupQuestion[6].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}
                                                        {exam.part[3] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part IV: Short Talks <Link
                                                                        to="#">Instruction</Link></h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[3].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[3].groupQuestion[1].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[3].groupQuestion[2].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[3].groupQuestion[3].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[3].groupQuestion[4].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}
                                                    </ul>
                                                </div>
                                            </> : <></>}
                                            {exam.part[4] || exam.part[5] || exam.part[6] ? <>
                                                <div className="section-learn-outline">
                                                    <h5 className="section-title">READING TEST</h5>
                                                    <ul className="section-list">
                                                        {exam.part[4] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part V: Incomplete Sentences <Link
                                                                        to="#">Instruction</Link></h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[4].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}

                                                        {exam.part[5] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part VI: Incomplete Sentences <Link
                                                                        to="#">Instruction</Link></h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[5].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[5].groupQuestion[1].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}
                                                        {exam.part[6] ? <>
                                                            <li className="o-view ">
                                                                <div className="list-body">
                                                                    <h5>Part VII: Reading Comprehension <Link
                                                                        to="#">Instruction</Link></h5>
                                                                    <div className="list-q-n">
                                                                        {exam.part[6].groupQuestion[0].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[6].groupQuestion[1].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                        {exam.part[6].groupQuestion[2].question.map((element: any) => {
                                                                            return (
                                                                                <a href={`#question-${element.questionNumber}`}
                                                                                   className={isSubmit && userAnswerChoose["question_" + element.questionNumber] === correctAnswerSubmit[element.questionNumber - 1] ? "btn btn-default question-n bg-blue" :
                                                                                       isSubmit && userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-red" : userAnswerChoose["question_" + element.questionNumber] ? "btn btn-default question-n bg-green" : "btn btn-default question-n"}>{element.questionNumber}</a>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </> : <></>}
                                                    </ul>
                                                </div>
                                            </> : <></>}
                                        </div>
                                    </div>
                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default FullExam;