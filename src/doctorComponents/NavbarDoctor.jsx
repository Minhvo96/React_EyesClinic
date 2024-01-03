import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarDoctor() {
    return (
        <nav>
            <div className='container-fluid d-flex mt-3'>
                <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                    <Link to='/doctor'><img className='mt-2' src='images/logo1.jpg' style={{ width: 150 }} /></Link>
                </div>
                <div className='col-lg-5 col-md-6 col-sm-8 col-12'>
                    <div className="input-group rounded" style={{ width: 600 }}>
                        <input type="search" className="form-control rounded" placeholder="Nhập tên bệnh nhân..." />
                        <span className="input-group-text border-0">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className='col-5 d-flex justify-content-end'>
                    <i className="fa-regular fa-circle-question mt-3" style={{ fontSize: 30, marginRight: '20px' }} />
                    <i className="fa-regular fa-bell mt-3" style={{ fontSize: 30, marginRight: '20px' }} />
                    <div className="dropdown" style={{ fontSize: '15px' }}>
                        <div className="btn" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: '0' }}>
                            <div className='d-flex align-items-center'>
                                <img className='rounded-circle' src='images/BSMinh2.jpg' style={{ width: 50, height: 'auto', marginRight: '10px' }} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>Trịnh Văn Minh</div>
                                    <span>Bác sĩ<span className="dropdown-arrow ml-2">&#9660;</span></span>
                                </div>
                            </div>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><Link className="dropdown-item" to='/'> <i className="fa-solid fa-user-doctor" /> Thông tin cá nhân</Link></li>
                            <li><Link className="dropdown-item" to='/'> <i className="fa-solid fa-door-open" /> Về trang chủ</Link></li>
                            <li><Link className="dropdown-item" to='/'> <i className="fa-solid fa-right-from-bracket" /> Đăng xuất</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
