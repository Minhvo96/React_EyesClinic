import axios from "axios";

const URL_API = 'http://localhost:8080/api/prescription';
const medicinePrescriptionService = {
    getMdicinePrescription: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createMedicinePrescription: async (obj) => {
        console.log("prescription obj: ", JSON.stringify(obj));
        return axios
            .post(URL_API, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }


}

export default medicinePrescriptionService;