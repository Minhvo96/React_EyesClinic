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
    }


}

export default eyeCategoriesService;