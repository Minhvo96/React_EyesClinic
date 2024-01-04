import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalExamDetail from "./ModalExamDetail";


const ModalHistoryExam = ({ showModal, closeModal }) => {

    const [showModalDetail, setShowModalDetail] = useState(false);

    const openModalDetail = () => {
        setShowModalDetail(true);
    }

    const handleCloseModalDetail = () => {
        setShowModalDetail(false);
    }


    return (
        <>
        <Modal show={showModal} onHide={closeModal} size='xl' centered>
            <Modal.Header closeButton>
                <Modal.Title className="ms-4">Chi tiết bệnh án</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="card-title fw-semibold mb-4">Thông tin bệnh nhân</h5>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Họ và tên:</p>
                                                    <p className="card-text col-6">Văn Hiếu</p>
                                                </div>
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Số điện thoại:</p>
                                                    <p className="card-text col-6">0898212548</p>
                                                </div>
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Địa chỉ:</p>
                                                    <p className="card-text col-6">30 NGuyễn Tri pHương</p>
                                                </div>
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Tuổi:</p>
                                                    <p className="card-text col-6">20</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="card-title fw-semibold mb-4">
                                            Hồ sơ khám bệnh
                                        </h5>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Ngày đăng kí:</p>
                                                    <p className="card-text col-6">03/01/2024</p>
                                                </div>
                                                <div className="row d-flex align-items-center justify-content-between">
                                                    <div className="row mt-4 col-4">
                                                        <div className="">
                                                            <h5 className="card-title">10</h5>
                                                            <p className="card-text">lượt hẹn</p>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-4 col-4">
                                                        <div className="">
                                                            <h5 className="card-title">8</h5>
                                                            <p className="card-text">lần khám</p>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-4 col-4">
                                                        <div className="">
                                                            <h5 className="card-title">2</h5>
                                                            <p className="card-text">lượt hủy</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Ngày giờ khám</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Dịch vụ</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Bác sĩ</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Trạng thái</h6>
                                                </th>
                                                <th className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-0"></h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">03/01/2024</h6>
                                                    <span className="fw-normal">10:00</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Khám mắt tổng quát</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">Elite Admin</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-success rounded-3 fw-semibold">
                                                            Đã khám
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <button className="btn btn-outline-info d-flex align-items-center justify-content-center"
                                                            style={{ width: "36px", height: "36px" }}
                                                            onClick={() => openModalDetail()}>
                                                            <i className="ti ti-details" style={{ fontSize: "18px" }}></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">03/01/2024</h6>
                                                    <span className="fw-normal">10:00</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Khám mắt tổng quát</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">Elite Admin</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-danger rounded-3 fw-semibold">
                                                            Đã hủy
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                            
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} className="me-4">Close</Button>
            </Modal.Footer>
            <ModalExamDetail showModal={showModalDetail} closeModal={handleCloseModalDetail}/>

        </Modal>
        </>
        
    )
}

export default ModalHistoryExam;