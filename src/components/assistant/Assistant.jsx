import React, { useEffect, useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import addStyleDashboard from '../../AddStyleDashboard';
import Header from "../dashboard/Header";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import StepProgressBar from '../../components/progress/Progress'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import prescriptionService from '../../services/prescriptionService';
import bookingService from '../../services/bookingServices';
import SockJS from 'sockjs-client';

const schemaPrescription = yup.object({
    leftEye: yup.number()
        .required("Nhập thị lực của bệnh nhân")
        .typeError("Nhập số thị lực cho bệnh nhân")
        .min(0, "Thị lực không được nhỏ hơn 0")
        .max(10, "Thị lực không được lớn hơn 10"),
    rightEye: yup.number()
        .required("Nhập thị lực của bệnh nhân")
        .typeError("Nhập số thị lực cho bệnh nhân")
        .min(0, "Thị lực không được nhỏ hơn 0")
        .max(10, "Thị lực không được lớn hơn 10")
});

export default function Assistant() {
    addStyleDashboard();

    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});
    const [loading, setLoading] = useState(true);
    const [eyeSightValues, setEyeSightValues] = useState({
        leftEye: '',
        rightEye: ''
    })
    const navigator = useNavigate();

    const { register: registerPrescription, handleSubmit: handleSubmitPrescription, formState: { errors: errorsPrescription }, reset: resetPrescription } = useForm({
        resolver: yupResolver(schemaPrescription),
        mode: "onBlur",
        criteriaMode: "all"
    });

    const getBookingById = async () => {
        const booking = await bookingService.getBookingById(bookingId);
        setBooking(booking);
        setLoading(false);
    }

    const handleChangeEyeSight = (e) => {
        setEyeSightValues({
            ...eyeSightValues,
            [e.target.name]: e.target.value
        })
    }

    const handleAddEyeSight = () => {
        Swal.fire({
            title: `Thêm số đo thị lực cho bệnh nhân ${booking.customer.user.fullName}?`,
            showCancelButton: true,
            confirmButtonText: 'Lưu ngay',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const prescription = {
                    idBooking: String(booking.id),
                    idDoctor: "1",
                    eyeSight: eyeSightValues.leftEye + ', ' + eyeSightValues.rightEye,
                    diagnose: "",
                    note: "",
                    idsMedicine: []
                }
                setLoading(true);
                await prescriptionService.createPrescription(prescription);
                Swal.fire('Thêm thông tin thành công!', '', 'success')
                setTimeout(() => {
                    Swal.close();
                }, 2000);
                navigator('/dashboard/waiting-list');
            }
        })
    }

    useEffect(() => {
        getBookingById();
    }, [])

    return (
        <>
            {
                loading ? (<span class="loader"></span>) :
                    <div className='container-fluid'>
                                                 
                                <div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="card-title fw-semibold mb-4 fs-6">Đo thị lực</h5>
                                    </div>
                                    <div style={{ width: '80%', marginLeft: 100 }}>
                                        <StepProgressBar eyeSightValues={eyeSightValues} />
                                    </div>
                                </div>
                                <div className="d-flex row ml-1 mt-5 gap-5">
                                    <div className="col-lg-7 d-flex align-items-around" style={{ padding: 0 }}>
                                        <div className="card w-100" style={{ '--bs-card-box-shadow': 'rgb(171 145 145) 0px 0px 2px 0px, rgb(171 145 145) 0px 12px 24px -4px', }}>
                                            <div className="card-body p-4 d-flex justify-content-center align-items-center">
                                                <div className="text-center d-flex align-items-center" style={{ flexDirection: "column", position: 'relative' }}>
                                                    <div>
                                                        <span className="font-weight-bold">Thị lực mắt phải</span>
                                                    </div>
                                                    <img src="../../images/RightEyeIcon.png" alt="" style={{ width: '60%' }} />
                                                    <div style={{ position: 'relative', width: '60%' }}>
                                                        <input type="text" className={`form-control text-center ${errorsPrescription?.rightEye?.message ? 'is-invalid' : ''}`}
                                                            {...registerPrescription('rightEye')} name="rightEye" style={{ width: '100%' }}
                                                            onInput={handleChangeEyeSight} />
                                                        <span className="invalid-feedback">{errorsPrescription?.rightEye?.message}</span>
                                                        <div style={{ position: 'absolute', top: `${errorsPrescription?.rightEye ? '36%' : '50%'}`, right: '50px', transform: 'translateY(-50%)' }}>
                                                            /&ensp;10
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center ml-3 d-flex align-items-center" style={{ flexDirection: "column", position: 'relative' }}>
                                                    <div>
                                                        <span className="font-weight-bold">Thị lực mắt trái</span>
                                                    </div>
                                                    <img src="../../images/LeftEyeIcon.png" alt="" style={{ width: '60%' }} />
                                                    <div style={{ position: 'relative', width: '60%' }}>
                                                        <input type="text" className={`form-control text-center ${errorsPrescription?.leftEye?.message ? 'is-invalid' : ''}`}
                                                            {...registerPrescription('leftEye')} name="leftEye" style={{ width: '100%' }}
                                                            onInput={handleChangeEyeSight} />
                                                        <span className="invalid-feedback">{errorsPrescription?.leftEye?.message}</span>
                                                        <div style={{ position: 'absolute', top: `${errorsPrescription?.leftEye ? '36%' : '50%'}`, right: '50px', transform: 'translateY(-50%)' }}>
                                                            /&ensp;10
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type='button' className='btn btn-primary mb-3 mr-3' onClick={handleSubmitPrescription(handleAddEyeSight)}>Lưu thông tin thị lực</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 d-flex align-items-around text-center" style={{ padding: 0 }}>
                                        <div className="card w-100" style={{ '--bs-card-box-shadow': 'rgb(171 145 145) 0px 0px 2px 0px, rgb(171 145 145) 0px 12px 24px -4px', }}>
                                            <div className="card-body p-4">
                                                <p className="font-weight-bold">Thông tin bệnh nhân</p>
                                                <div className='text-center'>
                                                    <img src='../../images/user-icon.png' style={{ width: 150, borderRadius: '50%' }} />
                                                    <p style={{ fontWeight: 'bold' }} readOnly>{booking?.customer?.user?.fullName}</p>
                                                </div>
                                                <div>
                                                    <label htmlFor="basic-url" className="form-label">Năm sinh:</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control text-center" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.age} />
                                                    </div>
                                                    <label htmlFor="basic-url" className="form-label">Số điện thoại:</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control text-center" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.user?.phoneNumber} />
                                                    </div>
                                                    <label htmlFor="basic-url" className="form-label">Địa chỉ nhà:</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control text-center" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.user?.address} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                    </div>
            }
        </>
    )
}
