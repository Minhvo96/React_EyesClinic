import { useEffect, useState } from "react";
import ModalHistoryExam from "./modal/ModalHistoryExam";
import { ClipLoader } from "react-spinners";
import medicinePrescriptionService from "../../services/medicinePrescriptionService";
import customerService from "../../services/customerService";
import bookingService from "../../services/bookingServices";

export default function Patient() {

    const [showModal, setShowModal] = useState(false);
    const [customerIds, setCustomerIds] = useState([]);
    const [idCustomer, setIdCustomer] = useState();

    const getAllCustomerList = async () => {
        const customers = await customerService.getAllCustomers();
        setCustomerIds(customers);
    }

    useEffect(() => {
        getAllCustomerList()
    }, [])

    const openModal = (id) => {
        setIdCustomer(id)
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        console.log(idCustomer);
        if (idCustomer) {
            setShowModal(true);
        }
    }, [idCustomer])

    return (
        <>
            <div className="container-fluid">
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
                                {customerIds.length ? (

                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">

                                                    <h6 className="fw-semibold mb-0">Patient ID</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Full Name</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Phone</h6>

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
                                            {customerIds.map((item, index) => {

                                                const count = index + 1;
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">{count}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            {/* <h6 className="fw-semibold mb-1">{item?.customer?.user?.fullName}</h6> */}
                                                            <span className="fw-normal">{item?.fullName}</span>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{item?.phoneNumber}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="badge bg-primary rounded-3 fw-semibold">
                                                                    {item.age}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <button className="btn btn-outline-success d-flex align-items-center justify-content-center"
                                                                    style={{ width: "36px", height: "36px" }}
                                                                    onClick={() => openModal(item.id)}>
                                                                    <i className="ti ti-report-medical" style={{ fontSize: "18px" }}></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}


                                        </tbody>
                                    </table>
                                ) : (
                                    <div>
                                        <p>Danh sách đang trống</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalHistoryExam showModal={showModal} closeModal={handleCloseModal} idCustomer={idCustomer}  />
        </>
    )

}