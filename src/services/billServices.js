import axios from "axios";

const URL_API = 'http://localhost:8080/api/bill';
const billService = {
    getAllBills: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getBillsByMonthYear: async (obj) => {
        return axios
            .post(URL_API+ '/revenue', obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getBillsByYear: async (obj) => {
        return axios
            .post(URL_API+ '/revenue/year', obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default billService;