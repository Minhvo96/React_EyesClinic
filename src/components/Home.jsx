import React, { useEffect } from 'react'
import Navbar from './navbar/Navbar'
import Slide from './slide/Slide'
import BookingForm from './bookingForm/BookingForm'
import Services from './services/Services'
import Review from './reviews/Review'
import Footer from './footer/Footer'
import AboutDoctor from './aboutDoctor/AboutDoctor'
import UseEffectForRender from '../UseEffect'

export default function Home() {

    useEffect(() => {
        UseEffectForRender()
    }, []);

    const scrollToBookingForm = () => {
        const element = document.getElementById("booking-form");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <Navbar />
            <Slide />
            <BookingForm />
            <Services />
            <AboutDoctor />
            <Review />
            <Footer />

            {/* loader */}
            <div id="ftco-loader" className="show fullscreen">

            </div>
            {/* Modal */}
            <div
                className="modal fade"
                id="modalRequest"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modalRequestLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalRequestLabel">
                                Đặt lịch hẹn
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="#">
                                <div className="form-group">
                                    {/* <label for="appointment_name" class="text-black">Full Name</label> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="appointment_name"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="form-group">
                                    {/* <label for="appointment_email" class="text-black">Email</label> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="appointment_email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {/* <label for="appointment_date" class="text-black">Date</label> */}
                                            <input
                                                type="text"
                                                className="form-control appointment_date"
                                                placeholder="Date"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {/* <label for="appointment_time" class="text-black">Time</label> */}
                                            <input
                                                type="text"
                                                className="form-control appointment_time"
                                                placeholder="Time"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    {/* <label for="appointment_message" class="text-black">Message</label> */}
                                    <textarea
                                        name=""
                                        id="appointment_message"
                                        className="form-control"
                                        cols={30}
                                        rows={10}
                                        placeholder="Message"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        defaultValue="Make an Appointment"
                                        className="btn btn-primary"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }} className='btn btn-primary d-flex' onClick={scrollToBookingForm}>
                <i className="fa-solid fa-comment-medical" style={{ fontSize: "42px" }}></i>
            </div>
        </>


    )
}
