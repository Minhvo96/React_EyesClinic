import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom';
import UseEffectForRender from '../../UseEffect';

export default function History() {
    useEffect(() => {
        UseEffectForRender()
      }, []);

    return (
        <>
            <Navbar />
            <section className="home-slider owl-carousel">
                <div
                    className="slider-item bread-item"
                    style={{ backgroundImage: 'url("images/BSMinh4.jpg")' }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay" />
                    <div className="container" data-scrollax-parent="true">
                        <div className="row slider-text align-items-end">
                            <div className="col-md-7 col-sm-12 ftco-animate mb-5">
                                <p
                                    className="breadcrumbs"
                                    data-scrollax=" properties: { translateY: '70%', opacity: 1.6}"
                                >
                                    <span className="mr-2">
                                        <Link to="/">TRANG CHỦ</Link>
                                    </span>{" "}
                                </p>
                                <h1
                                    className="mb-3"
                                    data-scrollax=" properties: { translateY: '70%', opacity: .9}"
                                >
                                    Lịch sử khám bệnh
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mt-5 mb-5">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>STT</th>
                            <th>Ngày khám</th>
                            <th>Dịch vụ</th>
                            <th>Tổng thanh toán</th>
                            <th>Chi tiết hóa đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td style={{ cursor: 'pointer' }}><i className="icon-list text-primary"/> Nhấn để xem</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        


            <Footer />
        </>
    )
}
