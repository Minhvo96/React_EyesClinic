import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="left-sidebar">
            {/* Sidebar scroll*/}
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <a href="./index.html" className="text-nowrap logo-img">
                        <img
                            src="../../src/assets/images/logos/dark-logo.svg"
                            width={180}
                            alt=""
                        />
                    </a>
                    <div
                        className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                        id="sidebarCollapse"
                    >
                        <i className="ti ti-x fs-8" />
                    </div>
                </div>
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to ='/dashboard'>
                                <a
                                    className="sidebar-link"
                                >
                                    <span>
                                        <i className="ti ti-layout-dashboard" />
                                    </span>
                                    <span className="hide-menu">Dashboard</span>
                                </a>
                            </Link>
                            
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Bệnh nhân</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/patient'>
                                <a
                                    className="sidebar-link"
                                >
                                    <span>
                                        <i className="ti ti-users" />
                                    </span>
                                    <span className="hide-menu">Patients</span>
                                </a>
                            </Link>                           
                        </li>
                        <li className="sidebar-item">
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
                        </li>
                    
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">LỄ TÂN</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to= '/receptionist'>
                                <a
                                className="sidebar-link"
                                href="./authentication-login.html"
                                aria-expanded="false"
                            >
                                <span>
                                <i className="fa-solid fa-list-check fa-md"></i>
                                </span>
                                <span className="hide-menu">Danh sách hẹn khám</span>
                                </a>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/receptionist/waiting-list'>
                            <a
                                className="sidebar-link"
                                href="./authentication-register.html"
                                aria-expanded="false"
                            >
                                <span>
                                <i className="fa-regular fa-rectangle-list fa-md" ></i>
                                </span>
                                <span className="hide-menu">Danh sách chờ khám</span>
                            </a>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to='/receptionist/waiting-pay'>
                            <a
                                className="sidebar-link"
                                href="./authentication-register.html"
                                aria-expanded="false"
                            >
                                <span>
                                    
                                    <i className="fa-solid fa-money-check-dollar fa-md"></i>
                                </span>
                                <span className="hide-menu">Danh sách chờ thanh toán</span>
                            </a>
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