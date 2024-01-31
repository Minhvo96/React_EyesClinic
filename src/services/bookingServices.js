import axios from "axios";

// const URL_API = 'http://localhost:8080/api/booking';
const URL_API = `${import.meta.env.VITE_API_URL}/booking`;
const bookingService = {
  getAllBookings: async () => {
    return axios
      .get(URL_API)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createBooking: async (obj) => {
    return axios
      .post(URL_API, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editBooking: async (obj, id) => {
    return axios
      .put(URL_API + "/" + id, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteBooking: async (id) => {
    return axios
      .delete(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBookingById: async (id) => {
    return axios
      .get(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBookingByStatus: async () => {
    return axios
      .get(URL_API + "/examining")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBookingByStatusWaitingAndDate: async (obj) => {
    return axios
      .post(URL_API + "/waiting", obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBookingByStatusPendingAndDate: async (obj) => {
    return axios
      .post(URL_API + "/pending", obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBookingByStatusWaitingOrExaminingAndDate: async (obj) => {
    return axios
      .post(URL_API + "/waiting-examining", obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getShowDetailBooking: async (id) => {
    console.log("URL_API", URL_API);
    const response = await axios.get(URL_API + "/detail/" + id);
    return response.data;
  },

  getBookingByPhone: async (phone) => {
    return axios
      .get(URL_API + "/user" + "/" + phone)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default bookingService;
