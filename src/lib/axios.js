import axios from "axios";

const baseURL = 'https://100055.pythonanywhere.com/api/';
const loginBaseURL = 'https://100014.pythonanywhere.com/api/';
const communityBaseURL = 'https://100081.pythonanywhere.com/mainapp/';

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

const communityAxiosInstance = axios.create({
    baseURL: communityBaseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }   
})

const dowellLoginUrl = "https://100014.pythonanywhere.com/";

export { authAxiosInstance, myAxiosInstance, dowellLoginUrl, mailAxiosInstance, communityAxiosInstance };
