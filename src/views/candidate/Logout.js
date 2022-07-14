import React, { useEffect } from 'react';
import { myAxiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/request';


function Logout() {
    const navigate=useNavigate();

    const logoutUser = async () => {
      await myAxiosInstance.post(routes.Logout,{
        refresh_token: localStorage.getItem('refresh_token'),
      });
    }

    useEffect(() => {

      return 

      const refresh_token = localStorage.getItem("refresh_token");

      if (!refresh_token || refresh_token === "undefined") return navigate("-1");

      logoutUser().then(res => {
        
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
  
        // to trigger an app re-render and update the routes
        window.location.href = '/DowellJobPortal/#/login';

      }).catch(err => {

        navigate(-1);

      });      
       
    }, [])
    
  return (
    <></>
  )
}

export default Logout