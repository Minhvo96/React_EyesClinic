import axios from 'axios'
import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import eyeCategoriesService from '../../services/eyeCategoriesServices';
import Swal from 'sweetalert2'


export default function BookingList() {
  
    
    const [defaultDate, setDefaultDate] = useState('');
    const [booking, setBooking] = useState({})
    const [bookingUp, setBookingUp] = useState({})
    const [bookingList, setBookingList] = useState([])
    const [eyeCategories, setEyeCategories] = useState([])
    const [eyeCategory, setEyeCategory] = useState({})
    const [timeBooking, setTimeBooking] = useState(["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"])


    const getAllBookingList = async () => {
        const bookings = await bookingService.getAllBookings();
        const bookingsFilter = bookings.filter((booking) => booking.status == "PENDING")
        setBookingList(bookingsFilter);
    }

    const handleChangeListByDate = async (e) => {
        const bookings = await bookingService.getAllBookings();
        const bookingsFilter = bookings.filter((booking) => booking.status == "PENDING" && booking.dateBooking == e.target.value)
        console.log(bookingsFilter);
        setBookingList(bookingsFilter);
      }

    const getBookingById = async (id) => {
        const booking = await bookingService.getBookingById(id);
        setBooking(booking)
        
    }

    const getAllEyeCategories = async () => {
        const categories = await eyeCategoriesService.getAllEyeCategories()
        setEyeCategories(categories)
    }

    const getEyeCategoryById = async (e) => {
        const eyeCategory = await eyeCategoriesService.getEyeCategoryById(e.target.value);
        setEyeCategory(eyeCategory)
    }

    const handleChangeCategory =() => { 
        if(Object.keys(eyeCategory).length) {

            if(Object.keys(bookingUp).length) {

            const bookingNew = {...bookingUp,
                "eyeCategory": {
                    "id": eyeCategory.id,
                    "nameCategory": eyeCategory.nameCategory,
                    "price": eyeCategory.price,
                    "description": eyeCategory.description
                  }
            };

            setBookingUp(bookingNew)
        }
        else {
            const bookingNew = {...booking,
                "eyeCategory": {
                    "id": eyeCategory.id,
                    "nameCategory": eyeCategory.nameCategory,
                    "price": eyeCategory.price,
                    "description": eyeCategory.description
                  }
            };

            setBookingUp(bookingNew)
        }}
        

    }

    const handleChangeBooking = (e) => {
        if(Object.keys(bookingUp).length) {
            const bookingNew = {
                ...bookingUp,
                [e.target.name]: e.target.value,
                
            }          
            console.log(bookingNew);
            setBookingUp(bookingNew)
        }
        else {
            const bookingNew = {
                ...booking,
                [e.target.name]: e.target.value
            }
            console.log(bookingNew);
            setBookingUp(bookingNew)
        }

    }

    const handleUpdateBooking = async () => {
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

        const bookingUp = await BookingApi.editBooking(obj.id, obj)

        const index = bookingList.findIndex(item => item.id === bookingUp.id)
       
        const newBookings = [...bookingList]
        newBookings[index] = bookingUp
       
        setBookingList(newBookings)
        setBooking({})
        setBookingUp({})
    }

    const deleteBookingById = (bookingId) => {
            Swal.fire({
                title: 'Bạn chắc chắn muốn xóa lịch hẹn khám này chứ?',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Không'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Xóa thành công!', '', 'success')
                    await BookingApi.deleteBooking(bookingId)
                    setBookingList((booking) => booking.filter((booking) => booking.id !== bookingId))
                }
            })
    }

    const handleChangeStatusBooking = async (id) => {
        const booking = await BookingApi.getBookingById(id);
        const newBooking = {...booking,
            "status": "WAITING"
        }

        console.log(newBooking);
        await handleUpdateBookingList(newBooking)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xác Nhận Thành Công !',
            showConfirmButton: false,
            timer: 1500
        })
        getAllBookingList()
    }

    const resetBooking = () => {
        setBooking({})
    }

    useEffect(() => {
        handleChangeCategory()
    },[eyeCategory])

    useEffect(() => {
        getAllBookingList()
        getAllEyeCategories()
    }, [])

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDefaultDate(formattedDate);
      }, []);

    return (
        <>
            <div className="container mr-3" style={{position: 'fixed',
                                                            zIndex: '20',
                                                            marginTop: '100px'
                                                                            }}>
                <div className='d-flex mb-5 align-items-center'>
                    <h6 className='mr-3'>Chọn ngày: </h6>
                    <div className='col-3 '>
                    <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate}/>
                    </div>
                </div>
                {
                    bookingList.length ?
                    <table className="table">
                    <thead className="thead-primary">
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Ngày khám</th>
                            <th>Giờ khám</th>
                            <th>Dịch vụ</th>
                            <th className='col-3 text-center'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingList.length > 0 && bookingList.map((booking, index) => {
                                const count = index + 1;
                                return (
                                    <tr key={booking.id}>
                                        <td>{count}</td>
                                        <td>{booking.customer.user.fullName}</td>
                                        <td>{booking.customer.user.phoneNumber}</td>
                                        <td>{booking.dateBooking}</td>
                                        <td>{booking.timeBooking}</td>
                                        <td>{booking.eyeCategory.nameCategory}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-warning mr-2' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getBookingById(booking.id)}>Sửa</button>
                                            <button className='btn btn-danger mr-2' onClick={() => deleteBookingById(booking.id)}>Xóa</button>
                                            <button className='btn btn-success' onClick={() => handleChangeStatusBooking(booking.id)}>Xác nhận khám</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                :
                <div><p className='text-danger'>Danh sách hôm nay đang trống</p></div>
                }
                
            </div>

            {/* <// Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Thay đổi thông tin lịch hẹn</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetBooking}></button>
                        </div>
                        <div className="modal-body">
                            {
                                Object.keys(booking).length &&
                                <div className="container">

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>ID</label>
                                        <input type="text"
                                            className='form-control'
                                            value={booking.id}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Họ và tên</label>
                                        <input type="text"
                                            className='form-control'
                                            value={booking.customer.user.fullName}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Số điện thoại</label>
                                        <input type="text"
                                            className='form-control'
                                            value={booking.customer.user.phoneNumber}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Dịch vụ</label>
                                        
                                        <select name="eyeCategory" id="categorySelect" className='form-control' onChange={getEyeCategoryById}>
                                            <option value={booking.eyeCategory.id}>{booking.eyeCategory.nameCategory}</option>
                                            {
                                                eyeCategories.map((category) => {
                                                    if(category.nameCategory != booking.eyeCategory.nameCategory) {
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
                                        <label>Ngày khám</label>
                                        <input type="date"
                                            className='form-control'
                                            name='dateBooking'
                                            defaultValue={booking.dateBooking}
                                            onChange={handleChangeBooking}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Giờ khám</label>
                                    
                                        <select className='form-control' name="timeBooking" id="" defaultValue={booking.timeBooking} onChange={handleChangeBooking}>
                                            {
                                                timeBooking.map((time, index) => {
                                                    return(
                                                        <option key={index} value={time}>{time}</option>
                                                    )
                                                    
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                         
                                }
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetBooking}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateBooking}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}
