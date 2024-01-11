import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


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

      await handleUpdateBookingList(newBooking);
    }


  }

  const handleChangeStatusExamining = (id) => {
    handleChangeStatusBooking(id, 'true');
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

  const [currentPage, setCurrentPage] = useState(0);
  const appointmentsPerPage = 5;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastAppointment = (currentPage + 1) * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookingList.slice(indexOfFirstAppointment, indexOfLastAppointment);


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
    <div className='container-fluid'>
      <div className='d-flex mb-5 align-items-center'>
        <h6 className='mr-3'>Chọn ngày: </h6>
        <div className='col-3 '>
          <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate} />
        </div>
      </div>
      {
        bookingList.length ?
          <>
            <table className="table">
              <thead className="thead-primary">
                <tr className='text-center'>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Ngày khám</th>
                  <th>Giờ khám</th>
                  <th>Trạng thái</th>
                  <th>Xem bệnh án</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentAppointments
                    .sort((a, b) => {
                      return a.timeBooking.localeCompare(b.timeBooking);
                    })
                    .map((booking, index) => {
                      const count = indexOfFirstAppointment + 1 + index;
                      return (
                        <tr key={booking.id} className='text-center'>
                          <td>{count}</td>
                          <td>{booking.customer.user.fullName}</td>
                          <td>{booking.customer.user.phoneNumber}</td>
                          <td>{booking.dateBooking}</td>
                          <td>{booking.timeBooking}</td>
                          <td>
                            <select className='form-control text-center' value={status ? 'true' : 'false'} onChange={(e) => handleChangeStatus(e, booking.id, count)}>
                              <option value="true">{booking.status == 'WAITING' ? "Chờ khám" : "Đang khám"}</option>
                              {/* <option value="false"></option> */}
                              <option value="cancel">Hủy</option>
                            </select>
                          </td>
                          <td className="border-bottom-0">
                            <div className="d-flex align-items-center justify-content-center">
                              <NavLink to={`/assistant/${booking.id}`}>
                                <button className="btn btn-outline-success d-flex justify-content-center align-items-center"
                                  style={{ width: "36px", height: "36px" }}
                                  onClick={() => handleChangeStatusExamining(booking.id)}
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
            <div className="pagination-container">
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
          </>
          :
          <div><p className='text-danger'>Danh sách hôm nay đang trống</p></div>
      }
    </div>
  )
}
