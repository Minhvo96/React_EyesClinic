import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import bookingService from '../../services/bookingServices';
import { useForm } from 'react-hook-form';
import eyeCategoriesService from '../../services/eyeCategoriesServices';
import customerService from '../../services/customerService';
import moment from 'moment';
import Swal from 'sweetalert2';

export default function BookingForm() {

    const [times, setTimes] = useState(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']);
    const [booking, setBooking] = useState({})
    const [eyeCategories, setEyeCategories] = useState([])
    const [login, setLogin] = useState(false);
    const [customer, setCustomer] = useState({})
    const [showTime, setShowTime] = useState(false)
    const [timeFreeBooking, setTimeFreeBooking] = useState([])

    const getCustomerById = async () => {
        const customer = await customerService.getCustomerById(1);
        setCustomer(customer)
    }

    const getAllEyeCategories = async () => {
        const eyeCategories = await eyeCategoriesService.getAllEyeCategories();
        setEyeCategories(eyeCategories);
    }

    const registerSchema = yup.object({
        dateBooking: yup.date()
            .required('Vui lòng chọn ngày hẹn')
            .typeError('Vui lòng chọn ngày đặt hẹn'),
        timeBooking: yup.string(),
        eyeCategory: yup.string().required('Vui lòng chọn dịch vụ khám')
    })


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const handleChangeTime = (e) => {
        console.log(e.target.value);
    }

    const handleSubmitForm = async (data) => {
        const dateBooking = String(data.dateBooking);
        const formattedDate = moment(dateBooking).format('YYYY-MM-DD');

        const bookingNew = {
            idEyeCategory: String(data.eyeCategory),
            idCustomer: String(customer.id),
            timeBooking: data.timeBooking,
            dateBooking: formattedDate,
            status: "PENDING"
        }
        console.log(bookingNew);

        await bookingService.createBooking(bookingNew)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm Mới Thành Công !',
            showConfirmButton: false,
            timer: 1500
        })

        reset()
        setShowTime(false)

    }

    const handleChangeShowTime = async (e) => {
        const dateBooking = String(e.target.value);

        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: dateBooking,
            status: ""
        };

        const bookings = await bookingService.getBookingByStatusPending(newBooking);

        const listTimeBooked = bookings.map(item => item.timeBooking)

        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;



        if (new Date(dateBooking) > currentDate) {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item));
            console.log(listTimeFreeBooking);
            setTimeFreeBooking(listTimeFreeBooking)
            
        }
        else {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item) && item.localeCompare(formattedTime) > 0);
            console.log(listTimeFreeBooking);
            setTimeFreeBooking(listTimeFreeBooking)
            
        }

        setShowTime(true)
    }

    useEffect(() => {
        getAllEyeCategories();
        getCustomerById()
    }, [])

    return (
        <section className="ftco-intro">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-3 color-1 p-4">
                        <h3 className="mb-4">Liên hệ với chúng tôi</h3>
                        <p>Nếu cần tư vấn và đặt lịch dịch vụ, đừng ngại ngần mà hãy liên lạc thông qua:</p>
                        <span ><span className="icon-phone2" /> 0836-902-222</span><br /><br />
                        <span ><span className="icon-home" /> 28 Lê Lợi - thành phố Huế</span><br /><br />
                        <span ><span className="icon-minute" /> Giờ mở cửa</span><br />
                        <span ><span className="icon-plus" /> Sáng: 8:00 - 12:00</span><br />
                        <span ><span className="icon-plus" /> Chiều: 14:00 - 18:00</span>
                    </div>
                    <div className="col-md-3 color-2 p-4">
                        <h3 className="mb-4">Lưu ý:</h3>
                        <div>
                            <p><span className="icon-circle" /> Lịch hẹn chỉ có hiệu lực khi Quý khách được xác nhận thông qua điện thoại hoặc email.</p>
                            <p><span className="icon-circle" /> Quý khách sử dụng đặt hẹn trực tuyến, vui lòng hẹn ít nhất 24h trước khi đến khám.</p>
                            <p><span className="icon-circle" /> Xin vui lòng cung cấp thông tin chính xác để được Phòng khám hỗ trợ nhanh nhất.</p>
                        </div>
                    </div>
                    <div className="col-md-6 color-3 p-4">
                        <h3 className="mb-2">Đặt lịch hẹn ngay</h3>
                        <form onSubmit={handleSubmit(handleSubmitForm)} className="appointment-form">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-user" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Tên khách hàng"
                                            value={customer?.user?.fullName}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-phone2" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Số điện thoại"
                                            value={customer?.user?.phoneNumber}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-user" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Tuổi"
                                            value={customer?.age}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-home" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Địa chỉ"
                                            value={customer?.user?.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Ngày hẹn:"
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Ngày hẹn:"
                                                {...register("dateBooking")}
                                                onChange={handleChangeShowTime}
                                            />

                                        </div>
                                    </div>
                                    <span className="text-warning font-weight-bold">{errors?.dateBooking?.message}</span>

                                </div>
                                <div className="col-sm-6 d-flex">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Giờ hẹn:"
                                            disabled
                                        />
                                    </div>
                                    {
                                        showTime &&
                                        <div className="form-group">
                                            <select className="form-control" onChange={(e) => handleChangeTime(e)} {...register("timeBooking")}>
                                                {
                                                    timeFreeBooking.map((time, index) =>
                                                        <option value={time} key={index} style={{ color: 'black' }} className="form-control">{time}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    }

                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-user" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Để lại lời nhắn..."
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="select-wrap">
                                            <div className="icon">
                                                <span className="ion-ios-arrow-down" />
                                            </div>
                                            <select {...register("eyeCategory")} className="form-control">
                                                <option value="" style={{ color: 'black' }}>Chọn dịch vụ</option>
                                                {
                                                    eyeCategories.map(item => {
                                                        return (
                                                            <option key={item.id} value={item.id} style={{ color: 'black' }}>{item.nameCategory} </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className='mt-3'><span className="text-warning font-weight-bold">{errors?.eyeCategory?.message}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                    style={{
                                        backgroundColor: '#1E90FF',
                                        color: '#fff',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = '#87CEEB';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = '#1E90FF';
                                    }}
                                >Xác nhận đặt lịch</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
