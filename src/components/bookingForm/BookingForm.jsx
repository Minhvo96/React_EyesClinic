import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import bookingService from '../../services/bookingServices';
import eyeCategoriesService from '../../services/eyeCategoriesServices';
import moment from 'moment';
import Swal from 'sweetalert2';
import userService from '../../services/userService';
import UsingWebSocket from '../../Socket';
import { toast } from 'react-toastify';

export default function BookingForm() {

    const [times, setTimes] = useState(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']);
    const [eyeCategories, setEyeCategories] = useState([])
    const [showTime, setShowTime] = useState(false)
    const [timeFreeBooking, setTimeFreeBooking] = useState([])
    const [minDate, setMinDate] = useState();
    const [showError, setShowError] = useState(true);
    const [bookingsPending, setBookingsPending] = useState([])
    const [selectedButton, setSelectedButton] = useState(null);
    const [timesPendingLimit, setTimesPendingLimit] = useState([])

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        setMinDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    };

    const getAllEyeCategories = async () => {
        const eyeCategories = await eyeCategoriesService.getAllEyeCategories();
        setEyeCategories(eyeCategories);
    }

    const registerSchema = yup.object({
        fullName: yup.string().required("Vui lòng nhập họ và tên"),
        age: yup.number()
            .integer()
            .min(1934, "Năm sinh phải từ 1934")
            .max(2024, "Năm sinh không vượt quá 2024")
            .required("Vui lòng nhập năm sinh")
            .typeError("Vui lòng nhập năm sinh"),
        address: yup.string().required("Vui lòng nhập địa chỉ"),
        phoneNumber: yup.string().required("Vui lòng nhập số điện thoại").matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ"),
        dateBooking: yup.date()
            .required('Vui lòng chọn ngày hẹn')
            .typeError('Vui lòng chọn ngày đặt hẹn')
        ,
        timeBooking: yup.string().required('Vui lòng chọn giờ hẹn'),
        eyeCategory: yup.string().required('Vui lòng chọn dịch vụ khám'),
        message: yup.string()
    })

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
        criteriaMode: "all"
    })


    const handleTimeClick = (time) => {
        setValue("timeBooking", time);
        setShowError(false)
        setSelectedButton(time)
    };

    const handleSubmitForm = async (data) => {
        const user = {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            role: 'ROLE_CUSTOMER',
            password: null,
            age: data.age
        }

        const idCustomer = await userService.createUser(user)

        const dateBooking = String(data.dateBooking);
        const formattedDate = moment(dateBooking).format('YYYY-MM-DD');

        const bookingNew = {
            idEyeCategory: String(data.eyeCategory),
            idCustomer: idCustomer,
            timeBooking: data.timeBooking,
            dateBooking: formattedDate,
            status: "PENDING"
        }

        await bookingService.createBooking(bookingNew)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đặt lịch hẹn thành công !',
            showConfirmButton: false,
            timer: 3500
        })

        reset()
        setShowTime(false)
        setSelectedButton(null)

    }

    const handleChangeShowTime = async (e) => {
        const dateBooking = e.target.value;
        const newBooking = {
            idEyeCategory: "",
            idCustomer: "",
            timeBooking: "",
            dateBooking: String(dateBooking),
            status: ""
        };

        const bookingsWaiting = await bookingService.getBookingByStatusWaitingAndDate(newBooking);
        const listTimeBooked = bookingsWaiting.map(item => item.timeBooking)


        const bookingsPending = await bookingService.getBookingByStatusPendingAndDate(newBooking);
        const listTimesPending = bookingsPending.map(item => item.timeBooking)

        setBookingsPending(listTimesPending)

        const targetFrequency = 3;

        const frequencyCount = listTimesPending.reduce((count, num) => {
            count[num] = (count[num] || 0) + 1;
            return count;
        }, {});

        const targetElement = Object.keys(frequencyCount).filter(
            (num) => frequencyCount[num] === targetFrequency
        );
        
        const timesPendingLimitNew = [...timesPendingLimit, ...targetElement]
        console.log(timesPendingLimitNew);

        setTimesPendingLimit(timesPendingLimitNew)

        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        if (new Date(dateBooking) > currentDate) {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item));;
            setTimeFreeBooking(listTimeFreeBooking)
        }
        else {
            const listTimeFreeBooking = times.filter(item => !listTimeBooked.includes(item) && item.localeCompare(formattedTime) > 0);
            setTimeFreeBooking(listTimeFreeBooking)
        }

        setShowTime(true)
    }

    useEffect(() => {
        getAllEyeCategories();
        getTodayDate();
    }, [])

    

    return (
        <section className="ftco-intro" id='booking-form'>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-3 color-1 p-4" style={{borderRadius:"0.5rem 0 0 0.5rem"}}>
                        <h3 className="mb-4 font-weight-bold">Liên hệ với chúng tôi</h3>
                        <p>Nếu cần tư vấn và đặt lịch khám, đừng ngại ngần mà hãy liên lạc thông qua:</p>
                        <span ><span className="icon-phone2" /> 0836-902-222</span><br /><br />
                        <span ><span className="icon-home" /> 28 Lê Lợi - thành phố Huế</span><br /><br />
                        <span style={{ textDecoration: 'underline' }}><span className="icon-minute" /> Giờ mở cửa:</span><br />
                        <span ><span className="icon-plus" /> Sáng: 8:00 - 12:00</span><br />
                        <span ><span className="icon-plus" /> Chiều: 14:00 - 18:00</span><br />
                        <div className="mt-3">
                            <span style={{ textDecoration: 'underline' }}>Lưu ý:</span>
                        </div>

                        <div>
                            <p><span className="icon-circle" style={{ fontSize: '8px' }} /> Lịch hẹn chỉ có hiệu lực khi Quý khách được xác nhận thông qua điện thoại.</p>
                            <p><span className="icon-circle" style={{ fontSize: '8px' }} /> Xin vui lòng cung cấp thông tin chính xác để được Phòng khám hỗ trợ nhanh nhất.</p>
                        </div>
                    </div>

                    <div className="col-md-9 color-3 p-4" style={{borderRadius:"0 0.5rem 0.5rem 0"}}>
                        <h3 className="mb-4  text-center font-weight-bold" style={{fontSize:"32px"}}>ĐẶT LỊCH HẸN NGAY</h3>
                        <form onSubmit={handleSubmit(handleSubmitForm)} className="appointment-form">
                            <div className="row">
                                <div className="col-sm-6 ">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-user" />
                                        </div>
                                        
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Tên khách hàng"
                                            {...register("fullName")}
                                            style={{textEmphasisColor:"#FFC75F"}}
                                        />
                                    </div>
                                    <span className="text-danger font-weight-bold">{errors?.fullName?.message}</span>
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
                                            {...register("phoneNumber")}

                                        />
                                    </div>
                                    <span className="text-danger font-weight-bold">{errors?.phoneNumber?.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-cake" />
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Năm sinh"
                                            {...register("age")}

                                        />
                                    </div>
                                    <span className="text-danger font-weight-bold">{errors?.age?.message}</span>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-home" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Địa chỉ"
                                            {...register("address")}

                                        />
                                    </div>
                                    <span className="text-danger font-weight-bold">{errors?.address?.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-between row">
                                        <div className="col-6 form-group d-flex align-items-center">
                                            <label>Chọn ngày hẹn:</label>
                                        </div>
                                        <div className="col-6 form-group">
                                            <input
                                                type="date"
                                                className="form-control"                                             
                                                {...register("dateBooking")}
                                                min={minDate}
                                                onInput={handleChangeShowTime}
                                                
                                            />
                                        </div>
                                    </div>

                                    <span className="text-danger font-weight-bold">{errors?.dateBooking?.message}</span>
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
                                                    eyeCategories?.map(item => {
                                                        return (
                                                            <option key={item.id} value={item.id} style={{ color: 'black' }}>{item.nameCategory} </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className='mt-3'><span className="text-danger font-weight-bold">{errors?.eyeCategory?.message}</span></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-12 d-flex">
                                    <div className="form-group">

                                        <label>Chọn giờ hẹn:</label>
                                    </div>

                                </div>
                            </div>
                            {
                                showTime &&
                                <div className='row ml-5'>
                                    {
                                        times.map(item => {
                                            return (
                                                <div className='col-md-3 mb-3' key={item}>
                                                    <button type='button' className={selectedButton === item ? 'btn btn-warning' : bookingsPending.includes(item) ? 'btn btn-secondary' : 'btn'}
                                                        disabled={!timeFreeBooking.includes(item) || timesPendingLimit.includes(item)}
                                                        onClick={() => handleTimeClick(item)}

                                                    >{item}</button>

                                                </div>
                                            )
                                        })


                                    }

                                    <div>
                                        <h6 style={{ textDecoration: 'underline' }}>Ghi chú:</h6>
                                        <div className='d-flex'>
                                            <div className='mr-5'>
                                                <div>
                                                    <button className='btn'></button>
                                                    <label className='ml-2'>Thời gian có thể chọn</label>
                                                </div>
                                                <div>
                                                    <button className='btn btn-warning'></button>
                                                    <label className='ml-2'>Thời gian đang chọn</label>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <button className='btn btn-secondary'></button>
                                                    <label className='ml-2'>Thời gian đã có người chọn nhưng chưa được xác nhận đặt</label>
                                                </div>
                                                <div>
                                                    <button className='btn' disabled></button>
                                                    <label className='ml-2'> Thời gian đã có người đặt hoặc quá thời gian hiện tại</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                showError &&
                                <span className="text-danger font-weight-bold">{errors?.timeBooking?.message}</span>
                            }

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-message" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Để lại lời nhắn..."
                                            {...register("message")}
                                        />
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
                                >Đặt lịch</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </section>
    )
}
