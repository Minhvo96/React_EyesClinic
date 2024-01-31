import axios from "axios";

// const URL_API = 'http://localhost:8080/api/prescription';
const URL_API = `${import.meta.env.VITE_API_URL}/prescription`;
const medicinePrescriptionService = {
  // getMdicinePrescription: async () => {

  //     return axios
  //         .get(URL_API)
  //         .then((response) => {

  //             return response.data;
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // },
  getMdicinePrescription: async () => {
    try {
      const response = await axios.get(URL_API);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  createMedicinePrescription: async (obj) => {
    console.log("obj", JSON.stringify(obj));
    return axios
      .post(URL_API, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getPrescriptionByIdBooking: async (id) => {
    const response = await axios.get(URL_API + "/" + id);
    return response.data;
  },

  getShowDetailPrescription: async (id) => {
    const response = await axios.get(URL_API + "/detail/" + id);
    return response.data;
  },
};

export default medicinePrescriptionService;
