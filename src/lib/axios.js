import axios from "axios";

const baseURL = 'https://100055.pythonanywhere.com/api/';
const loginBaseURL = 'https://100014.pythonanywhere.com/api/';
const communityBaseURL = 'https://100081.pythonanywhere.com/mainapp/';
const locationBaseURL = 'https://100074.pythonanywhere.com/';

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

const locationAxiosInstance = axios.create({
    baseURL: locationBaseURL,
    withCredentials: true,
})

const dowellLoginUrl = "https://100014.pythonanywhere.com/?redirect_url=" + window.location.origin + "/DowellJobPortal/#/";

export { authAxiosInstance, myAxiosInstance, dowellLoginUrl, mailAxiosInstance, communityAxiosInstance, locationAxiosInstance };
