import axios from "axios";

// const URL_API = 'http://localhost:8080/api/bill';
const URL_API = `${import.meta.env.VITE_API_URL}/bill`;

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
  createBill: async (obj) => {
    return axios
      .post(URL_API, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editBill: async (obj, id) => {
    return axios
      .put(URL_API + "/" + id, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteBill: async (id) => {
    return axios
      .delete(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBillById: async (id) => {
    return axios
      .get(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default billService;
