import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import patientService from '../services/bookingServices';
import medicineService from '../services/medicineService';
import NavbarDoctor from './NavbarDoctor';


export default function Doctor() {
    const [patientInfo, setPatientInfo] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const getPatientInfo = async () => {
        const data = await patientService.getPatientInfo();
        setPatientInfo(data);
    }

    const getAllMedicines = async () => {
        const dataMedicine = await medicineService.getAllMedicines();
        setMedicines(dataMedicine);
    }

    const handleAddDisease = () => {
        const sideDisease = document.getElementsByClassName('side-disease');
        const sideDiseaseArray = Array.from(sideDisease);
        
        const checkedCheckboxes = sideDiseaseArray.filter(checkbox => checkbox.checked);
        const checkboxesValues = checkedCheckboxes.map(item => item.value);

        setDiseases(checkboxesValues);
    }


    useEffect(() => {
        getPatientInfo();
        getAllMedicines();
    }, [])

    useEffect(() => {
        console.log(diseases);
    }, [diseases])


    return (
        <>
            <NavbarDoctor />

            <div className='container-fluid mt-4 d-flex'>
                <div className='col-2'>
                    <ul className="list-group">
                        <li className="list-group-item" > <i className="fa-solid fa-capsules" /> Thuốc</li>
                        <li className="list-group-item" > <i className="fa-solid fa-notes-medical" /> Hồ sơ bệnh án </li>
                        <li className="list-group-item" > <i className="fa-solid fa-stethoscope" /> Lịch khám</li>
                        <li className="list-group-item" > <i className="fa-regular fa-eye" /> Dịch vụ mắt</li>
                        <li className="list-group-item" > <i className="fa-solid fa-heart-circle-plus" /> Quản lý</li>
                    </ul>
                </div>
                <div className='col-7'>
                    <h3>Bệnh án điện tử</h3>
                    <div className='d-flex row mt-4'>
                        <div className="col-6">
                            <label htmlFor="basic-url" className="form-label">Mắt trái :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' />
                            </div>
                        </div>
                        <div className="col-6">
                            <label htmlFor="basic-url" className="form-label">Mắt phải :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex row mt-4'>
                        <div className="col-6">
                            <label htmlFor="basic-url" className="form-label">Chẩn đoán bệnh :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' />
                            </div>
                        </div>
                        <div className="col-6">
                            <label htmlFor="basic-url" className="form-label">Dịch vụ :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={patientInfo.length > 0 ? patientInfo[0].services.name : ''} readOnly />
                            </div>
                        </div>
                    </div>
                    <label htmlFor="basic-url" className="form-label">Bệnh phụ :</label>
                    <div className='d-flex'>
                        <div className="form-check mr-5">
                            <input className="side-disease" type="checkbox" value="Bệnh tiểu đường" id="flexCheckDefault" onClick={handleAddDisease} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Bệnh tiểu đường
                            </label>

                        </div>
                        <div className="form-check mr-5">
                            <input className="side-disease" type="checkbox" value="Bệnh tim mạch" id="flexCheckChecked" onClick={handleAddDisease} />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Bệnh tim mạch
                            </label>
                        </div>
                        <div className="form-check mr-5">
                            <input className="side-disease" type="checkbox" value="Các loại dị ứng" id="flexCheckChecked" onClick={handleAddDisease} />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Các loại dị ứng
                            </label>
                        </div>
                    </div>
                    <div className='d-flex row mt-4'>
                        <div className="col-12">
                            <label htmlFor="basic-url" className="form-label">Ghi chú :</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-secondary rounded-0 py-3 px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                        <p style={{ fontWeight: 'bold' }} readOnly>{patientInfo.length > 0 ? patientInfo[0].customer.user.fullName + ', ' + patientInfo[0].customer.age : ''}</p>
                    </div>
                    <div>
                        <label htmlFor="basic-url" className="form-label">Số điện thoại:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo.length > 0 ? patientInfo[0].customer.user.phoneNumber : ''} />
                        </div>
                        <label htmlFor="basic-url" className="form-label">Địa chỉ:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo.length > 0 ? patientInfo[0].customer.user.address : ''} />
                        </div>
                        <label htmlFor="basic-url" className="form-label">Ngày đến khám:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo.length > 0 ? patientInfo[0].dateBooking : ''} />
                        </div>
                    </div>
                </div>
            </div>


            {/* <// Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chọn thuốc kê đơn</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <table data-toggle="table" data-classes="table table-hover table-condensed">
                                    <thead>
                                        <tr className='text-center'>
                                            <th data-field="state" data-checkbox="true"></th>
                                            <th className="col-xs-4" data-field="Medicine" data-sortable="true">Tên thuốc</th>
                                            <th className="col-xs-4" data-field="Quantity" data-sortable="true">Số lượng kê đơn</th>
                                            <th className="col-xs-4" data-field="QuantityStock">Trong kho</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {
                                            medicines.map(medicine =>
                                                <tr className="tr-class-2" key={medicine.id}>
                                                    <td><input type="checkbox" /></td>
                                                    <td style={{ width: '33.33%' }} value={medicine.nameMedicine}>{medicine.nameMedicine}</td>
                                                    <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center' /></td>
                                                    <td style={{ width: '33.33%' }} className='text-center' value={medicine.stockQuantity}>{medicine.stockQuantity}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Thêm thuốc</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
