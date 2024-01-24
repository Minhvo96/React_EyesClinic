import { useEffect, useState } from "react";
import staffService from "../../services/staffService";
import Swal from "sweetalert2";
import ModalStaff from "./modal/ModalStaff";

export default function Staff() {

    const [showModalStaff, setShowModalStaff] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);

    const openModalStaff = () => {
        setShowModalStaff(true)
    }

    const closeModalStaff = () => {
        setShowModalStaff(false);
    }

    const getAllStaffs = async () => {
        const data = await staffService.getAllStaffs();
        const users = data.filter(user => user.role !== "ROLE_ADMIN")
        users.forEach(item => {
            if (item.role == 'ROLE_DOCTOR') {
                item.role = 'Bác sĩ';
            }
            if (item.role == 'ROLE_RECEPTIONIST') {
                item.role = 'Lễ tân';
            }
            if (item.role == 'ROLE_ASSISTANT') {
                item.role = 'Phụ tá';
            }
            if (item.role == 'ROLE_CASHIER') {
                item.role = 'Thu ngân';
            }
            if (item.degree == 'UNIVERSITY') {
                item.degree = 'Đại học';
            }
            if (item.degree == 'COLLEGE') {
                item.degree = 'Cao đẳng';
            }
            if (item.degree == 'INTERMEDIATE') {
                item.degree = 'Trung cấp';
            }
        })
        setStaffs(users);
        setLoading(false);
    }

    useEffect(() => {
        getAllStaffs();
    }, [])

    useEffect(() => {
        getAllStaffs();
    }, [showModalStaff])

    const handleDeleteStaff = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa nhân viên này?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Không'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const staff = await staffService.getStaffById(id);
                const newStaff = {
                    ...staff,
                    "status": "LAYOFF"
                }
                await staffService.editStaff(newStaff, id);
                Swal.fire('Xóa thành công!', '', 'success');
                setStaffs((staff) => staff.filter((staff) => staff.id !== id));
            }
        })
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
                {loading ? (<span className="loader"></span>) : <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
                    <div className="card w-100">
                        <div className="d-flex ps-4 pt-4">
                            <span className="h5 fw-semibold">{staffs.length}</span>
                            <p className="ms-1 fw-normal">nhân viên</p>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4 text-center">
                                        <tr>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">STT</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Ảnh</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Họ và tên</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Số điện thoại</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Chức vụ</h6>
                                            </th>
                                            <th className="border-bottom-0 text-center">
                                                <h6 className="fw-semibold mb-0">Bằng cấp</h6>
                                            </th>
                                            <th className="border-bottom-0 text-center">
                                                <h6 className="fw-semibold mb-0">Xóa</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            staffs.length > 0 && staffs.map(staff => {
                                                return (
                                                    <tr key={staff.id}>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{staff.id}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <img src={staff.avatar} alt="" style={{ width: 50 }} />
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">{staff?.fullName}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{staff?.phoneNumber}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{staff?.role}</p>
                                                        </td>
                                                        <td className="border-bottom-0 text-center">
                                                            <p className="mb-0 fw-normal">{staff?.degree}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <button className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                                                                    style={{ width: "36px", height: "36px" }}
                                                                    onClick={() => handleDeleteStaff(staff.id)}>
                                                                    <i className="ti ti-trash" style={{ fontSize: "18px" }}></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
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
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
            <ModalStaff showModal={showModalStaff} closeModal={closeModalStaff} />
        </>
    )
}