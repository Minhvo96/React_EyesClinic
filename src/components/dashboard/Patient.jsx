import { useEffect, useMemo, useState } from "react";
import ModalHistoryExam from "./modal/ModalHistoryExam";
import medicinePrescriptionService from "../../services/medicinePrescriptionService";
import customerService from "../../services/customerService";
import bookingService from "../../services/bookingServices";
import Pagination from "../pagination/pagination";

export default function Patient({ patientList }) {

    const [showModal, setShowModal] = useState(false);

    const [customerIds, setCustomerIds] = useState([]);
    const [idCustomer, setIdCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    let PageSize = 5;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return customerIds.sort((a, b) => {
            return a.fullName.localeCompare(b.fullName);
        }).slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customerIds]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const getAllCustomers = async () => {
        const response = await customerService.getAllCustomers()
        setCustomerIds(response);
        setLoading(false);
    }

    useEffect(() => {
        getAllCustomers();
    }, [])

    useEffect(() => {
        setCustomerIds(patientList)
    }, [patientList])

    const openModal = (id) => {
        setIdCustomer(id)
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setIdCustomer(null);
    }

    useEffect(() => {
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
                {loading ? (<span className="loader"></span>) :
                    <>
                        <div className="col-lg-12 d-flex align-items-around" style={{ padding: 0 }}>
                            <div className="card w-100">
                                <div className="d-flex ps-4 pt-4">
                                    <span className="h5 fw-semibold">{customerIds.length}</span>
                                    <p className="ms-1 fw-normal">bệnh nhân</p>
                                </div>
                                <div className="card-body p-4">
                                    <div className="table-responsive">
                                        {customerIds.length ? (
                                            <table className="table text-nowrap mb-0 align-middle">
                                                <thead className="text-dark fs-4">
                                                    <tr className="text-center">
                                                        <th className="border-bottom-0">

                                                            <h6 className="fw-semibold mb-0">STT</h6>
                                                        </th>
                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">Họ và tên</h6>
                                                        </th>
                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">SĐT</h6>

                                                        </th>
                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">Năm sinh</h6>
                                                        </th>
                                                        <th className="border-bottom-0 text-center">
                                                            <h6 className="fw-semibold mb-0">Chi tiết</h6>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentTableData.map((item, index) => {

                                                        const count = index + 1;
                                                        return (
                                                            <tr key={item.id} className="text-center">
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
                                                                    <div className="d-flex align-items-center justify-content-center gap-2">
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
                        <div className="pagination-container" style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={customerIds.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </>}
            </div>
            <ModalHistoryExam showModal={showModal} closeModal={handleCloseModal} idCustomer={idCustomer} />
        </>
    )

}