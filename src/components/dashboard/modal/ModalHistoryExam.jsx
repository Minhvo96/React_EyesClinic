import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalExamDetail from "./ModalExamDetail";
import customerService from "../../../services/customerService";
import { object } from "yup";
import bookingService from "../../../services/bookingServices";


const ModalHistoryExam = ({ showModal, closeModal, idCustomer }) => {

    const [showModalDetail, setShowModalDetail] = useState(false);

    const [customer, setCustomer] = useState({});

    const [completedCount, setCompletedCount] = useState(0);

    const [bookings, setBookings] = useState([]);

    const [booking, setBooking] = useState(null);

    const getCustomerById = async () => {
        const customer = await customerService.getCustomerById(idCustomer);
        setCustomer(customer);
    }

    const getBookingsByPhoneNumber = async (phoneNumber) => {
        const bookingList = await bookingService.getBookingByPhone(phoneNumber)
        const sortedBookings = bookingList.sort((a, b) => {
            const dateA = new Date(`${a.dateBooking} ${a.timeBooking}`);
            const dateB = new Date(`${b.dateBooking} ${b.timeBooking}`);
            return dateB - dateA;
        });
        setBookings(sortedBookings)
    }

    const handleCloseModalDetail = () => {
        setBooking(null)
        setShowModalDetail(false);
    }

    const openModalDetail = (booking) => {
        setShowModalDetail(true)
        setBooking(booking)
    }

    useEffect(() => {
        if (showModal) {
            getCustomerById();
        }
    }, [showModal])

    useEffect(() => {
        if (customer) {
            getBookingsByPhoneNumber(customer?.user?.phoneNumber)
        }
    }, [customer])

    useEffect(() => {
        if (bookings[0]) {
            const completedBooking = bookings.filter(booking => booking.status === "COMPLETED")
            setCompletedCount(completedBooking?.length)
        }
    }, [bookings])

    const statusColors = {
        CANCELLED: '#FA896B',
        PENDING: '#2A3547',
        WAITING: '#49BEFF',
        EXAMINING: '#5D87FF',
        UNPAID: '#FFAE1F',
        COMPLETED: '#13DEB9'
    };


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
                                                <div className="card-body" key={customer.id}>
                                                    <div>
                                                        <div className="row d-flex">
                                                            <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Họ và tên:</p>
                                                            <p className="card-text col-6">{customer?.user?.fullName}</p>
                                                        </div>
                                                        <div className="row d-flex">
                                                            <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Số điện thoại:</p>
                                                            <p className="card-text col-6">{customer?.user?.phoneNumber}</p>
                                                        </div>
                                                        <div className="row d-flex">
                                                            <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Địa chỉ:</p>
                                                            <p className="card-text col-6">{customer.user?.address}</p>
                                                        </div>
                                                        <div className="row d-flex">
                                                            <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Năm sinh:</p>
                                                            <p className="card-text col-6">{customer?.age}</p>
                                                        </div>
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
                                                        <p className="card-subtitle fw-bolder mb-2 text-muted col-6">Số lần khám:</p>
                                                    </div>
                                                    <div className="row d-flex align-items-center justify-content-between">
                                                        <div className="row mt-4 col-6">
                                                            <div className="">
                                                                <h5 className="card-title">{bookings.length}</h5>
                                                                <p className="card-text">lượt hẹn</p>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-4 col-6">
                                                            <div className="">
                                                                <h5 className="card-title">{completedCount}</h5>
                                                                <p className="card-text">Lượt khám</p>
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
                                                        <h6 className="fw-semibold mb-0">Trạng thái</h6>
                                                    </th>
                                                    <th className="border-bottom-0 text-center">
                                                        <h6 className="fw-semibold mb-0">Chi tiết</h6>
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{booking?.dateBooking}</h6>
                                                            <span className="fw-normal">{booking?.timeBooking}</span>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">{booking?.eyeCategory?.nameCategory}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="badge rounded-3 fw-semibold" style={{ backgroundColor: statusColors[booking?.status] }}>
                                                                    {booking?.status}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        {booking?.status === "COMPLETED" ? <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <button className="btn btn-outline-info d-flex align-items-center justify-content-center"
                                                                    style={{ width: "36px", height: "36px" }}
                                                                    onClick={() => openModalDetail(booking)}
                                                                >
                                                                    <i className="ti ti-list" style={{ fontSize: "18px" }}></i>
                                                                </button>
                                                            </div>
                                                        </td> : <td className="border-bottom-0">
                                                            
                                                        </td>}
                                                    </tr>
                                                ))}


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
                <ModalExamDetail showModal={showModalDetail} closeModal={handleCloseModalDetail} booking={booking}/>
            </Modal>
        </>

    )
}

export default ModalHistoryExam;