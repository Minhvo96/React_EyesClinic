import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



function InvoicePreview({ data }) {

    const total = data.items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);

    const handleDownloadInvoice = () => {

        const invoiceElement = document.getElementById("invoice-preview");
        const downloadButton = document.getElementById("download-button");

        downloadButton.style.display = "none";

        html2canvas(invoiceElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('invoice.pdf');

            downloadButton.style.display = "block";
        });
    };

    return (
        <div id="invoice-preview" className="p-8">
            <div className="flex justify-between items-start" >
                <h1 className="text-4xl font-bold">INVOICE</h1>
                <img src="/logo.jpg" alt="" className="w-32 h-32" />
            </div>

            <div className="mt-8">
                <div>Invoice No: 0000001</div>
                <div>Date: {data.date}</div>
            </div>

            <div className="mt-4">
                <strong>Bill to:</strong>
                <div>{data.clientName}</div>
                <div>{data.address}</div>
            </div>

            <table className="w-full mt-8 border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Item</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => {

                        const parsedAmount = parseFloat(item.amount) || 0;
                        const parsedSubtotal = parseFloat(item.subtotal) || 0;

                        return (
                            <tr key={index}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">${parsedAmount.toFixed(2)}</td>
                                <td className="border p-2">${parsedSubtotal.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="mt-8">
                <strong>Total: ${total.toFixed(2)}</strong>{" "}
            </div>

            <div className="mt-8">
                <strong>Bank Name: </strong> {data.bankName}
                <div>
                    <strong>Bank Account: </strong> {data.bankAccount}{" "}
                </div>
            </div>

            <div className="mt-8 text-xs italic">
                If you have any question, pls contact: {data.contactEmail}
            </div>

            <button
                id="download-button"
                onClick={handleDownloadInvoice}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Download as PDF
            </button>

        </div>
    );
};

export default InvoicePreview;