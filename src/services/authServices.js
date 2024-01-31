import axios from "axios";

// const URL_API = 'http://localhost:8080/api/auth/';
const URL_API = `${import.meta.env.VITE_API_URL}/auth/`;
const authService = {
  login: async (data) => {
    return axios
      .post(URL_API + "login", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(error.response.data);
          return error.response.data;
        }
      });
  },
  register: async (obj) => {
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
};

export default authService;
