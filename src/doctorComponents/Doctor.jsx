import React, { useEffect, useState } from 'react'
import bookingService from '../services/bookingServices';
import medicineService from '../services/medicineService';
import prescriptionService from '../services/prescriptionService';
import addStyleDashboard from '../AddStyleDashboard';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import StepProgressBar from '../components/progress/Progress';
import Swal from 'sweetalert2';
import UsingWebSocket from '../Socket';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { toast } from 'react-toastify';

const schemaPrescription = yup.object({
    diagnose: yup.string()
        .required("Không được để trống chẩn đoán")
});

export default function Doctor() {

    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});
    const [prescriptionById, setPrescriptionById] = useState({});
    const [leftEye, setLeftEye] = useState('');
    const [rightEye, setRightEye] = useState('');
    const [progressBarPercent, setProgressBarPercent] = useState(50);
    const [medicines, setMedicines] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [selectedMedicines, setSelectedMedicines] = useState([]);

    const [quantityInput, setQuantityInput] = useState({});
    const [usingMedicine, setUsingMedicine] = useState({});
    const [noteMedicine, setNoteMedicine] = useState({});

    const [medicineStatus, setMedicineStatus] = useState(false);
    const [diagnoseInputs, setDiagnoseInputs] = useState();
    const [prescription, setPrescription] = useState({});
    const [loading, setLoading] = useState(true);

    const navigator = useNavigate();

    const { register: registerPrescription, handleSubmit: handleSubmitPrescription, formState: { errors: errorsPrescription }, reset: resetPrescription } = useForm({
        resolver: yupResolver(schemaPrescription),
        mode: "onBlur",
        criteriaMode: "all"
    });

    const getAllMedicines = async () => {
        const dataMedicine = await medicineService.getAllMedicinesOptions();
        setMedicines(dataMedicine);
    }

    const getBookingById = async () => {
        const booking = await bookingService.getBookingById(bookingId);
        setBooking(booking);
    }

    const getPrescriptionByBookingId = async () => {
        const prescription = await prescriptionService.getPrescriptionByBookingId(bookingId);
        if (prescription.eyeSight == null) {
            setLoading(false);
        } else {
            setPrescriptionById(prescription);
            setLoading(false);
        }
    }

    const handleAddDisease = () => {
        const sideDisease = document.getElementsByClassName('side-disease');
        const sideDiseaseArray = Array.from(sideDisease);

        const checkedCheckboxes = sideDiseaseArray.filter(checkbox => checkbox.checked);
        const checkboxesValues = checkedCheckboxes.map(item => item.value);

        setDiseases(checkboxesValues);
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
            usingMedicine: item.usingMedicine,
            noteMedicine: item.noteMedicine
        }))

        Swal.fire({
            title: `Xác nhận tạo bệnh án cho bệnh nhân ${booking.customer.user.fullName}?`,
            showCancelButton: true,
            confirmButtonText: 'Lưu ngay',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setPrescription({
                    idBooking: String(bookingId),
                    idDoctor: "1",
                    eyeSight: leftEye + ',' + rightEye,
                    diagnose: diagnoseInputs.diagnose,
                    note: `${diagnoseInputs.note}, ${diseases.join(", ")}`,
                    idsMedicine: idsMedicine
                })
                setLoading(true);
            }
        })
    }

    useEffect(() => {
        async function CreatePrescription() {
            await prescriptionService.editPrescription(prescription, bookingId);

            const booking = await bookingService.getBookingById(bookingId);

            const newBooking = {
                idEyeCategory: String(booking.eyeCategory.id),
                idCustomer: String(booking.customer.id),
                timeBooking: booking.timeBooking,
                dateBooking: booking.dateBooking,
                status: 'UNPAID'
            };

            await bookingService.editBooking(newBooking, booking.id);
            setMedicineStatus(false);
            Swal.fire('Tạo bệnh án thành công!', '', 'success')
            setTimeout(() => {
                Swal.close();
            }, 2000);
            navigator('/dashboard/waiting-list');
        }

        if (Object.keys(prescription).length) {
            CreatePrescription();
        }

    }, [prescription])

    useEffect(() => {
        getBookingById();
        getPrescriptionByBookingId();
        getAllMedicines();
        UsingWebSocket();
    }, [])

    useEffect(() => {
        if (Object?.keys(prescriptionById)?.length) {
            const eyeSight = prescriptionById.eyeSight;
            setLeftEye(eyeSight.split(",")[0]);
            setRightEye(eyeSight.split(",")[1]);
        }
    }, [prescriptionById])


    const [showInputSearchMedicine, setShowInputSearchMedicine] = useState(false);
    const [searchString, setSearchString] = useState({});

    const handleOnSearch = (string, results) => {
        medicines.filter(medicine => medicine.nameMedicine.toLowerCase().includes(string.toLowerCase()) || medicine.type.toLowerCase().includes(string.toLowerCase()));
    }

    const handleAddMedicines = (item) => {
        setSearchString({});
        setSelectedMedicines([...selectedMedicines, { id: item.id, nameMedicine: item.nameMedicine, quantity: quantityInput[item.id] || '', usingMedicine: usingMedicine[item.id] || '', noteMedicine: noteMedicine[item.id] || '' }]);
    }

    const handleOnSelect = (item) => {
        const isSelected = selectedMedicines.some(medicine => medicine.id === item.id);

        if (isSelected) {
            toast.warning("Thuốc này đã có trong danh sách!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500
            });
            setSearchString({});
        } else {
            setSearchString({ id: item.id, nameMedicine: item.nameMedicine, quantity: quantityInput[item.id] || '', usingMedicine: usingMedicine[item.id] || '' });
        }
    };

    const handleChangeQuantity = (id, e) => {

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

    const handleChangeUsingMedicine = (id, e) => {

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

    const handleChangeNoteMedicine = (id, e) => {
        const updatedInputs = { ...noteMedicine, [id]: e.target.value };
        setNoteMedicine(updatedInputs);

        const updatedMedicines = selectedMedicines.filter(medicine => medicine.id == id);
        const updatedMedicine = updatedMedicines[0];

        const index = selectedMedicines.findIndex(medicine => medicine.id == id);

        const updateNewMedicine = { ...updatedMedicine, noteMedicine: updatedInputs[id] };
        const newSelectedMedicines = [...selectedMedicines];
        newSelectedMedicines[index] = updateNewMedicine;

        setSelectedMedicines([...newSelectedMedicines]);
    }

    const handleShowInputSearchMedicine = () => {
        setShowInputSearchMedicine(!showInputSearchMedicine);
    }

    const handleDeleteMedicine = (id) => {
        const index = selectedMedicines.findIndex(medicine => medicine.id == id);
        const newSelectedMedicines = [...selectedMedicines];
        newSelectedMedicines.splice(index, 1);
        setSelectedMedicines(newSelectedMedicines);

        toast.success("Xóa thuốc thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500
        });
    }

    useEffect(() => {
        if (selectedMedicines.length == 0) {
            setMedicineStatus(false);
        } else {
            setMedicineStatus(true);
        }
    }, [selectedMedicines])

    return (
        <>
            <div className='container-fluid d-flex'>
                {
                    loading ? (<span class="loader"></span>) :
                        (leftEye && rightEye) ?
                            <div className='d-flex row' style={{ width: '120%', paddingTop: 14 }}>
                                <div className='col-9'>
                                    <h3>Bệnh án điện tử</h3>
                                    <div style={{ width: '80%', marginLeft: 80, marginTop: 20 }}>
                                        <StepProgressBar progressBarPercent={progressBarPercent} diagnoseInputs={diagnoseInputs} diseases={diseases} selectedMedicines={selectedMedicines} />
                                    </div>
                                    <form className="needs-validation">
                                        <div className='d-flex row mt-5'>
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
                                        <div className='d-flex row mt-2'>
                                            <div className="col-6">
                                                <label htmlFor="basic-url" className="form-label">Chẩn đoán bệnh :</label>
                                                <div className="input-group mb-3">
                                                    <input type="text" className={`form-control ${errorsPrescription?.diagnose?.message ? 'is-invalid' : ''}`}
                                                        {...registerPrescription('diagnose')}
                                                        id="basic-url" aria-describedby="basic-addon3" placeholder='...' name="diagnose" onChange={handleChangePrescription}
                                                        style={{ borderRadius: "0.5rem" }} />
                                                    <span className="invalid-feedback">{errorsPrescription?.diagnose?.message}</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="basic-url" className="form-label">Dịch vụ :</label>
                                                <div className="input-group mb-3">
                                                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={booking?.eyeCategory?.nameCategory} readOnly />
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
                                        <div className='d-flex row mt-4 mb-2'>
                                            <div className="col-12">
                                                <label htmlFor="basic-url" className="form-label">Ghi chú :</label>
                                                <div className="input-group mb-0">
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
                                                        <th scope="col">Ghi chú</th>
                                                        <th scope="col">Xóa thuốc</th>
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
                                                        <td>{selectedMedicine.noteMedicine}</td>
                                                        <td><i className="fa-solid fa-trash icon" onClick={() => handleDeleteMedicine(selectedMedicine.id)}></i></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button type="button" className="btn btn-secondary p-2 mb-2" onClick={handleShowInputSearchMedicine} style={{ borderRadius: "0.5rem" }}>
                                            Chọn thuốc
                                        </button>
                                        <div>
                                            {
                                                showInputSearchMedicine &&
                                                <ReactSearchAutocomplete
                                                    items={medicines}
                                                    onSearch={handleOnSearch}
                                                    onSelect={handleOnSelect}
                                                    autoFocus
                                                    fuseOptions={{ keys: ["nameMedicine", "type"] }}
                                                    resultStringKeyName="nameMedicine"
                                                    placeholder='Mời nhập tên thuốc...'
                                                    className='mt-2'
                                                    styling={{zIndex:"100"}}
                                                />
                                            }
                                            {
                                                Object.keys(searchString).length > 0 &&
                                                <div key={searchString.id} className='d-flex mt-3 gap-2'>
                                                    <input className='form-control col-3' defaultValue={searchString.nameMedicine} readOnly />
                                                    <input
                                                        type="text"
                                                        placeholder="Số lượng"
                                                        className='form-control col-2'
                                                        defaultValue={quantityInput[searchString.id] || ''}
                                                        onChange={(e) => handleChangeQuantity(searchString.id, e)}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="HDSD thuốc..."
                                                        className='form-control'
                                                        defaultValue={usingMedicine[searchString.id] || ''}
                                                        onChange={(e) => handleChangeUsingMedicine(searchString.id, e)}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Ghi chú..."
                                                        className='form-control'
                                                        defaultValue={noteMedicine[searchString.id] || ''}
                                                        onChange={(e) => handleChangeNoteMedicine(searchString.id, e)}
                                                    />
                                                    <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => handleAddMedicines(searchString)}>
                                                        <button className="btn btn-success d-flex align-items-center justify-content-center" style={{ borderRadius: '50%', width: "32px", height: "32px" }}>
                                                            <i className="ti ti-plus text-center" style={{ fontSize: "16px" }}></i>
                                                        </button>
                                                        <p className="mb-0 fw-normal link-success" style={{ marginLeft: "10px" }}>Thêm</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className='d-flex row mt-4 text-end'>
                                            <div>
                                                <button type="button" className="btn btn-primary" onClick={handleSubmitPrescription(handleAddPrescription)}>Lưu bệnh án</button>
                                                <button type="button" className="btn btn-danger ml-2" onClick={() => resetPrescription()}>Hủy thao tác</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-3'>
                                    <h3>Thông tin bệnh nhân</h3>
                                    <div className='text-center'>
                                        <img src='../../images/user-icon.png' style={{ width: 150, borderRadius: '50%' }} />
                                        <p style={{ fontWeight: 'bold' }} readOnly>{booking?.customer?.user?.fullName}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="basic-url" className="form-label">Năm sinh:</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={booking?.customer?.age} />
                                        </div>
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
                            : <div><p style={{ color: 'red' }}>Bệnh nhân này chưa được đo mắt hoặc không tồn tại!</p></div>
                }
            </div>
        </>
    )
}
