import axios from "axios";

const URL_API = 'https://json-server-five-mu.vercel.app/services';
const eyeCategoriesService = {
    getAllEyeCategories: async () => {
        return axios
            .get(URL_API)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createEyeCategory: async (obj) => {
        return axios
            .post(URL_API, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editEyeCategory: async (id, obj) => {
        return axios
            .patch(URL_API + '/' + id, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteEyeCategory: async (id) => {
        return axios
            .delete(URL_API + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getEyeCategoryById: async (id) => {
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

export default eyeCategoriesService;