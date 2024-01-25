import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";


export default function Sidebar() {
    const [role, setRole] = useState('');
    const [sideBarItem, setSideBarItem] = useState("");
    const auth = useAuthContext();

    useEffect(() => {
        const sideBarItem = ["overview", "patient", "booking-list", "waiting-list", "waiting-pay", "medicine", "staff"]
        const url = location.href.toLowerCase();
        // Lặp qua mảng sideBarItem để kiểm tra từ khóa nào khớp với URL
        sideBarItem.forEach(item => {
            if (url.includes(item)) {
                setSideBarItem(item);
            }
        });
    }, [])

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
                                    {sideBarItem === "overview" ? 
                                    (<li className="sidebar-item active-dashboard" id="overview">
                                        <Link to='/dashboard/overview'>
                                            <p className="sidebar-link">
                                                <span>
                                                    <i className="ti ti-layout-dashboard" />
                                                </span>
                                                <span className="hide-menu">Thống kê</span>
                                            </p>
                                        </Link>
                                    </li>) : 
                                    (<li className="sidebar-item" id="overview">
                                        <Link to='/dashboard/overview'>
                                            <p className="sidebar-link">
                                                <span>
                                                    <i className="ti ti-layout-dashboard" />
                                                </span>
                                                <span className="hide-menu">Thống kê</span>
                                            </p>
                                        </Link>
                                    </li>)}
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
                                    {sideBarItem === "patient" ? 
                                    (<li className="sidebar-item active-dashboard" id="patient">
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
                                    </li>) : 
                                    (<li className="sidebar-item" id="patient">
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
                                    </li>)}
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
                                    {sideBarItem === "booking-list" ? 
                                    (<li className="sidebar-item active-dashboard" id="booking-list">
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
                                    </li>) : 
                                    (<li className="sidebar-item" id="booking-list">
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
                                    </li>)}
                                    
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
                                    {sideBarItem === "waiting-list" ? 
                                    ( <li className="sidebar-item active-dashboard" id="waiting-list">
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
                                    </li>) : 
                                    ( <li className="sidebar-item" id="waiting-list">
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
                                    </li>)}
                                   
                                </>
                            )
                        }

                        {
                            (role === 'ROLE_ADMIN' || role === 'ROLE_CASHIER') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">THANH TOÁN HÓA ĐƠN</span>
                                    </li>
                                    {sideBarItem === "waiting-pay" ? 
                                    ( <li className="sidebar-item active-dashboard" id="waiting-pay">
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
                                    </li>) : 
                                    ( <li className="sidebar-item" id="waiting-pay">
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
                                    </li>)}
                                   
                                </>
                            )
                        }

                        {/* {
                            (role === 'ROLE_ADMIN') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">QUẢN LÝ THUỐC</span>
                                    </li>
                                    {sideBarItem === "medicine" ? 
                                    ( <li className="sidebar-item active-dashboard" id="medicine">
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
                                    </li>) : 
                                    ( <li className="sidebar-item" id="medicine">
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
                                    </li>)}
                                   
                                </>
                            )
                        } */}

                        {
                            (role === 'ROLE_ADMIN') && (
                                <>
                                    <li className="nav-small-cap">
                                        <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">NHÂN VIÊN</span>
                                    </li>
                                    {sideBarItem === "staff" ? 
                                    (<li className="sidebar-item active-dashboard" id="staff">
                                        <Link to='/dashboard/staff'>
                                            <p
                                                className="sidebar-link"
                                            >
                                                <span>
                                                    <i className="fa-regular fa-address-card"></i>
                                                </span>
                                                <span className="hide-menu">Danh sách nhân viên</span>
                                            </p>
                                        </Link>
                                    </li>) : 
                                    (<li className="sidebar-item" id="staff">
                                        <Link to='/dashboard/staff'>
                                            <p
                                                className="sidebar-link"
                                            >
                                                <span>
                                                    <i className="fa-regular fa-address-card"></i>
                                                </span>
                                                <span className="hide-menu">Danh sách nhân viên</span>
                                            </p>
                                        </Link>
                                    </li>)}
                                    
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