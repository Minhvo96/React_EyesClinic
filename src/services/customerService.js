import axios from "axios";

const URL_API = 'http://localhost:8080/api/customer';
const customerService = {
    getAllCustomers: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createCustomer: async (obj) => {
        return axios
            .post(URL_API, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editCustomer: async (obj, id) => {
        return axios
            .put(URL_API + '/' + id, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteCustomer: async (id) => {
        return axios
            .delete(URL_API + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getCustomerById: async (id) => {
        return axios
            .get(URL_API + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }   

}

export default customerService;