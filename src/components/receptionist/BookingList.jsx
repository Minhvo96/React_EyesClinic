import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import bookingService from '../../services/bookingServices';
import eyeCategoriesService from '../../services/eyeCategoriesServices';
import Swal from 'sweetalert2'
import Pagination from '../pagination/pagination';
import SockJS from 'sockjs-client';
import UsingWebSocket from '../../Socket';
import ReactPaginate from 'react-paginate';



export default function BookingList() {

    const [defaultDate, setDefaultDate] = useState('');
    const [booking, setBooking] = useState({})
    const [bookingUp, setBookingUp] = useState({})
    const [bookingList, setBookingList] = useState([])
    const [bookingListByTime, setBookingListByTime] = useState([])
    const [eyeCategories, setEyeCategories] = useState([])
    const [eyeCategory, setEyeCategory] = useState({})
    const [times, setTimes] = useState(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])
    const [timesMorning, setTimeMorning] = useState(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"])
    const [timesAfternoon, setTimesAfternoon] = useState(["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])
    const [timesFreeBooking, setTimesFreeBooking] = useState([])
    const [minDate, setMinDate] = useState();
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false)
    const [selectedTime, setSelectedTime] = useState('all');

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        setDefaultDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);

    };

    const getAllBookingList = async () => {
        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: String(defaultDate),
            status: ""
        };
        const bookingsPending = await bookingService.getBookingByStatusPendingAndDate(newBooking);
        setBookingList(bookingsPending);
        setLoading(false);
    }

    const handleChangeListByDate = async (e) => {
        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: String(e.target.value),
            status: ""
        };
        const bookingsPending = await bookingService.getBookingByStatusPendingAndDate(newBooking);
        setBookingList(bookingsPending);
    }

    const getBookingById = async (id) => {
        const booking = await bookingService.getBookingById(id);
        setBooking(booking)
        setTimesFreeByDate(booking.dateBooking)
    }

    const setTimesFreeByDate = async (dateBooking) => {

        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: String(dateBooking),
            status: ""
        };

        const bookingsWaiting = await bookingService.getBookingByStatusWaitingAndDate(newBooking);
        const listTimeBooked = bookingsWaiting.map(item => item.timeBooking)

        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        if (new Date(dateBooking) > currentDate) {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item));;
            setTimesFreeBooking(listTimeFreeBooking)

        }
        else {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item) && item.localeCompare(formattedTime) > 0);
            setTimesFreeBooking(listTimeFreeBooking)

        }
    }

    const getAllEyeCategories = async () => {
        const categories = await eyeCategoriesService.getAllEyeCategories()
        setEyeCategories(categories)
    }

    const getEyeCategoryById = async (e) => {
        const eyeCategory = await eyeCategoriesService.getEyeCategoryById(e.target.value);
        setEyeCategory(eyeCategory)
    }

    const handleChangeCategory = () => {
        if (Object.keys(eyeCategory).length) {

            if (Object.keys(bookingUp).length) {

                const bookingNew = {
                    ...bookingUp,
                    "eyeCategory": {
                        "id": eyeCategory.id,

                    }
                };

                setBookingUp(bookingNew)
            }
            else {
                const bookingNew = {
                    ...booking,
                    "eyeCategory": {
                        "id": eyeCategory.id,

                    }
                };

                setBookingUp(bookingNew)
            }
        }


    }

    const handleChangeBooking = async (e) => {
        if (Object.keys(bookingUp).length) {
            if (e.target.name == 'dateBooking') {

                const dateBooking = e.target.value;

                setTimesFreeByDate(dateBooking)

                const bookingNew = {
                    ...bookingUp,
                    [e.target.name]: e.target.value,

                }
                setBookingUp(bookingNew)


            }
            else {
                const bookingNew = {
                    ...bookingUp,
                    [e.target.name]: e.target.value,

                }
                setBookingUp(bookingNew)
            }

        }
        else {
            if (e.target.name == 'dateBooking') {
                const dateBooking = e.target.value;

                setTimesFreeByDate(dateBooking)
                const bookingNew = {
                    ...booking,
                    [e.target.name]: e.target.value
                }

                setBookingUp(bookingNew)
            }
            else {
                const bookingNew = {
                    ...booking,
                    [e.target.name]: e.target.value
                }

                setBookingUp(bookingNew)
            }

        }

    }

    const handleUpdateBooking = async () => {
        console.log(bookingUp);
        await handleUpdateBookingList(bookingUp)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cập Nhật Thành Công !',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const handleUpdateBookingList = async (obj) => {

        const newBooking = {
            idEyeCategory: String(obj.eyeCategory.id),
            idCustomer: String(obj.customer.id),
            timeBooking: obj.timeBooking,
            dateBooking: obj.dateBooking,
            status: obj.status,
            message: obj.message
        };

        const bookingUp = await bookingService.editBooking(newBooking, obj.id)

        const index = bookingList.findIndex(item => item.id === obj.id)

        const newBookings = [...bookingList]
        newBookings[index] = bookingUp

        setBookingList(newBookings)
        setBooking({})
        setBookingUp({})
    }

    const deleteBookingById = (bookingId) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn hủy lịch hẹn khám này chứ?',
            showCancelButton: true,
            confirmButtonText: 'Hủy',
            cancelButtonText: 'Không'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const booking = await bookingService.getBookingById(bookingId);
                const newBooking = {
                    ...booking,
                    "status": "CANCELLED"
                }

                await handleUpdateBookingList(newBooking)
                Swal.fire('Hủy thành công!', '', 'success')
                setBookingList((booking) => booking.filter((booking) => booking.id !== bookingId))
            }
        })
    }

    const handleChangeStatusBooking = async (id) => {
        Swal.fire({
            title: 'Xác nhận khám lịch hẹn này?',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const booking = await bookingService.getBookingById(id);
                const newBooking = {
                    ...booking,
                    "status": "WAITING"
                }

                await handleUpdateBookingList(newBooking)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Xác Nhận Thành Công !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setBookingList((booking) => booking.filter((booking) => booking.id !== id))
            }
        })
    }

    const resetBooking = () => {
        setBooking({})
    }

    const handleChangeListBookingByTime = (time) => {
        setSelectedTime(time);

        if (time === 'all') {
            setBookingListByTime(bookingList);
        }
        else if (time === 'morning') {
            setBookingListByTime(bookingList.filter(item => timesMorning.includes(item.timeBooking)));
        }
        else if (time === 'afternoon') {
            setBookingListByTime(bookingList.filter(item => timesAfternoon.includes(item.timeBooking)));
        }
    };


    useEffect(() => {

        setBookingListByTime(bookingList);
    }, [bookingList])

    useEffect(() => {
        handleChangeCategory()
    }, [eyeCategory])

    useEffect(() => {
        getAllEyeCategories();
        getTodayDate();
        UsingWebSocket(setRender, render);
    }, [])

    useEffect(() => {
        if (defaultDate) {
            getAllBookingList()
            console.log(render);
        }

    }, [render])

    useEffect(() => {
        if (defaultDate) {
            getAllBookingList()
        }
    }, [defaultDate])

    const [currentPage, setCurrentPage] = useState(0);
    const appointmentsPerPage = 5;

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastAppointment = (currentPage + 1) * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

    const currentAppointments = bookingListByTime.sort((a, b) => {
        return a.timeBooking.localeCompare(b.timeBooking);
    }).slice(indexOfFirstAppointment, indexOfLastAppointment);

    return (
        <>
            <div className="container-fluid" >
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title fw-semibold mb-4">Danh sách hẹn khám</h5>
                </div>
                <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <h6 className='mr-3'>Chọn ngày: </h6>
                                    <div className='col-7 '>
                                        <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate} min={defaultDate} />
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-4' >
                                    <div>
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={() => handleChangeListBookingByTime('all')}
                                            style={{
                                                backgroundColor: selectedTime === 'all' ? '#007bff' : 'initial',
                                                color: selectedTime === 'all' ? '#fff' : 'initial'
                                            }}
                                        >
                                            Tất cả
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={() => handleChangeListBookingByTime('morning')}
                                            style={{
                                                backgroundColor: selectedTime === 'morning' ? '#007bff' : 'initial',
                                                color: selectedTime === 'morning' ? '#fff' : 'initial'
                                            }}
                                        >
                                            Sáng
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={() => handleChangeListBookingByTime('afternoon')}
                                            style={{
                                                backgroundColor: selectedTime === 'afternoon' ? '#007bff' : 'initial',
                                                color: selectedTime === 'afternoon' ? '#fff' : 'initial'
                                            }}
                                        >
                                            Chiều
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="card-body p-2">
                            {
                                loading ? (<span className="loader"></span>) :
                                    bookingListByTime.length ?
                                        <>
                                            <table className="table">
                                                <thead className="thead-primary">
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Họ và tên</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Ngày khám</th>
                                                        <th>Giờ khám</th>
                                                        <th className='text-center'>Dịch vụ</th>
                                                        <th className='col-4 text-center'>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentAppointments
                                                            .map((booking, index) => {
                                                                const count = index + 1 + indexOfFirstAppointment;
                                                                return (
                                                                    <tr key={booking.id}>
                                                                        <td className='text-center'>{count}</td>
                                                                        <td>{booking.customer.user.fullName}</td>
                                                                        <td>{booking.customer.user.phoneNumber}</td>
                                                                        <td>{booking.dateBooking}</td>
                                                                        <td className='text-center'>{booking.timeBooking}</td>
                                                                        <td className='text-center'>{booking.eyeCategory.nameCategory}</td>
                                                                        <td className='text-center'>
                                                                            <button className='btn btn-warning mr-2' type="button" data-toggle="modal" data-target="#exampleModal" onClick={() => getBookingById(booking.id)}>Sửa</button>
                                                                            <button className='btn btn-danger mr-2' onClick={() => deleteBookingById(booking.id)}>Hủy</button>
                                                                            <button className='btn btn-success' onClick={() => handleChangeStatusBooking(booking.id)}>Xác nhận khám</button>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                    }
                                                </tbody>
                                            </table>
                                        </>
                                        :
                                        <div className='m-4'>
                                            <div className='d-flex align-items-center justify-content-center gap-4' style={{flexDirection:"column"}}>
                                                <div>
                                                    <i class="fa-regular fa-calendar-xmark text-danger" style={{fontSize:"124px"}}></i>
                                                </div>
                                                <span className='fw-semibold' style={{fontSize:"32px"}}>Danh sách hôm nay đang trống!</span>
                                            </div>                             
                                        </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="pagination-container" style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }} >
                    <ReactPaginate
                        pageCount={Math.ceil(bookingList.length / appointmentsPerPage)}
                        pageRangeDisplayed={5} // Số lượng trang hiển thị
                        marginPagesDisplayed={2} // Số lượng trang được hiển thị ở đầu và cuối
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                    />
                </div>

            </div>
            {/* <// Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Thay đổi thông tin lịch hẹn</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={resetBooking}></button>
                        </div>
                        <div className="modal-body">
                            {
                                Object.keys(booking).length &&
                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label>Họ và tên</label>
                                            <input type="text"
                                                className='form-control'
                                                value={booking.customer.user.fullName}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Số điện thoại</label>
                                            <input type="text"
                                                className='form-control'
                                                value={booking.customer.user.phoneNumber}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label>Ngày khám</label>
                                            <input type="date"
                                                className='form-control'
                                                name='dateBooking'
                                                defaultValue={booking.dateBooking}
                                                min={defaultDate}
                                                onChange={handleChangeBooking}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Dịch vụ</label>
                                            <select name="eyeCategory" id="categorySelect" className='form-control' onChange={getEyeCategoryById}>
                                                <option value={booking.eyeCategory.id}>{booking.eyeCategory.nameCategory}</option>
                                                {
                                                    eyeCategories.map((category) => {
                                                        if (category.nameCategory != booking.eyeCategory.nameCategory) {
                                                            return (
                                                                <option value={category.id} key={category.id}>{category.nameCategory}</option>
                                                            )
                                                        }

                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Giờ khám</label>
                                            <select className='form-control' name="timeBooking" id="" onChange={handleChangeBooking} >
                                                {
                                                    timesFreeBooking.map((time, index) => {
                                                        return (
                                                            <option key={index} value={time} selected={time == booking.timeBooking ? true : false}>{time}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Lý do thay đổi</label>
                                            <input type="text"
                                                className='form-control'
                                                name='message'
                                                onChange={handleChangeBooking}
                                            />
                                        </div>
                                    </div>
                                </div>

                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetBooking}>Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleUpdateBooking}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
