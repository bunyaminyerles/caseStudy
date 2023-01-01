import axios from 'axios';
export const baseUrl = 'https://5fc9346b2af77700165ae514.mockapi.io/'
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
