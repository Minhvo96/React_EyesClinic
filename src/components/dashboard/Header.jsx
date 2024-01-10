import React, { useEffect, useState } from 'react'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    document.addEventListener('click', function (event) {
      var userIcon = document.getElementById('user-profile');

      // Kiểm tra xem phần tử được click có nằm ngoài dropdown hay không
      if (!userIcon.contains(event.target)) {
        setShowDropdown(false);
      }
    });

  }, [showDropdown]);

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ marginLeft: "24px" }}>

        <div
          className="navbar-collapse justify-content-center d-flex px-0 "
          id="navbarNav"
        >
          <div>
            <div className='d-flex align-items-center'>
              <input type="search" className='form-control me-2' placeholder='Search' style={{
                border: "1px solid #ced4da",
                borderRadius: "0.5rem",
                height: "32px",
                padding: "20px"
              }} />
              <button className='btn btn-primary'>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item d-block d-xl-none">
                <a
                  className="nav-link sidebartoggler nav-icon-hover"
                  id="headerCollapse"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-menu-2" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-icon-hover" href="javascript:void(0)">
                  <i className="ti ti-bell-ringing" />
                  <div className="notification bg-primary rounded-circle" />
                </a>
              </li>
            </ul>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                id="user-profile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => showDropdownMenu()}
                style={{cursor:'pointer'}}
              >
                <img
                  src="../../src/assets/images/profile/user-1.jpg"
                  alt=""
                  width={35}
                  height={35}
                  className="rounded-circle"
                />
              </a>
              {
                showDropdown && (
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    id="dropdown-menu"
                    aria-labelledby="drop2"
                    style={{ display: "block", position: "absolute", right: 0, left: "auto" }}
                  >
                    <div className="message-body">
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-user fs-6" />
                        <p className="mb-0 fs-3">My Profile</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-mail fs-6" />
                        <p className="mb-0 fs-3">My Account</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-list-check fs-6" />
                        <p className="mb-0 fs-3">My Task</p>
                      </a>
                      <a
                        href="./authentication-login.html"
                        className="btn btn-outline-primary mx-3 mt-2 d-block"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )
              }

            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
