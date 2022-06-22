import axios from "axios"
import dayjs from "dayjs"
import jwt_decode from "jwt-decode"
import { myAxiosInstance } from "../../../axios";
import { useAuthContext } from "../../../contexts/AuthContext";

const baseURL ='https://100055.pythonanywhere.com/api/';

export const useCustomAxios = () => {

    const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useAuthContext()
    
    myAxiosInstance.interceptors.request.use( async (config) => {

        if (!accessToken || !refreshToken) return
        
        const access = jwt_decode(accessToken)
        console.log(access.exp)
        console.log("intercept")
        
        return config;
    
    }, (err) => {
        return "hii"
    })

    return myAxiosInstance

    // myAxiosInstance.post("/accounts/token/", {
    //     username: "abc001",
    //     password: "abc"
    // })   
}