import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import medicinePrescriptionService from "../../../services/medicinePrescriptionService";



const ModalExamDetail = ({ showModal, closeModal, booking }) => {
    const [prescriptionDetail, setPrescriptionDetail] = useState({})

    const getPrescriptionByIdBooking = async (id) => {
        const idPrescription = await medicinePrescriptionService.getPrescriptionByIdBooking(id);
        const prescriptionDetail = await medicinePrescriptionService.getShowDetailPrescription(idPrescription);

        setPrescriptionDetail(prescriptionDetail);
        console.log(prescriptionDetail);
    }

    useEffect(() => {
        if (Object.keys(booking).length) {
            getPrescriptionByIdBooking(booking.id);
        }
    }, [booking]);


    return (
        <Modal show={showModal} onHide={closeModal} size='xl' centered className="bg-dark bg-opacity-50">
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
                                                        <h6 className="fw-semibold mb-1">{booking.dateBooking}
                                                        </h6>
                                                        <span className="fw-normal">{booking.timeBooking}</span>
                                                    </div>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Dịch vụ:</p>
                                                    <p className="card-text col-6">{booking?.eyeCategory?.nameCategory}</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Bác sĩ:</p>
                                                    <p className="card-text col-6">{booking?.customer?.user?.fullName}</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-start">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Chẩn đoán:</p>
                                                    <p className="card-text col-6">{prescriptionDetail?.diagnose}</p>
                                                </div>
                                                <div className="row d-flex mb-2 align-items-start">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Ghi chú:</p>
                                                    <p className="card-text col-6">{prescriptionDetail?.diagnose}</p>
                                                </div>
                                                <div className="row d-flex align-items-center">
                                                    <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Trạng thái:</p>
                                                    <div className="d-flex align-items-center gap-2 col-6">
                                                        <span className="badge bg-success rounded-3 fw-semibold">
                                                            {booking?.status}
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
                                                    <p className="card-subtitle fw-bolder text-muted">{`${prescriptionDetail?.eyeSight?.split(", ")[0]}/10`}</p>
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center mt-4 mb-4">
                                                <div className="col-6 text-center">
                                                    <i className="ti ti-eye" style={{ fontSize: "56px" }}></i>
                                                    <p className="card-subtitle fw-bolder text-muted">Mắt phải</p>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <p className="card-subtitle fw-bolder text-muted">{`${prescriptionDetail?.eyeSight?.split(", ")[1]}/10`}</p>
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
                                            <tr >
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
                                            
                                            {prescriptionDetail?.medicines && prescriptionDetail.medicines.length > 0 ? (
                                                (prescriptionDetail.medicines).map((medicine, index) => (
                                                    <tr key={index + 1}>

                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{medicine?.nameMedicine}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{medicine?.type}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{medicine?.quantity}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{medicine?.priceMedicine}</h6>
                                                        </td>
                                                        <td class="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{medicine?.quantity * medicine?.priceMedicine } đ</h6>
                                                        </td>
                                                        <td className="border-bottom-0 text-center">
                                                            <h6 className="mb-0 fw-semibold">{medicine?.useMedicine +", " + medicine?.noteMedicine}</h6>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : null}

                                            <tr>
                                                <td colSpan={3} className="border-bottom-0"></td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Tổng tiền:</h6>
                                                </td>
                                                <td className="border-bottom-0 text-center">
                                                    <h6 className="fw-semibold mb-1">{prescriptionDetail?.totalAmount} đ</h6>
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