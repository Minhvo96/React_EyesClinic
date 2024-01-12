import React, { useEffect, useState } from 'react';
import InvoicePreview from './InvoicePreview';
import { RiDeleteBin6Line } from 'react-icons/ri';
import invoiceService from '../../services/InvoiceService';


function InvoiceForm() {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        clientName: '',
        date: '',
        dueDate: '',
        items: [{ description: '', amount: 0, quantity: 1, subtotal: 0 }],
        total: 0,
        address: "",
        contactEmail: "",
        bankName: "",
        bankAccount: "",

    });

    useEffect(() => {
        const getAllInvoices = async () => {
            try {
                const response = await invoiceService.getAll;
                const invoices = response.data;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    invoices: invoices,
                }));
            } catch (error) {
                console.log(error);
            }
        };

        getAllInvoices();
    }, []);

    useEffect(() => {
        if (isFormSubmitted) {
            setFormData({
                clientName: '',
                date: '',
                dueDate: '',
                items: [{ description: '', amount: 0, quantity: 1, subtotal: 0 }],
                total: 0,
                address: '',
                contactEmail: '',
                bankName: '',
                bankAccount: '',
            });
            setIsFormSubmitted(false);
        }
    }, [isFormSubmitted]);


    const handleAddInput = () => {
        if (!isFormSubmitted) {
            setFormData((prevState) => ({
                ...prevState,
                items: [
                    ...prevState.items,
                    {
                        description: '',
                        quantity: '',
                        amount: '',
                        subtotal: 0,
                    },
                ],
            }));
        }
    };

    const handleSubmit = async () => {
        if (!isFormSubmitted) {
            try {
                const newItem = {
                    clientName: formData.clientName,
                    date: formData.date,
                    items: formData.items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        amount: item.amount,
                        subtotal: item.subtotal,
                    })),
                    total: formData.total,
                    address: formData.address,
                    contactEmail: formData.contactEmail,
                    bankName: formData.bankName,
                    bankAccount: formData.bankAccount,
                };

                const items = newItem.items;
                let total = 0;
                for (let i = 0; i < items.length; i++) {
                    total += items[i].subtotal;
                }
                newItem.total = total;

                const createdItem = await invoiceService.createInvoice(newItem);
                if (createdItem) {
                    setFormData((prevState) => ({
                        ...prevState,
                        items: [],
                    }));
                    setIsFormSubmitted(true);
                }

            } catch (error) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        }
    };

    const handleInputChange = (e, index) => {
        if (!isFormSubmitted) {
            const { name, value } = e.target;
            const list = [...formData.items];
            list[index][name] = value;

            if (name === 'amount' || name === 'quantity') {
                const amount = parseFloat(list[index].amount || 0);
                const quantity = parseFloat(list[index].quantity || 1);
                list[index].subtotal = amount * quantity;
            }

            setFormData((prevState) => ({
                ...prevState,
                items: list,
            }));
        }
    };


    const handleRemoveItem = async (index) => {
        const list = [...formData.items];
        const removedItem = list[index];

        try {
            if (removedItem.id) {
                await invoiceService.deleteInvoiceById(removedItem.id);
            }

            list.splice(index, 1);
            setFormData((prevState) => ({
                ...prevState,
                items: list,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        setFormData({
            clientName: '',
            date: '',
            dueDate: '',
            items: [{ description: '', amount: 0, quantity: 1, subtotal: 0 }],
            total: 0,
            address: '',
            contactEmail: '',
            bankName: '',
            bankAccount: '',
        });
        setIsFormSubmitted(false);
    };


    return (
        <div className='d-flex justify-content-center'>
                <div className='w-50'>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Invoice Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <input
                            type="text"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Bank Name</label>
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Bank Account</label>
                        <input
                            type="text"
                            name="bankAccount"
                            value={formData.bankAccount}
                            onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                    </div>

                    {formData.items.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2 items-center">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={e => handleInputChange(e, index)}
                                className="p-2 border rounded w-16 mr-2"
                            />

                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={e => handleInputChange(e, index)}
                                className="p-2 border rounded flex-1 mr-2"
                            />

                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={item.amount}
                                onChange={e => handleInputChange(e, index)}
                                className="p-2 border rounded w-24 mr-2"
                            />

                            <span className="w-24 text-right">${(item.subtotal || 0).toFixed(2)}</span>

                            <button
                                onClick={() => handleRemoveItem(index)}
                                className="p-2 rounded cursor-pointer"
                                aria-label="Delete Item"
                            >
                                <RiDeleteBin6Line style={{ fontSize: "24px" }} />

                            </button>
                        </div>
                    ))}
                    <button
                        className="bg-blue-500 text-white p-2 rounded mb-4 m-2"
                        onClick={handleAddInput}
                    >
                        Add Item
                    </button>
                    <button
                        className="bg-green-500 text-white p-2 rounded mb-4 m-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    {!isFormSubmitted && (
                        <button className="bg-red-500 text-white p-2 rounded m-2" onClick={handleReset}>
                            Reset
                        </button>
                    )}
                    <InvoicePreview data={formData} />

                </div>
        </div>
    );
};

export default InvoiceForm;
