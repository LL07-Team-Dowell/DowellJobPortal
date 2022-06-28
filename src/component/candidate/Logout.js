import React, { useEffect } from 'react';
import { myAxiosInstance } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { requests } from '../../request';


function Logout() {
    const navigate=useNavigate();

    const logoutUser = async () => {
      await myAxiosInstance.post(requests.Logout,{
        refresh_token: localStorage.getItem('refresh_token'),
      });
    }

    useEffect(() => {

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