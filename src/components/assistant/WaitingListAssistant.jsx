import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import addStyleDashboard from '../../AddStyleDashboard';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';


export default function WaitingListAssistant() {

  addStyleDashboard();

  const [status, setStatus] = useState(false)
  const [bookingList, setBookingList] = useState([])
  const [defaultDate, setDefaultDate] = useState('');
  const [timeBooking, setTimeBooking] = useState(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])

  const getAllBookingList = async () => {
    const bookings = await bookingService.getAllBookings();
    const bookingsFilter = bookings.filter((booking) => (booking.status == "WAITING" || booking.status == "EXAMINING") && booking.dateBooking == defaultDate)
    setBookingList(bookingsFilter);
  }

  const handleChangeListByDate = async (e) => {
    const bookings = await bookingService.getAllBookings();
    const bookingsFilter = bookings.filter((booking) => booking.status == "WAITING" || booking.status == "EXAMINING" && booking.dateBooking == e.target.value)
    setBookingList(bookingsFilter);
  }

  const handleChangeStatus = (e, id, count) => {
    if (e.target.value == 'cancel') {
      handleChangeStatusBooking(id, e.target.value)
    }

    if (e.target.value == 'true' && count == 1) {
      setStatus(true)
      handleChangeStatusBooking(id, e.target.value)
    }
  }

  const handleChangeStatusBooking = async (id, status) => {
    const booking = await bookingService.getBookingById(id);

    if (status == 'cancel') {
      const newBooking = {
        ...booking,
        "status": "CANCELLED"
      }

      await handleUpdateBookingList(newBooking)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Hủy Thành Công !',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if (status == 'true') {
      const newBooking = {
        ...booking,
        "status": "EXAMINING"
      }

      await handleUpdateBookingList(newBooking)
    }


  }

  const handleChangeTimeBooking = async (e, id) => {
    const booking = await bookingService.getBookingById(id);
    const newBooking = {
      ...booking,
      "timeBooking": e.target.value
    }

    await handleUpdateBookingList(newBooking)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sửa Giờ Khám Thành Công !',
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
      status: obj.status
    };

    await bookingService.editBooking(newBooking, obj.id)

    getAllBookingList()
  }

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDefaultDate(formattedDate);
  }, []);

  useEffect(() => {
    getAllBookingList()
  }, [defaultDate])

  return (
    <>
      <div className="d-flex row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Header />
        </div>
      </div>
      <div className='container'>
        <div className='d-flex mb-5 align-items-center mt-3'>
          <h6 className='mr-3'>Chọn ngày: </h6>
          <div className='col-3 '>
            <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate} />
          </div>
        </div>
        {
          bookingList.length ?
            <table className="table">
              <thead className="thead-primary">
                <tr className='text-center'>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Ngày khám</th>
                  <th>Giờ khám</th>
                  <th>Xem bệnh án</th>
                </tr>
              </thead>
              <tbody>
                {
                  bookingList
                    .sort((a, b) => {
                      return a.timeBooking.localeCompare(b.timeBooking);
                    })
                    .map((booking, index) => {
                      const count = index + 1;
                      return (
                        <tr key={booking.id} className='text-center'>
                          <td>{count}</td>
                          <td>{booking.customer.user.fullName}</td>
                          <td>{booking.customer.user.phoneNumber}</td>
                          <td>{booking.dateBooking}</td>
                          <td>
                            <select className='form-control' name="timeBooking" id="" defaultValue={booking.timeBooking} onChange={(e) => handleChangeTimeBooking(e, booking.id)}>
                              {
                                timeBooking.map((time, index) => {
                                  return (
                                    <option key={index} value={time} className='text-center'>{time}</option>
                                  )

                                })
                              }
                            </select>
                          </td>
                          <td className="border-bottom-0">
                            <div className="d-flex align-items-center justify-content-center">
                              <NavLink to={`/assistant/${booking.id}`}>
                                <button className="btn btn-outline-success d-flex justify-content-center align-items-center"
                                  style={{ width: "36px", height: "36px" }}
                                >
                                  <i className="ti ti-report-medical" style={{ fontSize: "18px" }}></i>
                                </button>
                              </NavLink>
                            </div>
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
    </>
  )
}
