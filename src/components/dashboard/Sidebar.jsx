import { Link } from "react-router-dom";

export default function Sidebar() {
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
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Trang chủ</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to ='/dashboard/overview'>
                                <p
                                    className="sidebar-link"
                                >
                                    <span>
                                        <i className="ti ti-layout-dashboard" />
                                    </span>
                                    <span className="hide-menu">Thống kê</span>
                                </p>
                            </Link>

                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">BỆNH NHÂN</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/patient'>
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
                        {/* <li className="sidebar-item">
                            <a
                                className="sidebar-link"
                                href="./ui-alerts.html"
                                aria-expanded="false"
                            >
                                <span>
                                    <i className="ti ti-report" />
                                </span>
                                <span className="hide-menu">Requests</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link"
                                href="./ui-card.html"
                                aria-expanded="false"
                            >
                                <span>
                                    <i className="ti ti-calendar" />
                                </span>
                                <span className="hide-menu">Appoinments</span>
                            </a>
                        </li> */}

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">LỄ TÂN</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/receptionist/booking-list'>
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

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">KHÁM CHỮA BỆNH</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/waiting-list'>
                                <p
                                    className="sidebar-link"
                                    href="/waiting-list"
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="fa-regular fa-rectangle-list fa-md" ></i>
                                    </span>
                                    <span className="hide-menu">Danh sách chờ khám</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">THANH TOÁN HÓA ĐƠN</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/waiting-pay'>
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
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">QUẢN LÝ THUỐC</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/medicine'>
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



                    </ul>

                </nav>
                {/* End Sidebar navigation */}
            </div>
            {/* End Sidebar scroll*/}
        </aside>
    )
}