import React, { useState } from 'react'

export default function FormRegister() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className='d-flex col-12'>
                <div className="col-4"></div>
                <form className="needs-validation col-4 mb-5 rounded border-warning" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    boxShadow: '0 0 15px 0px rgba(27, 117, 188, 0.5)'
                }}>
                    <h3 className="text-center">Đăng ký tài khoản</h3>
                    <div className="form-group mb-3 mt-3">
                        <label className="form-lable">Họ và tên</label>
                        <input type="text" className="form-control"
                        />
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-lable">Địa chỉ</label>
                        <input type="text" className="form-control"

                        />
                        <span className="invalid-feedback"></span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-lable">Tuổi</label>
                        <input type="text" className="form-control"

                        />
                        <span className='invalid-feedback'>
                        </span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-lable">Số điện thoại</label>
                        <input type="text" className="form-control"

                        />
                        <span className='invalid-feedback'>
                        </span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-lable">Mật khẩu</label>
                        <div className="input-group">
                            <input type={showPassword ? "text" : "password"} className="form-control" />
                            <div className="input-group-append">
                                <span className="input-group-text" onClick={handleShowPassword}>
                                    <i className={showPassword ? "icon-eye" : "icon-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-lable">Xác nhận mật khẩu</label>
                        <div className="input-group">
                            <input type={showPassword ? "text" : "password"} className="form-control" />
                            <div className="input-group-append">
                                <span className="input-group-text" onClick={handleShowPassword}>
                                    <i className={showPassword ? "icon-eye" : "icon-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group mb-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-warning mr-3">Tạo tài khoản</button>
                        <button type="button" className="btn btn-danger ">Xóa</button>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
}
