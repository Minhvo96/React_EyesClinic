import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const ModalExamDetail = ({ showModal, closeModal }) => {
    return (
        <Modal show={showModal} onHide={closeModal} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className="ms-4">Lịch sử khám bệnh</Modal.Title>
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
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} className="me-4">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalExamDetail;