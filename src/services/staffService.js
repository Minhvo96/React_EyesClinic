import axios from "axios";

const URL_API = 'http://localhost:8080/api/staffs';
const staffService = {
    getAllStaffs: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createStaff: async (obj) => {
        return axios
            .post(URL_API, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editStaff: async (obj, id) => {
        return axios
            .put(URL_API + '/' + id, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteStaff: async (id) => {
        return axios
            .delete(URL_API + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getStaffById: async (id) => {
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

export default staffService;