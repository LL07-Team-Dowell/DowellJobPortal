import React, { useEffect } from 'react';
import { myAxiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/request';


function Logout() {
    const navigate = useNavigate();

    const logoutUser = async () => {
      await myAxiosInstance.post(routes.Logout,{
        refresh_token: localStorage.getItem('refresh_token'),
      });
    }

    useEffect(() => {

      localStorage.removeItem('user');
      
      window.location.href = "/";
       
    }, [])
    
  return (
    <></>
  )
}

export default Logout