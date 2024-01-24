import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import medicinePrescriptionService from '../../services/medicinePrescriptionService';
import billService from '../../services/billService';

import addStyleDashboard from '../../AddStyleDashboard';
import './waiting.css'
import { useAuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';

export default function WaitingPay() {

  const auth = useAuthContext();

  const [prescriptions, setPrescriptions] = useState([]);
  const [bookingIds, setBookingIds] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState({
    id: '',
    fullName: '',
    eyeCategoryId: '',
    phoneNumber: '',
    dateBooking: '',
    timeBooking: '',
    idsMedicine: '',
  });

  const [bill, setBill] = useState({
    idPrescription: '',
    idReceptionist: '',
    idBooking: '',
    totalPrice: ''
  });

  const getAllPrescriptionList = async () => {
    try {
      const response = await medicinePrescriptionService.getMdicinePrescription();
      const prescriptions = response.content;
      setPrescriptions(prescriptions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showPrescriptionDetails = async (item) => {
    try {
      setSelectedBooking(item)
      const prescriptionId = await medicinePrescriptionService.getPrescriptionByIdBooking(item.id);
      const prescriptionDetail = await medicinePrescriptionService.getShowDetailPrescription(prescriptionId)
      setSelectedPrescription(prescriptionDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedPrescription);
  }, [selectedPrescription])

  const saveBill = async (item) => {
    const newBill = {
      idPrescription: item.id,
      idReceptionist: item.doctor.id,
      idBooking: item.idBooking,
      totalPrice: item.totalAmount,
    };
    try {
      const response = await billService.createBill(newBill);
      console.log('Bill saved successfully:', response);
      toast.success("Đã thanh toán hóa đơn!", {
        position: toast.POSITION.TOP_RIGHT
      });
      const updatedBookings = bookingIds.map((billBooking) => {
        if (billBooking.id === item.idBooking) {
          return {
            ...billBooking,
            status: 'UNPAID',
          };
        }
        return billBooking;
      });

      setBill(newBill);
      await getAllPrescriptionList();
      $(`#modal-${item.idBooking}`).modal('hide');
      $('.modal-backdrop').css("display", "none");
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  useEffect(() => {
    getAllPrescriptionList();
  }, []);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const unpaidBookingIds = await Promise.all(
          prescriptions.map(async (prescription) => {
            if (prescription.idBooking) {
              const bookingId = prescription.idBooking;
              const booking = await bookingService.getBookingById(bookingId);
              return booking;
            }
            return null;
          })
        );
        const filteredBookingIds = unpaidBookingIds.filter((booking) => {
          return booking !== null && booking.status === 'UNPAID';
        });
        setBookingIds(filteredBookingIds);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, [prescriptions]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    // Lấy thông tin ngày, tháng và năm
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0, nên cộng thêm 1
    const year = dateObj.getFullYear();
    const formattedDate = `${day} tháng ${String(month).padStart(2, '0')} năm ${year}`;
    return formattedDate;
  }

  return (
    <>
      <div className='container-fluid'>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title fw-semibold mb-4">Danh sách chờ thanh toán</h5>
          </div>
        </div>
        {loading ? (<span className='loader'></span>) : <div className="card w-100">
          <div className="d-flex ps-4 pt-4">
            <span className="h5 fw-semibold">{prescriptions.length}</span>
            <p className="ms-1 fw-normal">hóa đơn</p>
          </div>
          <div className="card-body p-4">
            {bookingIds.length ? (
              <table className="table text-nowrap mb-0 align-middle">
                <thead className="text-dark fs-3">
                  <tr className='text-center'>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Ngày khám</th>
                    <th>Chi tiết hóa đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingIds.map((item, index) => {
                    const count = index + 1;
                    return (
                      <tr key={item.id} className='text-center'>
                        <td>{count}</td>
                        <td>{item.customer.user.fullName}</td>
                        <td>{item.customer.user.phoneNumber}</td>
                        <td>{item.dateBooking}</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-outline-info d-flex align-items-center justify-content-center"
                              style={{ width: "36px", height: "36px" }}
                              type="button" data-toggle="modal" data-target={`#modal-${item.id}`} onClick={() => showPrescriptionDetails(item)}>
                              <i className="ti ti-wallet" style={{ fontSize: "18px" }}></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className='m-4'>
                <div className='d-flex align-items-center justify-content-center gap-4' style={{ flexDirection: "column" }}>
                  <div>
                    <i class="fa-regular fa-calendar-xmark text-danger" style={{ fontSize: "124px" }}></i>
                  </div>
                  <span className='fw-semibold' style={{ fontSize: "32px" }}>Danh sách hôm nay đang trống!</span>
                </div>
              </div>
            )}

            {bookingIds.map((item, index) => (
              <div className="modal-frame" key={item.id}>
                <div className="modal fade" id={`modal-${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl modal-dialog-centered">

                    {/* Modal content here */}

                    <div class="modal-content">
                      <div className='container-fluid'>
                        <div class="d-flex align-items-center row">
                          <div class="col-3 d-flex align-items-center justify-content-start">
                            <div class="logo-container mt-4" style={{ marginLeft: '20px', marginTop: '200px' }}>
                              <img src="../../images/logo2.png" alt="" class="logo" style={{ width: "240px" }} />
                            </div>
                          </div>
                          <div className="col-6 flex justify-between">
                            <div className="flex flex-col justify-center items-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginTop: '20px', marginRight: "20px" }}>
                              <h1 className="" style={{ fontSize: '36px' }}>Phòng khám mắt Văn Minh</h1>
                              <h1 className="" style={{ fontSize: '20px' }}>28 Lê Lợi - TP.Huế</h1>
                              <h1 className="" style={{ fontSize: '20px' }}>ĐT: 0836.092.222</h1>
                              <h1 className="" style={{ fontSize: '24px', fontWeight: "bolder" }}>Mã BN: {selectedBooking?.customer?.user?.phoneNumber}</h1>
                            </div>
                          </div>
                          <div className='col-3' style={{ marginTop: '50px' }}>
                            {/* <div className='d-flex align-items-center justify-content-around row mb-2'>
                              <div className='col-5 d-flex align-items-center justify-content-center'>
                                <h5>T2-T6:</h5>
                              </div>
                              <div className='d-flex align-items-center justify-content-end col-7 gap-2' style={{ flexDirection: "column" }}>
                                <div className='d-flex align-items-center justify-content-center mb-0'>
                                  <p className='mb-0'>11h30-13h00</p>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                  <p className='mb-0'>17h00-18h30</p>
                                </div>
                              </div>
                            </div> */}
                            <div className='d-flex align-items-center justify-content-around row mb-4'>
                              <div className='col-5 d-flex align-items-center justify-content-center'>
                                <h5>T2 - CN:</h5>
                              </div>
                              <div className='d-flex align-items-center justify-content-end col-7 gap-2' style={{ flexDirection: "column" }}>
                                <div className='d-flex align-items-center justify-content-center mb-0'>
                                  <p className='mb-0'>08:00-12:00</p>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                  <p className='mb-0'>14:00-18:00</p>
                                </div>
                              </div>
                            </div>
                            {/* <div className='d-flex align-items-center justify-content-around row'>
                              <div className='col-5 d-flex align-items-center justify-content-center'>
                                <h5 className='mb-0'>CN & Lễ:</h5>
                              </div>
                              <div className='d-flex align-items-center justify-content-center col-7'>
                                <p className='mb-0'>08h30-11h30</p>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div class="modal-body">
                          <div className='d-flex justify-content-center'>
                            <h2 className='fw-bolder' style={{ fontSize: "44px" }}>
                              ĐƠN THUỐC
                            </h2>
                          </div>
                          <div className='row'>
                            <div className='col-9 mt-8 row'>
                              <strong className='col-4'>Họ và tên: </strong>
                              <span className='col-8 d-flex justify-content-start '>
                                {selectedBooking?.customer?.user?.fullName}
                              </span>
                            </div>
                            <div className='col-3 mt-8 d-flex justify-content-end row'>
                              <strong className='col-6'>Năm sinh:</strong>
                              <span className='d-flex justify-content-center col-6'>
                                {selectedBooking?.customer?.age}
                              </span>
                            </div>
                          </div>
                          <div class="mt-8 d-flex align-items-center row">
                            <strong className='col-2'>Chẩn đoán:</strong>
                            <span className='d-flex justify-content-center col-10'>
                              {selectedPrescription?.diagnose}
                            </span>
                          </div>

                          <div class="mt-8 row d-flex">
                            <strong className='col-2'>Bệnh phụ: </strong>
                            <span className='d-flex justify-content-center align-items-center col-10'>
                              {selectedPrescription?.note.split(",")[1] ? selectedPrescription?.note.split(",")[1] : ""}
                              {selectedPrescription?.note.split(",")[2] ? ", " + selectedPrescription?.note.split(",")[2] + ", " : ""}
                              {selectedPrescription?.note.split(",")[3] ? selectedPrescription?.note.split(",")[3] : ""}
                            </span>
                          </div>

                          <div class="mt-8 row d-flex" style={{ marginBottom: "30px" }}>
                            <strong className='col-2'>Ghi chú: </strong>
                            <span className='d-flex justify-content-center align-items-center col-10'>
                              {selectedPrescription?.note.split(",")[0] || ""}
                            </span>
                          </div>



                          <div class="mt-8" style={{ marginBottom: "30px" }}>
                            <table class="border-collapse" style={{ width: "100%" }}>
                              <thead>
                                <tr>
                                  <th class="border p-2 text-center"></th>
                                  <th class="border p-2 text-center">Thị lực</th>
                                  <th class="border p-2 text-center">Mắt phải</th>
                                  <th class="border p-2 text-center">Mắt trái</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="border p-2 text-center">MP</td>
                                  <td class="border p-2 text-center">{selectedPrescription?.eyeSight
                                    ? selectedPrescription.eyeSight[0] + "/10"
                                    : null}</td>
                                  <td rowSpan={3} className='border p-2 text-center'>
                                    <i class="fa-solid fa-eye" style={{ fontSize: "60px" }}></i>
                                  </td>
                                  <td rowSpan={3} className='border p-2 text-center'>
                                    <i class="fa-solid fa-eye" style={{ fontSize: "60px" }}></i>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="border p-2 text-center">MT</td>
                                  <td class="border p-2 text-center">{selectedPrescription?.eyeSight
                                    ? selectedPrescription.eyeSight[3] + "/10"
                                    : null}</td>

                                </tr>
                                <tr>
                                  <td class="border p-2 text-center">Khác</td>
                                  <td class="border p-2 text-center"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="mt-8">
                            <table class=" mt-8 border-collapse" style={{ width: "100%" }}>

                              <thead>
                                <tr>
                                  <th class="border p-2 text-center"></th>
                                  <th colSpan={4} class="border p-2 text-center">Dịch vụ</th>
                                  <th class="border p-2 text-center">Giá dịch vụ</th>
                                </tr>
                                <tr>
                                  <th class="border p-2 text-center"></th>
                                  {selectedBooking?.eyeCategory ? (
                                    <>
                                      <td colSpan={4} className="border p-2 text-center">{selectedBooking?.eyeCategory?.nameCategory}</td>
                                      <td className="border p-2 text-center">{selectedBooking?.eyeCategory?.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        minimumFractionDigits: 0,
                                      })}</td>
                                    </>
                                  ) : null}
                                </tr>
                                <tr>

                                  <th class="border p-2 text-center">STT</th>
                                  <th class="border p-2 text-center">Tên thuốc</th>
                                  <th class="border p-2 text-center">Đơn vị</th>
                                  <th class="border p-2 text-center">Số lượng</th>
                                  <th class="border p-2 text-center">Đơn giá</th>
                                  <th class="border p-2 text-center">Thành tiền</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedPrescription?.medicines && selectedPrescription.medicines.length > 0 ? (
                                  selectedPrescription.medicines.map((medicine, index) => (
                                    <>
                                      <tr key={index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 2 : 1)}>
                                        <td class="border p-2 text-center">{index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 1 : 0)}</td>
                                        <td class="border p-2 text-center">
                                          <div className='d-flex justify-content-center align-items-center'>
                                            <div>{medicine?.nameMedicine}</div>
                                            <div style={{ fontSize: "13px" }}><em>&nbsp;( {medicine?.useMedicine} - {medicine?.noteMedicine} )</em></div>
                                          </div>
                                        </td>
                                        <td class="border p-2 text-center">{medicine?.type === "PELLET" ? "Viên" : "Chai"}</td>
                                        <td class="border p-2 text-center">{medicine?.quantity}</td>
                                        <td class="border p-2 text-center">{medicine?.priceMedicine.toLocaleString("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                          minimumFractionDigits: 0,
                                        })}</td>
                                        <td class="border p-2 text-center">{(medicine?.priceMedicine * medicine?.quantity).toLocaleString("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                          minimumFractionDigits: 0,
                                        })}</td>
                                      </tr>
                                    </>


                                  ))
                                ) : null}
                                <tr>
                                  <td class="border p-2 text-center"></td>
                                  <th colSpan={4} class="border p-2 text-center">Tổng tiền:</th>
                                  <td class="border p-2 text-danger text-center fw-bolder">{selectedPrescription?.totalAmount.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                    minimumFractionDigits: 0,
                                  })}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="mt-4">
                            <strong>Ngày khám: <span className='fw-normal'> {formatDate(selectedBooking?.dateBooking)}</span></strong>
                          </div>
                          <div className='row mt-2 d-flex align-items-center'>
                            <div className='col-6'>
                              <div className='d-flex align-items-center justify-content-end' style={{ flexDirection: "column" }}>
                                <strong>Người thu tiền</strong>
                                <p className='mt-5'>{auth?.user?.fullName}</p>
                              </div>
                            </div>
                            <div className='col-6'>
                              <div className='d-flex align-items-center justify-content-end' style={{ flexDirection: "column" }}>
                                <strong>Bác sĩ khám bệnh</strong>
                                <p className='mt-5'>ThS BS {selectedPrescription?.doctor?.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button id="close-save" class="btn btn-primary mr-2" type="button" onClick={() => saveBill(selectedPrescription)}>Xác nhận</button>
                          <button id="close-button" type="button" class="btn btn-danger mr-2" data-dismiss="modal">Đóng</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}

      </div>


    </>
  );
}
