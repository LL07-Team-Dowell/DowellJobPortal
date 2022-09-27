import axios from "axios";

const baseURL = 'https://100055.pythonanywhere.com/api/';
const loginBaseURL = 'https://100014.pythonanywhere.com/api/';

const myAxiosInstance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
})

const authAxiosInstance = axios.create({
    withCredentials: true,
    baseURL: loginBaseURL,
})

const mailAxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})

const dowellLoginUrl = "https://100014.pythonanywhere.com/";

export { authAxiosInstance, myAxiosInstance, dowellLoginUrl, mailAxiosInstance };
