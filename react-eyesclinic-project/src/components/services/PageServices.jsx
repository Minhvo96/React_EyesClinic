import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Services from './Services'
import { Link } from 'react-router-dom'
import UseEffectForRender from '../../UseEffect'

export default function PageServices() {
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
                                    Dịch vụ chăm sóc mắt
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Services />
            <Footer />
        </>
    )
}
