import React, { useEffect, useState } from 'react'
import bookingService from '../services/bookingServices';
import medicineService from '../services/medicineService';
import NavbarDoctor from './NavbarDoctor';
import prescriptionService from '../services/prescriptionService';
import addStyleDashboard from '../AddStyleDashboard';
import Sidebar from '../components/dashboard/Sidebar';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useParams } from 'react-router-dom';

const schemaPrescription = yup.object({
    leftEye: yup.number()
        .required("Cần phải nhập thị lực của bệnh nhân")
        .typeError("Cần phải nhập số")
        .min(0, "Thị lực không được nhỏ hơn 0")
        .max(10, "Thị lực không được lớn hơn 10"),
    rightEye: yup.number()
        .required("Cần phải nhập thị lực của bệnh nhân")
        .typeError("Cần phải nhập số")
        .min(0, "Thị lực không được nhỏ hơn 0")
        .max(10, "Thị lực không được lớn hơn 10"),
    diagnose: yup.string()
        .required("Không được để trống chẩn đoán")
});

export default function Doctor() {
    addStyleDashboard();

    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});
    const [prescriptionById, setPrescriptionById] = useState({});
    const [leftEye, setLeftEye] = useState('');
    const [rightEye, setRightEye] = useState('');

    const [patientInfo, setPatientInfo] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [quantityInput, setQuantityInput] = useState({});
    const [usingMedicine, setUsingMedicine] = useState({});
    const [medicineStatus, setMedicineStatus] = useState(false);
    const [diagnoseInputs, setDiagnoseInputs] = useState();

    const [quantityValidates, setQuantityValidates] = useState(Array(medicines.length).fill(''));
    const [quantityErrors, setQuantityErrors] = useState(Array(medicines.length).fill(''));
    const [usingMedicineErrors, setUsingMedicineErrors] = useState(Array(medicines.length).fill(''));

    const [prescription, setPrescription] = useState({});

    const { register: registerPrescription, handleSubmit: handleSubmitPrescription, formState: { errors: errorsPrescription }, reset: resetPrescription } = useForm({
        resolver: yupResolver(schemaPrescription),
        mode: "onBlur",
        criteriaMode: "all"
    });

    const getPatientInfo = async () => {
        const data = await bookingService.getBookingByStatus();
        setPatientInfo(data);
    }

    const getAllMedicines = async () => {
        const dataMedicine = await medicineService.getAllMedicines();
        setMedicines(dataMedicine);
    }

    const getBookingById = async () => {
        const booking = await bookingService.getBookingById(bookingId);
        setBooking(booking);
    }

    const getPrescriptionByBookingId = async () => {
        const prescription = await prescriptionService.getPrescriptionByBookingId(bookingId);
        setPrescriptionById(prescription);
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

    const handleQuantityInputChange = (e, id, indexs) => {

        validateQuantityInputs(e, indexs);

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

    const validateQuantityInputs = (e, indexs) => {
        const value = e.target.value;

        // Tạo một bản sao mới của mảng trạng thái
        // const newQuantityValidates = [...quantityValidates];
        // newQuantityValidates[indexs] = value;
        // setQuantityValidates(newQuantityValidates);

        // Kiểm tra xem giá trị nhập vào có phải là số nguyên dương không
        const isValidQuantity = /^\d+$/.test(value) && parseInt(value, 10) > 0;

        // Tạo một bản sao mới của mảng lỗi
        const newQuantityErrors = [...quantityErrors];
        newQuantityErrors[indexs] = isValidQuantity ? '' : 'Vui lòng nhập số thuốc hợp lệ';
        setQuantityErrors(newQuantityErrors);
    }


    const handleUsingMedicine = (e, id, indexs) => {

        validateUsingMedicineInputs(e, indexs);

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

    const validateUsingMedicineInputs = (e, indexs) => {
        const value = e.target.value;

        const isValidUsingMedicine = value !== '';

        const newUsingMedicineErrors = [...usingMedicineErrors];
        newUsingMedicineErrors[indexs] = isValidUsingMedicine ? '' : 'Vui lòng nhập HDSD thuốc cho bệnh nhân';
        setUsingMedicineErrors(newUsingMedicineErrors);
    }

    const handleAddMedicines = () => {
        if (selectedMedicines.length == 0) {
            setMedicineStatus(false);
        } else {
            setMedicineStatus(true);
        }
    }

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
            idBooking: String(bookingId),
            idDoctor: "1",
            eyeSight: leftEye + ', ' + rightEye,
            diagnose: diagnoseInputs.diagnose,
            note: diagnoseInputs.note,
            idsMedicine: idsMedicine
        })
    }



    useEffect(() => {

        async function CreatePrescription() {
            await prescriptionService.createPrescription(prescription);

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
            setPatientInfo({});
        }

        if (Object.keys(prescription).length) {
            CreatePrescription();
        }

    }, [prescription])

    useEffect(() => {
        getBookingById();
        getPrescriptionByBookingId();
        getPatientInfo();
        getAllMedicines();
    }, [])

    useEffect(() => {
        if (Object.keys(prescriptionById).length) {
            const eyeSight = prescriptionById.eyeSight;
            setLeftEye(eyeSight.split(",")[0]);
            setRightEye(eyeSight.split(",")[1]);
        }
    }, [prescriptionById])

    return (
        <>
            <div className='container d-flex' style={{
                position: 'fixed',
                zIndex: '20',
                marginTop: '97px',
                paddingRight: '50px'
            }}>
                {Object.keys(booking).length ?
                    <div className='d-flex row' style={{ position: 'absolute', width: '120%' }}>
                        <div className='col-9'>
                            <h3>Bệnh án điện tử</h3>
                            <form className="needs-validation">
                                <div className='d-flex row mt-4'>
                                    <div className="col-6">
                                        <label htmlFor="basic-url" className="form-label">Mắt trái :</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className='form-control'
                                                id="basic-url" aria-describedby="basic-addon3" value={leftEye + "/10"} name="leftEye" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="basic-url" className="form-label">Mắt phải :</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className='form-control'
                                                id="basic-url" aria-describedby="basic-addon3" value={rightEye + "/10"} name="rightEye" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex row mt-4'>
                                    <div className="col-6">
                                        <label htmlFor="basic-url" className="form-label">Chẩn đoán bệnh :</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className={`form-control ${errorsPrescription?.diagnose?.message ? 'is-invalid' : ''}`}
                                                {...registerPrescription('diagnose')}
                                                id="basic-url" aria-describedby="basic-addon3" placeholder='...' name="diagnose" onChange={handleChangePrescription} />
                                            <span className="invalid-feedback">{errorsPrescription?.diagnose?.message}</span>
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
                                        <button type="button" className="btn btn-primary rounded-0" onClick={handleSubmitPrescription(handleAddPrescription)}>Lưu bệnh án</button>
                                        <button type="button" className="btn btn-danger ml-2 rounded-0" onClick={() => resetPrescription()}>Hủy thao tác</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-3'>
                            <h3>Thông tin bệnh nhân</h3>
                            <div className='text-center'>
                                <img src='../../images/user-icon.png' style={{ width: 150, borderRadius: '50%' }} />
                                <p style={{ fontWeight: 'bold' }} readOnly>{booking?.customer?.user?.fullName + ', ' + booking?.customer?.age + ' tuổi'}</p>
                            </div>
                            <div>
                                <label htmlFor="basic-url" className="form-label">Số điện thoại:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.user?.phoneNumber} />
                                </div>
                                <label htmlFor="basic-url" className="form-label">Địa chỉ nhà:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.user?.address} />
                                </div>
                                <label htmlFor="basic-url" className="form-label">Ngày đến khám:</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.dateBooking} />
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
                                            medicines?.map((medicine, index) =>
                                                <tr className="tr-class-2" key={medicine.id}>
                                                    <td><input type="checkbox" onChange={() => handleChangeMedicine(medicine.id, medicine.nameMedicine, medicine.stockQuantity)} /></td>
                                                    <td style={{ width: '33.33%' }}>{medicine.nameMedicine}</td>

                                                    <td style={{ width: '33.33%' }}>
                                                        <input type="text" className={`form-control text-center ${quantityErrors[index] ? 'is-invalid' : ''}`}
                                                            onChange={(e) => handleQuantityInputChange(e, medicine.id, index)} />
                                                        {quantityErrors[index] && <div className="invalid-feedback">{quantityErrors[index]}</div>}
                                                    </td>

                                                    <td style={{ width: '33.33%' }}>
                                                        <input type="text" className={`form-control text-center ${usingMedicineErrors[index] ? 'is-invalid' : ''}`}
                                                            onChange={(e) => handleUsingMedicine(e, medicine.id, index)} />
                                                        {usingMedicineErrors[index] && <div className="invalid-feedback">{usingMedicineErrors[index]}</div>}
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
