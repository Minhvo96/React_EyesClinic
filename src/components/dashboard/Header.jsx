import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthProvider';

export default function Header({ search }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const auth = useAuthContext();

  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown)
  }

  const submitSearch = () => {
    const searchInput = document.getElementById('search');
    search(searchInput.value);
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

  return (
    <header className="app-header" style={{ zIndex: 30 }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ marginLeft: "24px" }}>

        <div
          className="navbar-collapse justify-content-center d-flex px-0 "
          id="navbarNav"
        >
          {(auth?.user?.roles === "ROLE_DOCTOR" || auth?.user?.roles === "ROLE_ADMIN") &&
            <div>
              <div className='d-flex align-items-center'>
               
                  <input
                    type="search"
                    className='form-control me-2'
                    id='search'
                    placeholder='Tìm kiếm...'
                    onChange={search}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.5rem",
                      height: "32px",
                      padding: "20px"
                    }}
                  />
                  <button className='btn btn-primary' onClick={() => submitSearch()}>
                    <i className="fas fa-search" />
                  </button>
                
              </div>
            </div>}

          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item d-block d-xl-none">
                <a
                  className="nav-link sidebartoggler nav-icon-hover"
                  id="headerCollapse"

                >
                  <i className="ti ti-menu-2" />
                </a>
              </li>
              {/* <li className="nav-item" style={{ cursor: "pointer" }}>
                <a className="nav-link nav-icon-hover" >
                  <i className="ti ti-bell-ringing" />
                  <div className="notification bg-primary rounded-circle" />
                </a>
              </li> */}
            </ul>
            <li className="nav-item dropdown">
              <div
                className="nav-link nav-icon-hover"
                id="user-profile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => showDropdownMenu()}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={auth.user.image}
                  alt=""
                  width={35}
                  height={35}
                  className="rounded-circle"
                />
              </div>
              {
                showDropdown && (
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    id="dropdown-menu"
                    aria-labelledby="drop2"
                    style={{ display: "block", position: "absolute", right: 0, left: "auto" }}
                  >
                    <div className="message-body">
                      <div
                        className="d-flex ml-1 gap-2 dropdown-item"
                        style={{ flexDirection: "column" }}
                      >
                        <h5 className='mb-0 fw-bold'>{auth?.user?.fullName.toUpperCase()}</h5>
                        {auth?.user?.roles === 'ROLE_RECEPTIONIST' && (
                          <p className="mb-0 fs-3 text-secondary">LỄ TÂN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_DOCTOR' && (
                          <p className="mb-0 fs-3 text-secondary">BÁC SĨ</p>
                        )}
                        {auth?.user?.roles === 'ROLE_ADMIN' && (
                          <p className="mb-0 fs-3 text-secondary">ADMIN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_CASHIER' && (
                          <p className="mb-0 fs-3 text-secondary">THU NGÂN</p>
                        )}
                        {auth?.user?.roles === 'ROLE_ASSISTANT' && (
                          <p className="mb-0 fs-3 text-secondary">PHỤ TÁ</p>
                        )}
                      </div>
                      <button

                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-user fs-6" />
                        <p className="mb-0 fs-3">Tài khoản</p>
                      </button>
                      <button
                        className="d-flex align-items-center gap-2 dropdown-item mb-2"
                      >
                        <i className="ti ti-mail fs-6" />
                        <p className="mb-0 fs-3">Hộp thư</p>
                      </button>

                      <button
                        className="btn btn-outline-primary mb-2 ms-3" style={{ width: "83%" }}
                        onClick={auth.logout}
                      >
                        Đăng xuất
                      </button>
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
