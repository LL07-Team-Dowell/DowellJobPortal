import { myAxiosInstance } from "./axios";

const requests = {
    Registration:`accounts/register_user/`,
    Login:`accounts/login_user/`,
    Logout:`accounts/logout_user/`,
    Jobs:`https://100055.pythonanywhere.com/api/jobs/get_jobs/`,
    Refresh: '/accounts/token/refresh/',
}

const refreshToken = (token) => {

    myAxiosInstance.post(requests.Refresh, {
      
      refresh: token,

    }).then(res => {

      localStorage.setItem("access_token", res.data.access);
      
    }).catch(err => {
      console.group(err)
    })

    setTimeout(() => refreshToken(token), 1200000)
}



export { requests, refreshToken };