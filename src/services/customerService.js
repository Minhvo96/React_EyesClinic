import axios from "axios";

// const URL_API = 'http://localhost:8080/api/customer';
const URL_API = `${import.meta.env.VITE_API_URL}/customer`;
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
      .put(URL_API + "/" + id, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteCustomer: async (id) => {
    return axios
      .delete(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getCustomerById: async (id) => {
    return axios
      .get(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getCustomerBookingStats: async (customerId) => {
    return axios
      .get(URL_API + "/" + customerId + "/booking-stats")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  searchCustomer: async (keyword) => {
    return axios
      .get(URL_API + "/search/" + keyword)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default customerService;
