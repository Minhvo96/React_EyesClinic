import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import Swal from 'sweetalert2';


export default function WaitingPatients() {
  
  const [status, setStatus] = useState(false)
  const [bookingList, setBookingList] = useState([])
  const [defaultDate, setDefaultDate] = useState('');

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

    if(status == 'cancel') {
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
     if(status == 'true') {
      const newBooking = {
        ...booking,
        "status": "EXAMINING"
      }
  
      await handleUpdateBookingList(newBooking)
     }


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
    <div className="container mr-3" style={{position: 'fixed',
    zIndex: '20',
    marginTop: '160px',
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
                        <td>{booking.timeBooking}</td>
                        <td>
                          <select className='form-control' value={count == 1 && status ? 'true' : 'false'} onChange={(e) => handleChangeStatus(e, booking.id, count)}>
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
