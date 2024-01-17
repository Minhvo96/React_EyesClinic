import { useState } from "react";
import ModalHistoryExam from "./modal/ModalHistoryExam";
import { ClipLoader } from "react-spinners";

export default function Patient() {

    const[showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    
    
    return (
        <>
                        <div>
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="card-title fw-semibold mb-4">Danh sách bệnh nhân</h5>
                            </div>
                        </div>
                        <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
                            <div className="card w-100">
                                <div className="d-flex ps-4 pt-4">
                                    <span className="h5 fw-semibold">10</span>
                                    <p className="ms-1 fw-normal">patients total</p>
                                </div>
                                <div className="card-body p-4">
                                    <div className="table-responsive">
                                        <table className="table text-nowrap mb-0 align-middle">
                                            <thead className="text-dark fs-4">
                                                <tr>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Patient</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Patient ID</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Address</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Age</h6>
                                                    </th>
                                                    <th className="border-bottom-0 text-center">
                                                        <h6 className="fw-semibold mb-0">Actions</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                                        <span className="fw-normal">Web Designer</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">1</h6>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">Elite Admin</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge bg-primary rounded-3 fw-semibold">
                                                                36
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <button className="btn btn-outline-success d-flex align-items-center justify-content-center" 
                                                                    style={{ width: "36px", height: "36px" }}
                                                                    onClick={() => openModal()}>
                                                                <i className="ti ti-report-medical" style={{ fontSize: "18px" }}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <ModalHistoryExam showModal={showModal} closeModal={handleCloseModal}/>
            
                
         
        </>
    )

}