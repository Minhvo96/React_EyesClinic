import React, { useEffect, useState } from 'react'
import UseEffectForRender from '../../UseEffect';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import UsingWebSocket2 from '../../Socket2';
import bookingService from '../../services/bookingServices';

export default function WaitingList() {
    const [bookings, setBookings] = useState([])
    const [times, setTimes] = useState(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])

    const getAllBookingList = async () => {

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const strDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: strDate,
            status: ""
        };
        const bookingsPending = await bookingService.getBookingByStatusWaitingOrExaminingAndDate(newBooking);
        setBookings(bookingsPending)

    }

    useEffect(() => {
        UseEffectForRender()
        UsingWebSocket2(setBookings)
        getAllBookingList()
    }, []);

    useEffect(() => {
        console.log(bookings);

    }, [bookings])

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
                                    Hàng chờ khám bệnh
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mt-5 mb-5">
                <div className='row'>
                    <div className='col-6'>
                        <p className='text-center text-danger font-weight-bold'>Danh sách Ưu tiên</p>
                        <table className="table table-bordered">
                            <thead className="thead-primary text-center">
                                <tr>
                                    <th>STT</th>
                                    <th>Họ và tên</th>
                                    <th>Giờ khám</th>

                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    bookings.length > 0 ?
                                        bookings.sort((a, b) => {
                                            return a.timeBooking.localeCompare(b.timeBooking);
                                        })
                                            .filter(item => times.includes(item.timeBooking))
                                            .map((item, index) => {
                                                const count = index + 1

                                                return (
                                                    <tr key={item.id}>
                                                        <td>{count}</td>
                                                        <td>{item.customer.user.fullName}</td>
                                                        <td>{item.timeBooking}</td>
                                                    </tr>)

                                            })
                                        :
                                        <p>Danh sách trống</p>
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='col-6'>
                        <p className='text-center font-weight-bold'>Danh sách Không đặt trước</p>
                        <table className="table table-bordered">
                            <thead className="thead-primary text-center">
                                <tr>
                                    <th>STT</th>
                                    <th>Họ và tên</th>
                                    <th>Giờ khám</th>

                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    bookings.length > 0 ?
                                        bookings.sort((a, b) => {
                                            return a.timeBooking.localeCompare(b.timeBooking);
                                        })
                                            .filter(item => !times.includes(item.timeBooking))
                                            .map((item, index) => {
                                                const count = index + 1
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{count}</td>
                                                        <td>{item.customer.user.fullName}</td>
                                                        <td>{item.timeBooking}</td>
                                                    </tr>)

                                            })
                                        :
                                        <p>Danh sách trống</p>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
