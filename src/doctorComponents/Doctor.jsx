import React, { useEffect, useState } from 'react'
import bookingService from '../services/bookingServices';
import medicineService from '../services/medicineService';
import NavbarDoctor from './NavbarDoctor';
import medicinePrescriptionService from '../services/medicinePrescriptionService';
import addStyleDashboard from '../AddStyleDashboard';
import Sidebar from '../components/dashboard/Sidebar';

export default function Doctor() {
    addStyleDashboard();

    const [patientInfo, setPatientInfo] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [quantityInput, setQuantityInput] = useState({});
    const [usingMedicine, setUsingMedicine] = useState({});
    const [medicineStatus, setMedicineStatus] = useState(false);
    const [diagnoseInputs, setDiagnoseInputs] = useState();

    const [prescription, setPrescription] = useState(); 

    const getPatientInfo = async () => {
        const data = await bookingService.getBookingByStatus();
        console.log(data);
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

    const handleChangeMedicine = (id, nameMedicine, stockQuantity) => {
        const isSelected = selectedMedicines.some(medicine => medicine.id === id);

        if (isSelected) {
            const updatedMedicines = selectedMedicines.filter(medicine => medicine.id !== id);
            setSelectedMedicines(updatedMedicines);
        } else {
            setSelectedMedicines([...selectedMedicines, { id, nameMedicine, stockQuantity, quantity: quantityInput[id] || '', usingMedicine: usingMedicine[id] || '' }]);
        }
    };

    const handleQuantityInputChange = (e, id) => {
        const updatedInputs = { ...quantityInput, [id]: e.target.value };
        setQuantityInput(updatedInputs);

        const updatedMedicines = selectedMedicines.filter(medicine => medicine.id == id);
        const updatedMedicine = updatedMedicines[0];

        const index = selectedMedicines.findIndex(medicine => medicine.id == id);

        const updateNewMedicine = { ...updatedMedicine, quantity: updatedInputs[id] };
        const newSelectedMedicines = [...selectedMedicines];
        newSelectedMedicines[index] = updateNewMedicine;

        setSelectedMedicines([...newSelectedMedicines]);
    }

    const handleUsingMedicine = (e, id) => {
        const updatedInputs = { ...usingMedicine, [id]: e.target.value };
        setUsingMedicine(updatedInputs);

        const updatedMedicines = selectedMedicines.filter(medicine => medicine.id == id);
        const updatedMedicine = updatedMedicines[0];

        const index = selectedMedicines.findIndex(medicine => medicine.id == id);

        const updateNewMedicine = { ...updatedMedicine, usingMedicine: updatedInputs[id] };
        const newSelectedMedicines = [...selectedMedicines];
        newSelectedMedicines[index] = updateNewMedicine;

        setSelectedMedicines([...newSelectedMedicines]);
    }

    const handleAddMedicines = () => {
        setMedicineStatus(true);
    }

    useEffect(() => {
        getPatientInfo();
        getAllMedicines();
    }, [])

    // useEffect(() => {
    //     getPatientInfo();
    // }, [patientInfo])

    const handleChangePrescription = (e) => {
        setDiagnoseInputs({
            ...diagnoseInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleAddPrescription = async () => {
        const idsMedicine = selectedMedicines.map(item => ({
            id: String(item.id),
            quantity: item.quantity,
            usingMedicine: item.usingMedicine
        }))

        setPrescription({
            idBooking: String(patientInfo.id),
            idDoctor: "1",
            eyeSight: diagnoseInputs.leftEye + ', ' + diagnoseInputs.rightEye,
            diagnose: diagnoseInputs.diagnose,
            note: diagnoseInputs.note,
            idsMedicine: idsMedicine
        })

        await medicinePrescriptionService.createMedicinePrescription(prescription);

        const booking = await bookingService.getBookingById(patientInfo.id);

        const newBooking = {
            idEyeCategory: String(booking.eyeCategory.id),
            idCustomer: String(booking.customer.id),
            timeBooking: booking.timeBooking,
            dateBooking: booking.dateBooking,
            status: 'UNPAID'
        };

        await bookingService.editBooking(newBooking, booking.id);

        setMedicineStatus(false);
    }

    return (
        <>
            <Sidebar />
            <NavbarDoctor />

            <div className='container mt-4 d-flex'>
                {patientInfo ?
                    <div className='d-flex row' style={{ position: 'absolute', width: '85%' }}>
                        <div className='col-9'>
                            <h3>Bệnh án điện tử</h3>
                            <div className='d-flex row mt-4'>
                                <div className="col-6">
                                    <label htmlFor="basic-url" className="form-label">Mắt trái :</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' name="leftEye" onChange={handleChangePrescription} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="basic-url" className="form-label">Mắt phải :</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='.../10' name="rightEye" onChange={handleChangePrescription} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex row mt-4'>
                                <div className="col-6">
                                    <label htmlFor="basic-url" className="form-label">Chẩn đoán bệnh :</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' name="diagnose" onChange={handleChangePrescription} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="basic-url" className="form-label">Dịch vụ :</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={patientInfo?.eyeCategory?.nameCategory} readOnly />
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="basic-url" className="form-label">Bệnh phụ :</label>
                            <div className='d-flex'>
                                <div className="form-check mr-5">
                                    <input className="form-check-input side-disease" type="checkbox" value="Bệnh tiểu đường" id="flexCheckDefault" onClick={handleAddDisease} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Bệnh tiểu đường
                                    </label>
                                </div>
                                <div className="form-check mr-5">
                                    <input className="form-check-input side-disease" type="checkbox" value="Bệnh tim mạch" id="flexCheckChecked" onClick={handleAddDisease} />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Bệnh tim mạch
                                    </label>
                                </div>
                                <div className="form-check mr-5">
                                    <input className="form-check-input side-disease" type="checkbox" value="Các loại dị ứng" id="flexCheckChecked" onClick={handleAddDisease} />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Các loại dị ứng
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex row mt-4'>
                                <div className="col-12">
                                    <label htmlFor="basic-url" className="form-label">Ghi chú :</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder='...' name="note" onChange={handleChangePrescription} />
                                    </div>
                                </div>
                            </div>
                            <table className="table text-center">
                                {medicineStatus && (
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên thuốc</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Cách dùng</th>
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    {medicineStatus && selectedMedicines.map((selectedMedicine, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{selectedMedicine.nameMedicine}</td>
                                            <td>{selectedMedicine.quantity}</td>
                                            <td>{selectedMedicine.usingMedicine}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button" className="btn btn-secondary rounded-0 py-3 px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Chọn thuốc
                            </button>
                            <div className='d-flex row mt-4 text-end'>
                                <div>
                                    <button type="button" className="btn btn-primary rounded-0" onClick={handleAddPrescription}>Lưu bệnh án</button>
                                    <button type="button" className="btn btn-danger ml-2 rounded-0">Hủy thao tác</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <h3>Thông tin bệnh nhân</h3>
                            <div className='text-center'>
                                <img src='images/user-icon.png' style={{ width: 150, borderRadius: '50%' }} />
                                <p style={{ fontWeight: 'bold' }} readOnly>{patientInfo?.customer?.user?.fullName + ', ' + patientInfo?.customer?.age + ' tuổi'}</p>
                            </div>
                            <div>
                                <label htmlFor="basic-url" className="form-label">Số điện thoại:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo?.customer?.user?.phoneNumber} />
                                </div>
                                <label htmlFor="basic-url" className="form-label">Địa chỉ nhà:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo?.customer?.user?.address} />
                                </div>
                                <label htmlFor="basic-url" className="form-label">Ngày đến khám:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={patientInfo?.dateBooking} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div><p style={{ color: 'red' }}>Hiện tại chưa có bệnh nhân vào khám!</p></div>
                }
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
                                            <th className="col-xs-4" data-field="QuantityStock">Cách dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {
                                            medicines.map(medicine =>
                                                <tr className="tr-class-2" key={medicine.id}>
                                                    <td><input type="checkbox" onChange={() => handleChangeMedicine(medicine.id, medicine.nameMedicine, medicine.stockQuantity)} /></td>
                                                    <td style={{ width: '33.33%' }}>{medicine.nameMedicine}</td>
                                                    <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center'
                                                        onChange={(e) => handleQuantityInputChange(e, medicine.id)} />
                                                    </td>
                                                    <td style={{ width: '33.33%' }}><input type="text" className='form-control text-center'
                                                        onChange={(e) => handleUsingMedicine(e, medicine.id)} />
                                                    </td>
                                                    {/* <td style={{ width: '33.33%' }} className='text-center'>{medicine.stockQuantity}</td> */}
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddMedicines}>Thêm thuốc</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
