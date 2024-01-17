import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import medicinePrescriptionService from '../../services/medicinePrescriptionService';
import billService from '../../services/billService';

import addStyleDashboard from '../../AddStyleDashboard';
import './waiting.css'

export default function WaitingPay() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [bookingIds, setBookingIds] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

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
      idReceptionist: item.idDoctor,
      idBooking: item.idBooking,
      totalPrice: item.totalAmount,
    };
    try {
      const response = await billService.createBill(newBill);
      console.log('Bill saved successfully:', response);
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

  

  return (
    <>
      <div className="container mr-5" style={{ position: 'fixed', zIndex: '20', marginTop: '100px' }}>
        {bookingIds.length ? (
          <table className="table">

            <thead className="thead-primary">
              <tr>
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
                  <tr key={item.id}>
                    <td>{count}</td>
                    <td>{item.customer.user.fullName}</td>
                    <td>{item.customer.user.phoneNumber}</td>
                    <td>{item.dateBooking}</td>
                    <td>
                      <button className="btn btn-warning mr-2" type="button" data-toggle="modal" data-target={`#modal-${item.id}`} onClick={() => showPrescriptionDetails(item)}>View</button>
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
                        <img src="/images2.png" alt="" class="logo" />
                      </div>
                    </div>
                    <div className="col-6 flex justify-between">
                      <div className="flex flex-col justify-center items-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginTop: '20px', marginRight: "20px" }}>
                        <h1 className="" style={{ fontSize: '25px' }}>Phòng Khám Mắt Eye Clinic</h1>
                        <h1 className="" style={{ fontSize: '20px' }}>27 NTP - TP.Huế</h1>
                        <h1 className="" style={{ fontSize: '20px' }}>ĐT: 0123456789</h1>
                        <h1 className="" style={{ fontSize: '30px' }}>INVOICE</h1>
                      </div>
                    </div>
                    <div className='col-3' style={{ marginTop: '20px' }}>
                      <div className='d-flex align-items-center justify-content-around row mb-2'>
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
                      </div>
                      <div className='d-flex align-items-center justify-content-around row mb-4'>
                        <div className='col-5 d-flex align-items-center justify-content-center'>
                          <h5>Thứ 7:</h5>
                        </div>
                        <div className='d-flex align-items-center justify-content-end col-7 gap-2' style={{ flexDirection: "column" }}>
                          <div className='d-flex align-items-center justify-content-center mb-0'>
                            <p className='mb-0'>08h30-11h30</p>
                          </div>
                          <div className='d-flex align-items-center justify-content-center'>
                            <p className='mb-0'>14h30-17h30</p>
                          </div>
                        </div>
                      </div>
                      <div className='d-flex align-items-center justify-content-around row'>
                        <div className='col-5 d-flex align-items-center justify-content-center'>
                          <h5 className='mb-0'>CN & Lễ:</h5>
                        </div>
                        <div className='d-flex align-items-center justify-content-center col-7'>
                          <p className='mb-0'>08h30-11h30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="mt-8">
                      <strong>Invoice No: 000000{selectedBooking.id}</strong>
                    </div>
                    <div class="mt-8">
                      <strong>Họ và tên: {selectedBooking?.customer?.user?.fullName}</strong>
                    </div>
                    <div class="mt-8">
                      <strong>Số điện thoại: {selectedBooking?.customer?.user?.phoneNumber}</strong>
                    </div>
                    <div class="mt-8">
                      <strong>Ngày đặt lịch: {selectedBooking.dateBooking}</strong>
                    </div>
                    <div class="mt-8">
                      <strong>Giờ khám: {selectedBooking.timeBooking}</strong>
                    </div>
                    <div class="mt-8">
                      <table class=" mt-8 border-collapse" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th class="border p-2 text-center">Item</th>
                            <th class="border p-2 text-center">Description</th>
                            <th class="border p-2 text-center">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBooking?.eyeCategory && (
                            <tr>
                              <td class="border p-2">1</td>
                              <td class="border p-2">{selectedBooking.eyeCategory.nameCategory}</td>
                              <td class="border p-2">${selectedBooking.eyeCategory.price.toFixed(2)}</td>
                            </tr>
                          )}
                          {selectedBooking?.eyeCategories && selectedBooking.eyeCategories.length > 0 ? (
                            selectedBooking.eyeCategories.map((category, index) => (
                              <tr key={index + 2}>
                                <td class="border p-2">{index + 2}</td>
                                <td class="border p-2">{category.nameCategory}</td>
                                <td class="border p-2">${category.price.toFixed(2)}</td>
                              </tr>
                            ))
                          ) : null}
                          {selectedPrescription?.idsMedicine && selectedPrescription.idsMedicine.length > 0 ? (
                            selectedPrescription.idsMedicine.map((medicine, index) => (
                              <tr key={index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 2 : 1)}>
                                <td class="border p-2">{index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 2 : 1)}</td>
                                <td class="border p-2">{`${medicine.split(",")[0]} (${medicine.split(",")[1]} ${medicine.split(",")[3]}) `}</td>
                                <td class="border p-2">${parseFloat(medicine.split(",")[1]) * parseFloat(medicine.split(",")[2])}</td>
                              </tr>
                            ))
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                    <div class="mt-8">
                      <strong>Total: ${selectedPrescription?.totalAmount.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button id="close-save" class="btn btn-primary mr-2" type="button" onClick={() => saveBill(selectedPrescription)}>Save Bill</button>
                    <button id="close-button" type="button"  class="btn btn-primary mr-2" data-dismiss="modal">Đóng</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
}
