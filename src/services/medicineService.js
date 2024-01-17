import axios from "axios";

// const URL_API = 'https://json-server-five-mu.vercel.app/medicine';
const URL_API = 'http://localhost:8080/api/medicine';
const medicineService = {
    getAllMedicines: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getAllMedicinesOptions: async () => {
        return axios
            .get(URL_API + "/all-medicines")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getMedicineById: async (id) => {
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

export default medicineService;