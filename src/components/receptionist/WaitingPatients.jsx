import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import Swal from 'sweetalert2';


export default function WaitingPatients() {
  

  const [bookingList, setBookingList] = useState([])
  const [defaultDate, setDefaultDate] = useState('');
  const [timeBooking, setTimeBooking] = useState(["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])

  const getAllBookingList = async () => {
    const bookings = await bookingService.getAllBookings();
    
    const bookingsFilter = bookings.filter((booking) => booking.status == "WAITING" && booking.dateBooking == defaultDate)

    setBookingList(bookingsFilter);


  }

  const handleChangeListByDate = async (e) => {
    const bookings = await bookingService.getAllBookings();
    const bookingsFilter = bookings.filter((booking) => booking.status == "WAITING" && booking.dateBooking == e.target.value)
    setBookingList(bookingsFilter);
  }

  const handleChangeStatus = (e, id) => {
    if (e.target.value == 'cancel') {
      handleChangeStatusBooking(id)
    }
  }

  const handleChangeStatusBooking = async (id) => {
    const booking = await bookingService.getBookingById(id);
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

    await bookingService.editBooking(obj.id, obj)

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
    <div className="container mr-3" style={{position: 'fixed',
    zIndex: '20',
    marginTop: '100px',
    paddingRight: '50px'
                    }}>
      <div className='d-flex mb-5 align-items-center'>
        <h6 className='mr-3'>Chọn ngày: </h6>
        <div className='col-3 '>
          <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate} />
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
                <th className='text-center'>Trạng thái</th>
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
                      <tr key={booking.id}>
                        <td>{count}</td>
                        <td>{booking.customer.user.fullName}</td>
                        <td>{booking.customer.user.phoneNumber}</td>
                        <td>{booking.dateBooking}</td>
                        <td>
                          <select className='form-control' name="timeBooking" id="" defaultValue={booking.timeBooking} onChange={(e) => handleChangeTimeBooking(e, booking.id)}>
                            {
                              timeBooking.map((time, index) => {
                                return (
                                  <option key={index} value={time}>{time}</option>
                                )

                              })
                            }
                          </select>

                        </td>
                        <td>
                          <select className='form-control' value={count == 1 ? 'true' : 'false'} onChange={(e) => handleChangeStatus(e, booking.id)}>
                            <option value="true">Đang khám</option>
                            <option value="false">Chờ khám</option>
                            <option value="cancel">Hủy</option>
                          </select>

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
  )
}
