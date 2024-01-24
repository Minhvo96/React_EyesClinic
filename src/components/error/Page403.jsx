import React from 'react'
import addStyleDashboard from '../../AddStyleDashboard';
import { Link, useNavigate } from 'react-router-dom';

export default function Page403() {
  addStyleDashboard();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard/waiting-list")// Quay lại trang trước đó
  };
  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="row justify-content-end w-100">
            <div className='body-wrapper'>
              <div className='container-fluid' style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <div className="card mb-0 d-flex align-items-center justify-content-center p-4" style={{ flexDirection: 'column' }}>
                  <img
                    src="https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1705285188~exp=1705285788~hmac=272b5489b8095e6538444974e4ace2a936e866d6e24dcdac05f89bbbe5746423"
                    width={560}
                    alt=""
                  />
                  <h1 className='error-title text-danger text-center' style={{ fontSize: "3rem" }}>Oops!</h1>
                  <p className="text-center fw-bold" style={{ fontSize: "1.25rem" }}>Bạn không có quyền truy cập trang này</p>
                  <button
                    type='button'
                    className="btn btn-outline-primary py-8 fs-4 mb-4 rounded-2"
                    onClick={handleGoBack}
                  >
                    Về trang trước
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

