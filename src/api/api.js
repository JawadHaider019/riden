import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;



const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("riden_token");

    if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("riden_token");
            localStorage.removeItem("riden_user");
            // Optionally redirect to home or login page if window is available
            // window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;