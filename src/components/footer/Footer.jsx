import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Phòng khám mắt Văn Minh</h2>
                                <p>
                                    Chào mừng bạn đến với phòng khám mắt Văn Minh. Với trang thiết bị hiện đại và đội ngũ nhân viên chuyên nghiệp, chúng tôi cam kêt mang đến sự hài lòng tuyệt đối cho quý khách.
                                </p>
                            </div>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft ">
                                <li className="ftco-animate">
                                    <a href="#">
                                        <span className="icon-twitter" />
                                    </a>
                                </li>
                                <li className="ftco-animate">
                                    <a href="#">
                                        <span className="icon-facebook" />
                                    </a>
                                </li>
                                <li className="ftco-animate">
                                    <a href="#">
                                        <span className="icon-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Xem ngay</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/" className="py-2 d-block">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/services" className="py-2 d-block">
                                            Dịch vụ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/waiting-list' className="py-2 d-block">
                                            Hàng chờ
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                       
                        <div className="col-md-4">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Văn phòng</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li>
                                            <span className="icon icon-map-marker" />
                                            <span className="text">
                                            28 Lê Lợi - thành phố Huế
                                            </span>
                                        </li>
                                        <li>
                                            
                                                <span className="icon icon-phone" />
                                                <span className="text">0836-902-222</span>
                                           
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </footer>
  )
}
