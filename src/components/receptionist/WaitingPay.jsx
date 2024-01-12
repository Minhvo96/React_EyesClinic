import React, { useEffect, useState } from 'react'
import bookingService from '../../services/bookingServices';
import medicinePrescriptionService from '../../services/medicinePrescriptionService';
import billService from '../../services/billService';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


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
    idsMedicine: ''
  });

  const [bill, setBill] = useState({
    idPrescription: '',
    idReceptionist: '',
    idBooking: '',
    totalPrice: ''
  });

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
      setBookingIds(updatedBookings);
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  useEffect(() => {
    const getAllPrescriptionList = async () => {
      try {
        const response = await medicinePrescriptionService.getMdicinePrescription();
        const prescriptions = response.content;
        setPrescriptions(prescriptions);
      } catch (error) {
        console.log(error);
      }
    };
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

  const handleDownloadInvoice = (index) => {

    const invoiceElement = document.getElementById("invoice-preview" + index);
    const downloadButton = document.getElementById("download-button");
    const closeButton = document.getElementById("close-button");
    const closeSaveBill = document.getElementById("close-save");

    downloadButton.style.display = "none";
    closeButton.style.display = "none";
    closeSaveBill.style.display = "none";
   

    html2canvas(invoiceElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');

      // downloadButton.style.display = "block";
     
    });
    
  };


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
                <th>Tổng tiền</th>
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
                      <button className="btn btn-warning mr-2" type="button" data-bs-toggle="modal" data-bs-target={`#modal-${item.id}`} onClick={() => showPrescriptionDetails(item)}>View</button>
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
            <div className="modal-dialog modal-lg modal-dialog-centered">
              {/* Modal content here */}
              <div id={"invoice-preview" + index} className="modal-content p-10">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-1 flex justify-center items-center">
                    <img src="/images2.png" alt="" className="w-32 h-32" />
                  </div>
                  <div className="col-span-3 flex justify-between">
                    <div className="flex flex-col justify-center items-center" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '110px',
                      marginTop: '20px',
                    }}>
                      <h1 className="text-xl font-bold text-center">Phòng Khám Mắt Eye Clinic</h1>
                      <h1 className="text-xl font-bold text-center">27 NTP - TP.Huế</h1>
                      <h1 className="text-xl font-bold text-center">ĐT: 0123456789</h1>
                      <h1 className="text-4xl font-bold text-center">INVOICE</h1>
                    </div>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="mt-8">
                    <strong>Invoice No: 000000{selectedBooking.id}</strong>
                  </div>
                  <div className="mt-8">
                    <strong>Họ và tên:{selectedBooking?.customer?.user?.fullName}</strong>
                  </div>
                  <div className="mt-8">
                    <strong>Số điện thoại: {selectedBooking?.customer?.user?.phoneNumber}</strong>
                  </div>
                  <div className="mt-8">
                    <strong>Ngày đặt lịch: {selectedBooking.dateBooking}</strong>
                  </div>
                  <div className="mt-8">
                    <strong>Giờ khám: {selectedBooking.timeBooking}</strong>
                  </div>
                  <table className="w-full mt-8 border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2">Item</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooking?.eyeCategory && (
                        <tr>
                          <td className="border p-2">1</td>
                          <td className="border p-2">{selectedBooking.eyeCategory.nameCategory}</td>
                          <td className="border p-2">${selectedBooking.eyeCategory.price.toFixed(2)}</td>
                        </tr>
                      )}
                      {selectedBooking?.eyeCategories && selectedBooking.eyeCategories.length > 0 ? (
                        selectedBooking.eyeCategories.map((category, index) => (
                          <tr key={index + 2}>
                            <td className="border p-2">{index + 2}</td>
                            <td className="border p-2">{category.nameCategory}</td>
                            <td className="border p-2">${category.price.toFixed(2)}</td>
                          </tr>
                        ))
                      ) : null}
                      {selectedPrescription?.idsMedicine && selectedPrescription.idsMedicine.length > 0 ? (
                        selectedPrescription.idsMedicine.map((medicine, index) => (
                          <tr key={index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 2 : 1)}>
                            <td className="border p-2">{index + (selectedBooking?.eyeCategories ? selectedBooking.eyeCategories.length : 0) + (selectedBooking?.eyeCategory ? 2 : 1)}</td>
                            <td className="border p-2">{`${medicine.split(",")[0]} (${medicine.split(",")[1]} ${medicine.split(",")[3]}) `}</td>
                            <td className="border p-2">${parseFloat(medicine.split(",")[1]) * parseFloat(medicine.split(",")[2])}</td>
                          </tr>
                        ))
                      ) : null}

                    </tbody>
                  </table>
                  <div className="mt-8">
                    <strong>Total: ${selectedPrescription?.totalAmount.toFixed(2)}</strong>{" "}
                  </div>
                </div>
                <div className="modal-footer">
                  <button id="close-save" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={() => saveBill(selectedPrescription)}>Save Bill </button>
                  <button id="close-button" type="button" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" data-bs-dismiss="modal">Đóng</button>
                  <button
                    id="download-button"
                    onClick={() => handleDownloadInvoice(index)}
                    className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Download as PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
