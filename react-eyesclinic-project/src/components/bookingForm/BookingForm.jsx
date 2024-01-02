import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'

export default function BookingForm() {

    const [time, setTime] = useState('Chọn ngày giờ hẹn');

    useEffect(() => {
        console.log(time);
    }, [time]);

    const handleChangeTime = (e) => {
        setTime(e.target.value)

    }

    return (
        <section className="ftco-intro">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-3 color-1 p-4">
                        <h3 className="mb-4">Liên hệ với chúng tôi</h3>
                        <p>Nếu cần tư vấn và đặt lịch dịch vụ, đừng ngại ngần mà hãy liên lạc thông qua:</p>
                        <span ><span className="icon-phone2" /> 0836-902-222</span><br /><br />
                        <span ><span className="icon-home" /> 28 Lê Lợi - thành phố Huế</span>
                    </div>
                    <div className="col-md-3 color-2 p-4">
                        <h3 className="mb-4">Giờ mở cửa:</h3>
                        <div>
                            <p>Thứ hai - CN </p>
                            <p>
                                <span>Sáng: </span>
                                <span>8:00 - 12:00</span>
                            </p>

                            <p>
                                <span>Chiều: </span>
                                <span>13:00 - 19:00</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 color-3 p-4">
                        <h3 className="mb-2">Đặt lịch hẹn ngay</h3>
                        <form action="#" className="appointment-form">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-user" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_name"
                                            placeholder="Tên khách hàng"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-phone2" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Phone"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="icon">
                                            <span className="icon-paper-plane" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="appointment_email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 d-flex">
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
                                            type="datetime-local"
                                            className="form-control"
                                            onChange={(e) => handleChangeTime(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="select-wrap">
                                            <div className="icon">
                                                <span className="ion-ios-arrow-down" />
                                            </div>
                                            <select name="" id="" className="form-control">
                                                <option value="">Dịch vụ</option>
                                                <option value="">Teeth Whitening</option>
                                                <option value="">Teeth CLeaning</option>
                                                <option value="">Quality Brackets</option>
                                                <option value="">Modern Anesthetic</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
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
