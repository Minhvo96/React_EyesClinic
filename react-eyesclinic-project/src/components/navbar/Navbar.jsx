import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
            id="ftco-navbar"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <span className="text-primary">Văn Minh</span> <span>Eyes Clinic</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="oi oi-menu" /> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                TRANG CHỦ
                            </Link>
                        </li>                      
                        <li className="nav-item">
                            <Link to="/services" className="nav-link ">
                                DỊCH VỤ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                ĐĂNG NHẬP
                            </Link>
                        </li>
                        {/* <li className="nav-item cta">
                            <a
                                href="contact.html"
                                className="nav-link"
                                data-toggle="modal"
                                data-target="#modalRequest"
                            >
                                <span>Modal</span>
                            </a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
