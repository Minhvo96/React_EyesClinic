import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'

export default function BookingForm() {

    const [times, setTimes] = useState(['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']);

    const handleChangeTime = (e) => {
        console.log(e.target.value);
    }

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
                        <form action="#" className="appointment-form">
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
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 d-flex">
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
                                        />
                                    </div>
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
                                    <div className="form-group">
                                        <select className="form-control" onChange={(e) => handleChangeTime(e)}>
                                            {
                                                times.map((time, index) =>
                                                    <option value={time} key={index} style={{ color: 'black' }} className="form-control">{time}</option>
                                                )
                                            }
                                        </select>
                                    </div>
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
                                            <select name="" id="" className="form-control">
                                                <option value="" style={{ color: 'black' }}>Dịch vụ</option>
                                                <option value="" style={{ color: 'black' }}>Teeth Whitening</option>
                                                <option value="" style={{ color: 'black' }}>Teeth CLeaning</option>
                                                <option value="" style={{ color: 'black' }}>Quality Brackets</option>
                                                <option value="" style={{ color: 'black' }}>Modern Anesthetic</option>
                                            </select>
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
