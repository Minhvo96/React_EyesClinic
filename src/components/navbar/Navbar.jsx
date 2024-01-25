import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthProvider'

export default function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);

    const showDropdownMenu = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        document.addEventListener('click', function (event) {
          var userIcon = document.getElementById('user-profile');
    
          // Kiểm tra xem phần tử được click có nằm ngoài dropdown hay không
          if (!userIcon?.contains(event.target)) {
            setShowDropdown(false);
          }
        });
    
    }, [showDropdown]);

    const auth = useAuthContext();

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
            id="ftco-navbar"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="../../images/logo2.png"
                        width={240}
                        alt=""
                    />
                </Link>
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="oi oi-menu" /> Menu
                </button> */}
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                TRANG CHỦ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/waiting-list" className="nav-link">
                                HÀNG CHỜ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-link">
                                DỊCH VỤ
                            </Link>
                        </li>
                        {auth.user ? (
                            <li className="nav-item">
                                <div
                                    className="nav-link nav-icon-hover"
                                    id="user-profile"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={() => showDropdownMenu()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={auth?.user?.image}
                                        alt=""
                                        width={35}
                                        height={35}
                                        className="rounded-circle"
                                    />
                                </div>
                                {
                showDropdown && (
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    id="dropdown-menu"
                    aria-labelledby="drop2"
                    style={{ display: "block", position: "absolute", right:"2%", left: "auto",top:"70%" }}
                  >
                    <div className="message-body">
                      <div
                        className="d-flex ml-1 gap-2 dropdown-item"
                        style={{ flexDirection: "column" }}
                      >
                        <h5 className='mb-0 fw-bold'>{auth?.user?.fullName.toUpperCase()}</h5>
                        {auth?.user?.roles === 'ROLE_RECEPTIONIST' && (
                          <p className="mb-0 fs-5 text-info">LỄ TÂN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_DOCTOR' && (
                          <p className="mb-0 fs-5 text-info">BÁC SĨ</p>
                        )}
                        {auth?.user?.roles === 'ROLE_ADMIN' && (
                          <p className="mb-0 fs-5 text-info">ADMIN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_CASHIER' && (
                          <p className="mb-0 fs-5 text-info">THU NGÂN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_ASSISTANT' && (
                          <p className="mb-0 fs-5 text-info">PHỤ TÁ</p>
                        )}
                      </div>
                      <Link to='/dashboard/waiting-list'>
                        <div className='d-flex align-items-center justify-content-between mb-2 dropdown-item' style={{cursor:"pointer"}}>
                            <p className="mb-0 fs-3 text-secondary">Làm việc</p>
                            <i class="fa-solid fa-location-arrow text-danger"></i>
                        </div>
                      </Link>                    
                      <div className='d-flex align-items-center justify-content-center'>
                        <button
                            className="btn btn-outline-primary mb-2 ms-3" style={{ width: "83%" }}
                            onClick={auth.logout}
                        >
                            Đăng xuất
                        </button>
                      </div>
                     
                    </div>
                  </div>
                )
              }
                            </li>
                            
                        ) : <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                ĐĂNG NHẬP
                            </Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
