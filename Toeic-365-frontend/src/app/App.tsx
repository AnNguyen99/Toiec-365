import React from 'react';

import "./css/bootstrap.min.scoped.css"
import "./css/App.scoped.css";

import NavbarComponent from "../components/user/home/navbar.component";
import { Link } from 'react-router-dom';


function App() {


    return (
        <>
            <NavbarComponent/>
            <div className="container intro">
                <div className="row">
                    <div className="col-md-6">
                        <div className="onlinetoic">
                            <h1 className="onlinetoic_one">ONLINE TOEIC TEST - Thi Thử <br/> TOEIC Online Miễn Phí</h1>
                        </div>
                        <div className="slogantoic slogantoic-one"> Đề thi thử TOEIC được thực hiện theo format mới, có
                            chấm điểm và
                            hiển thị chi tiết đề thi giúp bạn đánh giá chính xác điểm TOEIC hiện tại đặc biệt website dễ sử
                            dụng và hoàn
                            toàn miễn phí phù hợp với tất cả mọi người
                        </div>
                    </div>
                </div>
            </div>
            <div className="container about">
                <div className="row">
                    <div className="col-md-6">
                        <div className="left-content">
                            <div className="right-img">
                                <img src="https://preview.colorlib.com/theme/courses/assets/img/gallery/about3.png"
                                     alt="about" width="100%" height="100%"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right-content">
                            <div className="section-tittle section-tittle2 mb-20">
                                <div className="front-text">
                                    <h4>Trang web này cung cấp các bài thi thực hành tương tác cho bài thi TOEIC Listening và Reading</h4>
                                    <h4>Trang web này sẽ giúp bạn: </h4>
                                </div>
                            </div>
                            <div className="single-features">
                                <div className="features-icon">
                                    <i className="pi pi-check" style={{'fontSize': '1.5rem', color: '#42BF80', fontWeight: 'bold'}} />
                                </div>
                                <div className="features-caption">
                                    <p>Phát triển kỹ năng làm bài kiểm tra của bạn.</p>
                                </div>
                            </div>
                            <div className="single-features">
                                <div className="features-icon">
                                    <i className="pi pi-check" style={{'fontSize': '1.5rem', color: '#42BF80', fontWeight: 'bold'}} />
                                </div>
                                <div className="features-caption">
                                    <p>Xác định các lĩnh vực cần cải thiện.</p>
                                </div>
                            </div>
                            <div className="single-features">
                                <div className="features-icon">
                                    <i className="pi pi-check" style={{'fontSize': '1.5rem', color: '#42BF80', fontWeight: 'bold'}} />
                                </div>
                                <div className="features-caption">
                                    <p>Mở rộng ngữ pháp và vốn từ vựng của bạn.</p>
                                </div>
                            </div>
                            <div className="single-features">
                                <div className="features-icon">
                                    <i className="pi pi-check" style={{'fontSize': '1.5rem', color: '#42BF80', fontWeight: 'bold'}} />
                                </div>
                                <div className="features-caption">
                                    <p>Cải thiện sự tự tin của bạn.</p>
                                </div>
                            </div>
                            <div className="single-features">
                                <div className="features-icon">
                                    <i className="pi pi-check" style={{'fontSize': '1.5rem', color: '#42BF80', fontWeight: 'bold'}} />
                                </div>
                                <div className="features-caption">
                                    <p>Xem điểm TOEIC ước tính của bạn!.</p>
                                </div>
                            </div>
                        </div>
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

export default App;

