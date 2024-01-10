import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const ModalExamDetail = ({ showModal, closeModal }) => {
    return (
        <Modal show={showModal} onHide={closeModal} size='lg' centered className="bg-dark bg-opacity-50">
            <Modal.Header closeButton>
                <Modal.Title className="ms-4">Lịch sử khám bệnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="card mb-0">
                            <div className="card-body pb-0">
                                <div className="row">

                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row d-flex">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Ngày giờ khám:</p>
                                                    <div className="col-6 mb-2">
                                                        <h6 className="fw-semibold mb-1">03/01/2024
                                                        </h6>
                                                        <span className="fw-normal">10:00</span>
                                                    </div>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Dịch vụ:</p>
                                                    <p className="card-text col-6">Khám mắt tổng quát</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Bác sĩ:</p>
                                                    <p className="card-text col-6">Trần Văn Minh</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-start">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Chẩn đoán:</p>
                                                    <p className="card-text col-6">Viêm mắt</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-start">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Ghi chú:</p>
                                                    <p className="card-text col-6">Đái tháo đường, Tim mạch</p>
                                                </div>
                                                <div className="row d-flex align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Trạng thái:</p>
                                                    <div className="d-flex align-items-center gap-2 col-6">
                                                        <span className="badge bg-success rounded-3 fw-semibold">
                                                            Đã khám
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body pt-2 pb-2 ps-0 pe-0">
                                                <h5 className="card-title text-center border-bottom border-2 border-secondary pb-2">Thị lực</h5>
                                            </div>
                                            <div className="row d-flex align-items-center mb-1 mt-2">
                                                <div className="col-6 text-center">
                                                    <i className="ti ti-eye" style={{ fontSize: "56px" }}></i>
                                                    <p className="card-subtitle fw-bolder text-muted">Mắt trái</p>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <p className="card-subtitle fw-bolder text-muted">9/10</p>
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center mt-4 mb-4">
                                                <div className="col-6 text-center">
                                                    <i className="ti ti-eye" style={{ fontSize: "56px" }}></i>
                                                    <p className="card-subtitle fw-bolder text-muted">Mắt phải</p>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <p className="card-subtitle fw-bolder text-muted">8/10</p>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="card-body pb-0 pt-0">
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Tên thuốc</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Đơn vị</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Số lượng</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Đơn giá</h6>
                                                </th>
                                                <th className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-0">Thành tiền</h6>
                                                </th>
                                                <th className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-0">Ghi chú</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Paracetamol</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Viên</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">30 viên</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">2.000đ</p>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <p className="mb-0 fw-semibold">60.000đ</p>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <p className="mb-0 fw-semibold">Sáng 1v, Túi 1v, sau khi ăn</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Paracetamol</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Viên</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">30 viên</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-semibold">2.000đ</p>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <p className="mb-0 fw-semibold">60.000đ</p>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <p className="mb-0 fw-semibold">Sáng 1v, Túi 1v, sau khi ăn</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="border-bottom-0"></td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Tổng tiền:</h6>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-1">120.000đ</h6>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-1">Người thu tiền</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5} className="border-0 border-light"></td>
                                                <td className="border-0 text-center">
                                                    <h6 className="fw-semibold mb-1">Minh Võ</h6>
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
                <Button onClick={closeModal} className="me-4 mt-0">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalExamDetail;