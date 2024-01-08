import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';


export default function WaitingPay() {
  

  const [bookingList, setBookingList] = useState([])

  const getAllBookingList = async () => {
    const bookings = await bookingService.getAllBookings();

    const bookingsFilter = bookings.filter((booking) => booking.status == "UNPAID")

    setBookingList(bookingsFilter);

  }

  useEffect(() => {
    getAllBookingList()
  }, [])


  return (
    <div className="container mr-5" style={{position: 'fixed',
    zIndex: '20',
    marginTop: '100px'
                    }}>
      {
        bookingList.length ?
          <table className="table">
            <thead className="thead-primary">
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Tổng tiền</th>
                <th>Chi tiết hóa đơn</th>
              </tr>
            </thead>
            <tbody>
              {
                bookingList.map((pay) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>Nguyen Van A</td>
                      <td>0123456789</td>
                      <td>500.000 đ</td>
                      <td>
                        <button className='btn btn-primary'>Xem</button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
          :
          <div><p>Danh sach dang trong</p></div>
      }

    </div>
  )
}
