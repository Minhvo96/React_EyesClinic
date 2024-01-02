import React from 'react'
import { Link } from 'react-router-dom'

export default function Doctor() {
    return (
        <>
            <nav>
                <div className='container-fluid d-flex mt-3'>
                    <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                        <Link to='/doctor'><img className='mt-2' src='images/logo1.jpg' style={{ width: 100 }} /></Link>
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
                        <div className="dropdown" style={{ fontSize: '10px' }}>
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
                                <li><Link className="dropdown-item" to='/'> <i class="fa-solid fa-user-doctor" /> Thông tin cá nhân</Link></li>
                                <li><Link className="dropdown-item" to='/'> <i class="fa-solid fa-door-open" /> Về trang chủ</Link></li>
                                <li><Link className="dropdown-item" to='/'> <i class="fa-solid fa-right-from-bracket" /> Đăng xuất</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='container-fluid mt-4 d-flex'>
                <div className='col-2'>
                    <ul className="list-group">
                        <li className="list-group-item" > <i class="fa-solid fa-capsules" /> Thuốc</li>
                        <li className="list-group-item" > <i class="fa-solid fa-notes-medical" /> Hồ sơ bệnh án </li>
                        <li className="list-group-item" > <i class="fa-solid fa-stethoscope" /> Lịch khám</li>
                        <li className="list-group-item" > <i class="fa-regular fa-eye" /> Dịch vụ mắt</li>
                        <li className="list-group-item" > <i class="fa-solid fa-heart-circle-plus" /> Quản lý</li>
                    </ul>
                </div>
                <div className='col-7'>
                    <h3>Bệnh án điện tử</h3>
                    <div className='d-flex row mt-4'>
                        <div className="col-6">
                            <label for="basic-url" class="form-label">Mắt phải :</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' />
                            </div>
                        </div>
                        <div className="col-6">
                            <label for="basic-url" class="form-label">Mắt trái :</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex row mt-4'>
                        <div className="col-6">
                            <label for="basic-url" className="form-label">Chẩn đoán bệnh :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' />
                            </div>
                        </div>
                        <div className="col-6">
                            <label for="basic-url" class="form-label">Bệnh phụ :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' />
                            </div>
                        </div>
                    </div>
                    <label for="basic-url" class="form-label">Bệnh phụ :</label>
                    <div className='d-flex'>
                        <div className="form-check mr-5">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Bệnh tiểu đường
                            </label>

                        </div>
                        <div class="form-check mr-5">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" for="flexCheckChecked">
                                Tim mạch
                            </label>
                        </div>
                        <div class="form-check mr-5">
                            <input className="form-check-input " type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" for="flexCheckChecked">
                                Các loại dị ứng
                            </label>
                        </div>
                    </div>
                    <div className='d-flex row mt-4'>
                        <div className="col-12">
                            <label for="basic-url" className="form-label">Ghi chú :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary rounded-0 py-3 px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Chọn thuốc
                    </button>
                    <div className='d-flex row mt-4 justify-content-end'>
                        <div>
                            <button type="button" className="btn btn-primary rounded-0">Lưu bệnh án</button>
                            <button type="button" className="btn btn-danger ml-2 rounded-0">Hủy thao tác</button>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <h3>Thông tin bệnh nhân</h3>
                    <div className='text-center'>
                        <img src='images/BSMinh2.jpg' style={{ width: 150, borderRadius: '50%' }} />
                        <p style={{ fontWeight: 'bold' }}>Đặng Văn Híu, 21 tuổi</p>
                    </div>
                    <div>
                        <label for="basic-url" class="form-label">Số điện thoại:</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={123}/>
                        </div>
                        <label for="basic-url" class="form-label">Địa chỉ:</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={123}/>
                        </div>
                        <label for="basic-url" class="form-label">Ngày đến khám:</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={123}/>
                        </div>
                    </div>
                </div>
            </div>


            {/* <// Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Chọn thuốc kê đơn</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <table data-toggle="table" data-classes="table table-hover table-condensed">
                                    <thead>
                                        <tr className='text-center'>
                                            <th data-field="state" data-checkbox="true"></th>
                                            <th class="col-xs-4" data-field="Medicine" data-sortable="true">Tên thuốc</th>
                                            <th class="col-xs-4" data-field="Quantity" data-sortable="true">Số lượng kê đơn</th>
                                            <th class="col-xs-4" data-field="QuantityStock">Trong kho</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        <tr class="tr-class-2">
                                            <td><input type="checkbox" /></td>
                                            <td style={{ width: '33.33%' }}>Berberin</td>
                                            <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center' /></td>
                                            <td style={{ width: '33.33%' }} className='text-center'>200</td>
                                        </tr>
                                        <tr class="tr-class-2">
                                            <td><input type="checkbox" /></td>
                                            <td style={{ width: '33.33%' }}>Berberin</td>
                                            <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center' /></td>
                                            <td style={{ width: '33.33%' }} className='text-center'>100</td>
                                        </tr>
                                        <tr class="tr-class-2">
                                            <td><input type="checkbox" /></td>
                                            <td style={{ width: '33.33%' }}>Berberin</td>
                                            <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center' /></td>
                                            <td style={{ width: '33.33%' }} className='text-center'>100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
