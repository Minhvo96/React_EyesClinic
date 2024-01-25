import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import eyeCategoriesService from '../../services/eyeCategoriesServices';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import moment from 'moment';
import userService from '../../services/userService';
import { useAuthContext } from '../../context/AuthProvider';

const registerSchema = yup.object({
  fullName: yup.string().required("Bạn cần phải cung cấp họ và tên"),
  age: yup.number()
    .integer()
    .min(1934, "Năm sinh phải từ 1934")
    .max(2024, "Năm sinh pkhông vượt quá 2024")
    .required("Bạn cần phải cung cấp năm sinh")
    .typeError("Bạn cần phải cung cấp năm sinh"),
  address: yup.string().required("Bạn cần phải cung cấp địa chỉ"),
  phoneNumber: yup.string().required("Bạn cần phải cung cấp số điện thoại").matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ"),
  eyeCategory: yup.string().required('Vui lòng chọn dịch vụ khám'),
  message: yup.string()
})


export default function WaitingPatients() {
  const [bookingList, setBookingList] = useState([]);
  const [defaultDate, setDefaultDate] = useState('');
  const [eyeCategories, setEyeCategories] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [times, setTimes] = useState(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"])

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    criteriaMode: "all"
  })

  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    const user = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      role: 'ROLE_CUSTOMER',
      password: null,
      age: data.age
    }
    const idCustomer = await userService.createUser(user);

    const timeBooking = moment().format('HH:mm');
    const dateBooking = moment().format('YYYY-MM-DD')

    const bookingNew = {
      idEyeCategory: String(data.eyeCategory),
      idCustomer: idCustomer,
      timeBooking: timeBooking,
      dateBooking: dateBooking,
      status: "WAITING"
    }
    console.log(bookingNew);

    await bookingService.createBooking(bookingNew)
    reset()
    setReRender(true)
    document.getElementById('btn-submit').add
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đặt lịch hẹn thành công !',
      showConfirmButton: false,
      timer: 3500
    })
  }

  const getAllEyeCategories = async () => {
    const eyeCategories = await eyeCategoriesService.getAllEyeCategories();
    setEyeCategories(eyeCategories);
  }

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
    const bookingsPending = await bookingService.getBookingByStatusWaitingOrExaminingAndDate(newBooking);
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
    const bookingsPending = await bookingService.getBookingByStatusWaitingOrExaminingAndDate(newBooking);
    setBookingList(bookingsPending);
  }

  const handleChangeStatus = (e, id) => {
    if (e.target.value == 'cancel') {
      handleChangeStatusBooking(id, "CANCELLED")
    }
  }

  const handleChangeStatusExamining = (id) => {

    if (auth?.user?.roles === 'ROLE_DOCTOR' || auth?.user?.roles === 'ROLE_ASSISTANT' || auth?.user?.roles === "ROLE_ADMIN") {
      handleChangeStatusBooking(id, "EXAMINING")
      if (auth?.user?.roles === 'ROLE_DOCTOR' || auth?.user?.roles === "ROLE_ADMIN") {
        navigate(`/dashboard/doctor/${id}`);
      }
      if (auth?.user?.roles === 'ROLE_ASSISTANT' || auth?.user?.roles === "ROLE_ADMIN") {
        navigate(`/dashboard/assistant/${id}`);
      }
    } else {
      navigate('/error-403')
    }
  }

  const handleChangeStatusBooking = async (id, status) => {
    const booking = await bookingService.getBookingById(id);

    if (status == "CANCELLED") {
      const newBooking = {
        ...booking,
        "status": status
      }

      Swal.fire({
        title: 'Bạn chắc chắn muốn hủy lịch hẹn khám này chứ?',
        showCancelButton: true,
        confirmButtonText: 'Hủy',
        cancelButtonText: 'Không'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleUpdateBookingList(newBooking)
          Swal.fire('Hủy thành công!', '', 'success')

        }
      })
    }

    if (status == "EXAMINING") {
      const newBooking = {
        ...booking,
        "status": status
      }
      await handleUpdateBookingList(newBooking);
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
    setBookingList(bookingList => bookingList.filter((booking) => booking.id !== obj.id));

  }

  const [currentPage, setCurrentPage] = useState(0);
  const appointmentsPerPage = 5;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastAppointment = (currentPage + 1) * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookingList.sort((a, b) => {
    return a.timeBooking.localeCompare(b.timeBooking);
  }).slice(indexOfFirstAppointment, indexOfLastAppointment);

  useEffect(() => {
    if (defaultDate) {
      getAllBookingList()
    }
  }, [defaultDate, reRender])

  useEffect(() => {
    getTodayDate();
    getAllEyeCategories()
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title fw-semibold mb-4">Danh sách chờ khám</h5>
        </div>
        <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
          <div className="card w-100">
            <div className="card-body p-4">
              <div className='d-flex mb-5 align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <h6 className='mr-3'>Chọn ngày: </h6>
                  <div >
                    <input type="date" className='form-control' defaultValue={defaultDate} onChange={handleChangeListByDate} min={defaultDate} />
                  </div>

                </div>
                <div className='mr-2'>
                  <button className='btn btn-outline-success' type="button" data-toggle="modal" data-target="#createBookingModal">Đặt lịch</button>
                </div>
              </div>
              {
                loading ? (<span className="loader"></span>) :
                  bookingList.length ?
                    <>
                      <table className="table text-nowrap mb-0 align-middle">
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
                              .map((booking, index) => {
                                const count = index + 1 + indexOfFirstAppointment;
                                return (
                                  <tr key={booking.id} className='text-center'>
                                    <td>{count}</td>
                                    <td>{booking.customer.user.fullName}</td>
                                    <td>{booking.customer.user.phoneNumber}</td>
                                    <td>{booking.dateBooking}</td>
                                    <td>{booking.timeBooking}</td>
                                    <td>
                                      <select className={`form-control text-center ${times.includes(booking.timeBooking) ? 'text-danger' : ""}`} value={times.includes(booking.timeBooking) ? 'true' : 'false'} onChange={(e) => handleChangeStatus(e, booking.id)}>
                                        {
                                          times.includes(booking.timeBooking) ?
                                            <>
                                              <option className='text-black' value="true">{booking.status == "WAITING" ? "Chờ khám" : "Đang khám"}</option>
                                              <option className='text-black' value="cancel">Hủy</option>
                                            </>
                                            :
                                            <>
                                              <option className='text-black' value="false">{booking.status == "WAITING" ? "Không đặt trước" : "Đang khám"}</option>
                                              <option className='text-black' value="cancel">Hủy</option>
                                            </>
                                        }
                                      </select>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center">

                                        <button className="btn btn-outline-success d-flex justify-content-center align-items-center"
                                          style={{ width: "36px", height: "36px" }}
                                          onClick={() => handleChangeStatusExamining(booking.id)}
                                        >
                                          <i className="ti ti-report-medical" style={{ fontSize: "18px" }}></i>
                                        </button>

                                      </div>
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
                      <div className='d-flex align-items-center justify-content-center gap-4' style={{ flexDirection: "column" }}>
                        <div>
                          <i class="fa-regular fa-calendar-xmark text-danger" style={{ fontSize: "124px" }}></i>
                        </div>
                        <span className='fw-semibold' style={{ fontSize: "32px" }}>Danh sách hôm nay đang trống!</span>
                      </div>
                    </div>
              }
            </div>
          </div>
        </div>
        <div className="pagination-container" style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}>
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

      <div className="modal fade" id="createBookingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Đặt lịch tại quầy</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={() => reset()}></button>
            </div>
            <form className="appointment-form needs-validation">
              <div className="modal-body">
                <div className="container">
                  <div className="row mb-3">
                    <div className="col-md-6 has-validation">
                      <label>Họ và tên</label>
                      <input type="text"
                        className={`form-control ${errors?.fullName?.message ? 'is-invalid' : ''}`}
                        {...register("fullName")}
                      />
                      <span className="text-danger font-weight-bold invalid-feedback">{errors?.fullName?.message}</span>
                    </div>
                    <div className="col-md-6 has-validation">
                      <label>Số điện thoại</label>
                      <input type="text"
                        className={`form-control ${errors?.phoneNumber?.message ? 'is-invalid' : ''}`}
                        {...register("phoneNumber")}
                      />
                      <span className="text-danger font-weight-bold invalid-feedback">{errors?.phoneNumber?.message}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 has-validation">
                      <label>Năm sinh</label>
                      <input type="number"
                        className={`form-control ${errors?.age?.message ? 'is-invalid' : ''}`}
                        {...register("age")}
                      />
                      <span className="text-danger font-weight-bold invalid-feedback">{errors?.age?.message}</span>
                    </div>
                    <div className="col-md-6 has-validation">
                      <label>Địa chỉ</label>
                      <input type="text"
                        className={`form-control ${errors?.address?.message ? 'is-invalid' : ''}`}
                        {...register("address")}
                      />
                      <span className="text-danger font-weight-bold invalid-feedback">{errors?.address?.message}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 has-validation">
                      <label>Dịch vụ</label>

                      <select type='text' className={`form-control ${errors?.eyeCategory?.message ? 'is-invalid' : ''}`} {...register("eyeCategory")}>
                        <option value="" style={{ color: 'black' }}>--Chọn dịch vụ--</option>
                        {
                          eyeCategories.map(item => {
                            return (
                              <option key={item.id} value={item.id} style={{ color: 'black' }}>{item.nameCategory} </option>
                            )
                          })
                        }
                      </select>
                      <span className="text-danger font-weight-bold invalid-feedback">{errors?.eyeCategory?.message}</span>
                    </div>
                    <div className="col-md-6">
                      <label>Ghi chú</label>
                      <input type="text"
                        className='form-control'
                        {...register("message")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" id='btn-submit' className="btn btn-primary" onClick={handleSubmit(handleSubmitForm)} data-dismiss="modal">Đặt lịch</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => reset()} >Đóng</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
