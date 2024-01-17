import axios from "axios"

const urlAPI = 'http://localhost:3300/invoices';

class invoiceService {
    static getAll() {
        return axios.get(urlAPI)
    }

    static getInvoiceById(invoiceId) {
        return axios.get(urlAPI + '/' + invoiceId)
    }
    static createInvoice(data) {
        return axios.post(urlAPI, data);
    }

    static updateInvoiceById(invoiceId, data) { 
        return axios.put(urlAPI + '/' + invoiceId, data)
    }
    static deleteInvoiceById(id) {
        return axios.delete(urlAPI + '/' + id)
    }
}

export default invoiceService;