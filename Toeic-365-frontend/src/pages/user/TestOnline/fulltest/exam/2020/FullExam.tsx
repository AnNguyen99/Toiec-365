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

            //xử lý time
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

            // xử lý sự kiện đóng mở side bar
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

        // xử lý checked
        $(function () {
            $('.answer-list li label').click(function () {
                let pr = $(this).parents('li');
                let radio = $('input[type="radio"]', pr)[0];
                // @ts-ignore
                radio.checked = !radio.checked;
            });
        });

        /*//xử lý time
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
                                                        <p className="text-justify bold">Đừng vội rời trang nhé, bạn có thể
                                                            tham khảo đánh giá sơ bộ và nâng cao trình độ tiếng anh của mình
                                                            bằng những đề xuất dưới dây: </p>
                                                        <p style={{textAlign: 'justify'}}><span
                                                            style={{fontSize: '16px'}}><strong>A. NGỮ PHÁP</strong></span><br/>
                                                            <span style={{fontSize: '14px'}}>Ngữ pháp đóng một vai trò vô cùng quan trọng trong quá trình học tiếng Anh nói chung và luyện thi TOEIC nói riêng. Tuy nhiên, bạn hãy nhớ là mình học <strong>Ngữ pháp TOEIC</strong> chứ không giống như toàn bộ <strong>Ngữ pháp tiếng Anh trong chương trình phổ thông</strong> nhé. Hãy cùng điểm qua các chủ điểm ngữ pháp xuất hiện trong đề thi Toeic dưới đây để đạt điểm cao hơn:</span>
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
                                                                        style={{fontSize: '16px'}}><strong>Chủ điểm ôn tập</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{
                                                                    width: '415px',
                                                                    backgroundColor: 'rgb(255, 153, 51)'
                                                                }}>
                                                                    <p style={{textAlign: 'center'}}><span
                                                                        style={{fontSize: '16px'}}><strong>Nội dung chính</strong></span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>Các thì cơ bản</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Bạn cần phải nắm được cấu trúc và cách sử dụng của 6 thì cơ bản sau:</span>
                                                                    </p>
                                                                    <ol>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hiện tại đơn</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Quá khứ đơn</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Tương lai đơn</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hiện tại tiếp diễn</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Quá khứ tiếp diễn</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Hiện tại hoàn thành</span>
                                                                        </li>
                                                                    </ol>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width: '142px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}><strong>Câu bị động</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px'}}>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Trong đề thi TOEIC không thể thiếu phần câu bị động. Vì vậy, bạn cần phải nắm được cấu trúc câu bị động của 6 thì cơ bản trong phần này. Dưới đây là công thức chung mình đưa ra</span>
                                                                        </li>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Công thức tổng quát của câu bị động:</span>
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
                                                                        style={{fontSize: '14px'}}><strong>Câu điều kiện</strong></span>
                                                                    </p>
                                                                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                                                                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                                                                </td>
                                                                <td style={{width: '415px', height: '303px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Cũng như câu bị động, câu điều kiện là phần thiết yếu của bài thi TOEIC. Đối với tiêu chí ở mức điểm này, bạn cần nắm được cấu trúc cơ bản của 3 loại câu điều kiện cơ bản: loại 1, loại 2 và loại 3.</span>
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
                                                                                            style={{fontSize: '14px'}}>Loại 1</span>
                                                                                    </p>
                                                                                </td>
                                                                                <td style={{width: '329px'}}>
                                                                                    <ol style={{listStyleType: 'upper-roman'}}>
                                                                                        <li style={{textAlign: 'justify'}}>
                                                                                            <span
                                                                                                style={{fontSize: '14px'}}>f + S + V(s,es), S + will/can/shall + V (nguyên thể)</span>
                                                                                        </li>
                                                                                    </ol>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{width: '58px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>Loại 2</span>
                                                                                    </p>
                                                                                </td>
                                                                                <td style={{width: '329px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>If + S + Ved, S +would/ could/ should + V (nguyên thể)</span>
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{width: '58px'}}>
                                                                                    <p style={{textAlign: 'justify'}}>
                                                                                        <span
                                                                                            style={{fontSize: '14px'}}>Loại 3</span>
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
                                                                        style={{fontSize: '14px'}}><strong>Mệnh đề quan hệ</strong></span>
                                                                    </p>
                                                                </td>
                                                                <td style={{width: '415px', height: '162px'}}>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Đại từ quan hệ, mệnh đề quan hệ là phần có thể nói khá phức tạp trong phần ngữ pháp. Ở bất cứ đề thi TOEIC nào bạn cũng có thể bắt gặp nội dung này. Vì vậy, mình mong rằng bạn có thể nắm được kiến thức cơ bản của phần này. Ở mức điểm này, bạn nên tập trung cách dùng của 3 loại đại từ quan hệ sau:</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Who: ĐTQH thay thế cho danh từ người, làm chủ ngữ hoặc tân ngữ.</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{
                                                                        marginLeft: '17.1pt',
                                                                        textAlign: 'justify'
                                                                    }}><span style={{fontSize: '14px'}}>Ex: I would like to thank Mrs. Song, <u>who</u> has agreed to give an opening speech at our annual conference. (who thay thế cho Mrs. Song).</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>Which: ĐTQH thay thế cho danh từ chỉ vật, làm chủ ngữ hoặc tân ngữ.</span>
                                                                        </li>
                                                                    </ul>
                                                                    <p style={{textAlign: 'justify'}}><span
                                                                        style={{fontSize: '14px'}}>Ex: Do you see the coffee shop&nbsp;
                                                                        <em><u>which</u></em>&nbsp;was located on Nguyen Huu Huan street?</span>
                                                                    </p>
                                                                    <ul>
                                                                        <li style={{textAlign: 'justify'}}><span
                                                                            style={{fontSize: '14px'}}>That: ĐTQH thay thế được cho cả người và vật.</span>
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
                                                            style={{fontSize: '16px'}}><strong>B. TỪ VỰNG</strong></span><br/>
                                                        <span style={{fontSize: '14px'}}><em>Bạn có thể tham khảo cuốn Very easy TOEIC để học từ vựng nhé. </em></span>
                                                        <span style={{fontSize: '14px'}}><em>Chúng ta sẽ cần lưu ý đến hình thức, vị trí và chức năng của 4 từ loại quan trọng bậc nhất trong câu. Đó là:</em></span>
                                                        <div>
                                                            <ul>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Danh từ</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Tính từ</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Động từ</span></li>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}>Trạng từ</span></li>
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
                                                                                style={{fontSize: '16px'}}><strong>Từ loại</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{
                                                                            width: '432px',
                                                                            backgroundColor: 'rgb(255, 153, 51)'
                                                                        }}>
                                                                            <p style={{textAlign: 'center'}}><span
                                                                                style={{fontSize: '16px'}}><strong>Chức năng cơ bản và dấu hiệu nhận biết chung</strong></span>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{width: '126px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Danh từ</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Chức năng: </strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đóng chức năng là chủ ngữ, tân ngữ trong câu.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Dấu hiệu nhận biết:</strong> thường là những từ có “ending - đuôi” như sau:</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đuôi danh từ sự vật, sự việc phổ biến:</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}>-tion, -ation, -ment, -ing, -age, -ship, -ism, -ity, -ness.</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đuôi danh từ chỉ người phổ biến:</span>
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
                                                                                style={{fontSize: '14px'}}><strong>Tính từ</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px', height: '138px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Chức năng:</strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đứng trước danh từ bổ nghĩa cho danh từ.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đứng sau Tobe.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{
                                                                                marginLeft: '-0.9pt',
                                                                                textAlign: 'justify'
                                                                            }}><span style={{fontSize: '14px'}}><strong>Dấu hiệu nhận biết:</strong> thường là những từ có “ending - đuôi” như sau:</span>
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
                                                                                style={{fontSize: '14px'}}><strong>Động từ</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Chức năng: </strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Diễn tả hành động, trạng thái của chủ ngữ.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Có hai loại: động từ thường và động từ Tobe.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{
                                                                                marginLeft: '-0.9pt',
                                                                                textAlign: 'justify'
                                                                            }}><span style={{fontSize: '14px'}}><strong>Dấu hiệu nhận biết:</strong> thường là những từ có “ending - đuôi” như sau:</span>
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
                                                                                style={{fontSize: '14px'}}><strong>Trạng ngữ</strong></span>
                                                                            </p>
                                                                        </td>
                                                                        <td style={{width: '432px'}}>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Chức năng:</strong></span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đứng trước hoặc sau động từ để bổ nghĩa cho động từ.</span>
                                                                                </li>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Đứng trước tính từ, sau tobe để bổ nghĩa cho tính từ.</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p style={{textAlign: 'justify'}}><span
                                                                                style={{fontSize: '14px'}}><strong>Dấu hiệu nhận biết: </strong>thường là những từ có “ending - đuôi” như sau:</span>
                                                                            </p>
                                                                            <ul>
                                                                                <li style={{textAlign: 'justify'}}><span
                                                                                    style={{fontSize: '14px'}}>Trạng từ có kết cấu khá đơn giản: <strong>ADV = ADJ + ly</strong>. (Bạn chỉ cần thêm đuôi –ly vào sau tính từ).</span>
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
                                                                    style={{fontSize: '14px'}}><strong>Tổng quan: </strong></span>
                                                                </li>
                                                            </ul>
                                                            <p style={{textAlign: 'justify'}}><span
                                                                style={{fontSize: '14px'}}>Ở giai đoạn vô cùng cơ bản này, bạn đừng vội luyện đề thi TOEIC cả 4 phần nghe nhé. Sẽ nhanh chóng bị choáng và sợ đó. Thay vì đó, hãy nghe những file nghe đơn giản, nhưng có liên quan đến phần thi TOEIC. Như bạn đã biết, phần Part 1 (Mô tả tranh) và Part 2 (Hỏi – Đáp) là hai phần dễ nhất trong đề thi. Do đó bạn nên tập trung vào hai phần dễ này để kiếm điểm nhé.</span>
                                                            </p>
                                                            <ul>
                                                                <li style={{textAlign: 'justify'}}><span
                                                                    style={{fontSize: '14px'}}><strong>Phương pháp luyện nghe:</strong></span>
                                                                </li>
                                                            </ul>
                                                            <p style={{textAlign: 'justify'}}><span
                                                                style={{fontSize: '14px'}}>Phương pháp Nghe - Chép chính tả là phương pháp được chọn lựa nhiều nhất. Nghe có vẻ cũng nan giải phải không? Ban đầu khi chưa chép được những câu dài thì bạn có thể dùng phương pháp “take-note”. Nghĩa là hãy ghi tất cả những từ mình nghe được ra giấy, cứ dần dần bạn sẽ chép được cả câu đó. mình cam đoan với bạn rằng phương pháp này sẽ vô cùng hiệu quả cho việc nghe của bạn đó. Bên cạnh đó, kĩ năng nghe yêu cầu khả năng phản xạ với tiếng Anh. Vậy nên, bạn hãy dành mỗi ngày ít nhất 30 phút để luyện nghe cho quen tai nhé.</span>
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