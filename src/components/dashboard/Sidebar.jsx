import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";


export default function Sidebar() {
    const [role, setRole] = useState('');

    const auth = useAuthContext();

    useEffect(() => {
        setRole(auth?.user?.roles)
    }, [])

    return (
        <aside className="left-sidebar">
            {/* Sidebar scroll*/}
            <div>
                <div className="brand-logo">
                    <Link to="/dashboard/overview" className="text-nowrap logo-img">
                        <img
                            src="../../images/logo2.png"
                            width={220}
                            alt=""
                        />
                    </Link>
                </div>
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        {
                            role === 'ROLE_ADMIN' && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">Trang chủ</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/overview'>
                                            <p className="sidebar-link">
                                                <span>
                                                    <i className="ti ti-layout-dashboard" />
                                                </span>
                                                <span className="hide-menu">Thống kê</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            (role === 'ROLE_ADMIN' || role === 'ROLE_DOCTOR') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">BỆNH NHÂN</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/patient'>
                                            <p
                                                className="sidebar-link"
                                            >
                                                <span>
                                                    <i className="ti ti-users" />
                                                </span>
                                                <span className="hide-menu">Bệnh nhân</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }


                        {
                            (role === 'ROLE_ADMIN' || role === 'ROLE_RECEPTIONIST') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">LỄ TÂN</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/booking-list'>
                                            <p
                                                className="sidebar-link"
                                                href="./authentication-login.html"
                                                aria-expanded="false"
                                            >
                                                <span>
                                                    <i className="fa-solid fa-list-check fa-md"></i>
                                                </span>
                                                <span className="hide-menu">Danh sách hẹn khám</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            (role === 'ROLE_ADMIN' || role === 'ROLE_RECEPTIONIST' || role === 'ROLE_DOCTOR' || role === 'ROLE_ASSISTANT' || role === 'ROLE_CASHIER') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">KHÁM CHỮA BỆNH</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/waiting-list'>
                                            <p
                                                className="sidebar-link"                                             
                                                aria-expanded="false"
                                            >
                                                <span>
                                                    <i className="fa-regular fa-rectangle-list fa-md" ></i>
                                                </span>
                                                <span className="hide-menu">Danh sách chờ khám</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }



                        {
                            (role === 'ROLE_ADMIN' || role === 'ROLE_DOCTOR' || role === 'ROLE_CASHIER') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">THANH TOÁN HÓA ĐƠN</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/waiting-pay'>
                                            <p
                                                className="sidebar-link"
                                                href="/waiting-pay"
                                                aria-expanded="false"
                                            >
                                                <span>

                                                    <i className="fa-solid fa-money-check-dollar fa-md"></i>
                                                </span>
                                                <span className="hide-menu">Danh sách chờ thanh toán</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            (role === 'ROLE_ADMIN') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">QUẢN LÝ THUỐC</span>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to='/dashboard/medicine'>
                                            <p
                                                className="sidebar-link"
                                            >
                                                <span>
                                                    <i className="ti ti-pill"></i>
                                                </span>
                                                <span className="hide-menu">Danh sách thuốc</span>
                                            </p>
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>

                </nav>
                {/* End Sidebar navigation */}
            </div>
            {/* End Sidebar scroll*/}
        </aside>
    )
}