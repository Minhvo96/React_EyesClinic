import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalExamDetail from "./ModalExamDetail";


const ModalMedicine = ({ showModal, closeModal }) => {


    return (
        <>
            <Modal show={showModal} onHide={closeModal} size='xl' centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-4">Thông tin thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="mb-3 col-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Số đăng kí
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                            <div className="mb-3 col-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Tên thuốc
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Ngày sản xuất
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                            <div className="mb-3 col-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Hạn sử dụng
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                            <div className="mb-3 col-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Công dụng
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Đơn vị
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />

                                            </div>
                                            <div className="mb-3 col-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Giá tiền
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />
                                            </div>
                                            <div className="mb-3 col-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Tồn kho
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                />
                                            </div>
                                            <div className="mb-3 col-3 d-flex align-items-center justify-content-center">
                                                <div className="d-flex align-items-center mt-4" style={{ cursor: "pointer" }} onClick={() => openModalMedicine()}>
                                                    <button className="btn btn-secondary d-flex align-items-center justify-content-center" style={{ borderRadius: '50%', width: "32px", height: "32px" }}>
                                                        <i className="ti ti-plus text-center" style={{ fontSize: "16px" }}></i>
                                                    </button>
                                                    <p className="mb-0 fw-normal link-secondary" style={{ marginLeft: "10px" }}>Nhập thuốc</p>
                                                </div>
                                            </div>
                                        </div>



                                    </form>
                                </div>

                            </div>
                            <Modal.Title className="mb-4">Lịch sử xuất nhập</Modal.Title>
                            <div className="card">
                                <div className="card-body">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-end">
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button onClick={closeModal} className="me-4 btn btn-danger">Close</button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalMedicine;