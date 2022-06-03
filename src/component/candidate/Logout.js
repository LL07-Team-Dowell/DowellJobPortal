import React, {useEffect} from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import requests from '../../request';


function Logout() {
    const navigate=useNavigate();
    useEffect(() => {
      const response =axiosInstance.post(requests.Logout,{
          refresh_token: localStorage.getItem('refresh_token'),
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization']=null;
      navigate('/login');

      return response;
        
       
    })
    
  return (
    <div>Logout</div>
  )
}

export default Logout