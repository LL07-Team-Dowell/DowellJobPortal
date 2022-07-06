import { myAxiosInstance } from "./axios";

const routes = {
  Registration:`v1/auth/users/`,
  Login:`v1/auth/jwt/create/`,
  Logout:`accounts/logout_user/`,
  Jobs:`/jobs/get_jobs/`,
  Refresh: '/accounts/token/refresh/',
  User: '/jobs/get_user/',
  Applications: '/jobs/get_my_applications/',
  Add_Job: '/jobs/add_job/',
  Update_Job: 'jobs/update_job/',
}

const refreshToken = (token) => {

    myAxiosInstance.post(routes.Refresh, {
      
      refresh: token,

    }).then(res => {

      myAxiosInstance.defaults.headers = {
				Authorization: `Bearer ${res.data.access}`,
			}
      
    }).catch(err => {
      console.group(err)
    })

    setTimeout(() => refreshToken(token), 1200000)
}



export { routes, refreshToken };