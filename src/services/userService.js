import axios from "axios";

// const URL_API = 'http://localhost:8080/api/users';
const URL_API = `${import.meta.env.VITE_API_URL}/users`;
const userService = {
  getAllUsers: async () => {
    return axios
      .get(URL_API)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createUser: async (obj) => {
    return axios
      .post(URL_API, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editUser: async (obj, id) => {
    return axios
      .put(URL_API + "/" + id, obj)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteUser: async (id) => {
    return axios
      .delete(URL_API + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getUserById: async (id) => {
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

export default userService;
