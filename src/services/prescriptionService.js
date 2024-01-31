import axios from "axios";

// const URL_API = 'http://localhost:8080/api/prescription';
const URL_API = `${import.meta.env.VITE_API_URL}/prescription`;
const prescriptionService = {
  getPrescription: async () => {
    return axios
      .get(URL_API)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createPrescription: async (obj) => {
    console.log("prescription obj: ", JSON.stringify(obj));
    return axios
      .post(URL_API, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getPrescriptionByBookingId: async (id) => {
    return axios
      .get(URL_API + "/booking/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editPrescription: async (obj, id) => {
    return axios
      .put(URL_API + "/" + id, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default prescriptionService;
