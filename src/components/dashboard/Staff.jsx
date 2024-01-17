import { useState } from "react";
import addStyleDashboard from "../../AddStyleDashboard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ModalMedicine from "./modal/ModalMedicine";

export default function Staff() {

    const [showModalStaff, setShowModalStaff] = useState(false);

    const openModalStaff = () => {
        setShowModalStaff(true)
    }

    const closeModalStaff = () => {
        setShowModalStaff(false)
    }

    return (
        <>
            <div className="container-fluid">
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title fw-semibold mb-4">Danh sách nhân viên</h5>
                        <div className="d-flex align-items-center mb-4" style={{ cursor: "pointer" }} onClick={() => openModalStaff()}>
                            <button className="btn btn-primary d-flex align-items-center justify-content-center" style={{ borderRadius: '50%', width: "32px", height: "32px" }}>
                                <i className="ti ti-plus text-center" style={{ fontSize: "16px" }}></i>
                            </button>
                            <p className="mb-0 fw-normal link-primary" style={{ marginLeft: "10px" }}>Thêm nhân viên</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
                    <div className="card w-100">
                        <div className="d-flex ps-4 pt-4">
                            <span className="h5 fw-semibold">153</span>
                            <p className="ms-1 fw-normal">nhân viên</p>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Mã nhân viên</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Họ và tên</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Ngày bắt đầu</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Chức vụ</h6>
                                            </th>
                                            <th className="border-bottom-0 text-center">
                                                <h6 className="fw-semibold mb-0">Công dụng</h6>
                                            </th>
                                            <th className="border-bottom-0 text-center">
                                                <h6 className="fw-semibold mb-0">Trạng thái</h6>
                                            </th>
                                            <th className="border-bottom-0 text-center">
                                                <h6 className="fw-semibold mb-0">Chỉnh sửa</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">VN-23450-20</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Paracetamol</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">08/12/2023</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">08/12/2024</p>
                                            </td>
                                            <td className="border-bottom-0 text-center">
                                                <p className="mb-0 fw-normal">Giảm đau</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2 justify-content-center">
                                                    <span className="badge bg-success rounded-3 fw-semibold">
                                                        Tồn kho
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <button className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                                                        style={{ width: "36px", height: "36px" }}
                                                        onClick={() => openModalStaff()}>
                                                        <i className="ti ti-list-details" style={{ fontSize: "18px" }}></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">VN-23450-20</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Paracetamol</h6>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">08/12/2023</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">08/12/2024</p>
                                            </td>
                                            <td className="border-bottom-0 text-center">
                                                <p className="mb-0 fw-normal">Giảm đau</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2 justify-content-center">
                                                    <span className="badge bg-danger rounded-3 fw-semibold">
                                                        Hết thuốc
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <button className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                                                        style={{ width: "36px", height: "36px" }}
                                                        onClick={() => openModalStaff()}>
                                                        <i className="ti ti-list-details" style={{ fontSize: "18px" }}></i>
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
            </div>
            <ModalMedicine showModal={showModalStaff} closeModal={closeModalStaff} />
        </>
    )
}