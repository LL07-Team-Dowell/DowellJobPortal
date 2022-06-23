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

      logoutUser().then(res => {
        
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
  
        
        navigate('/login');

      }).catch(err => {

        navigate(-1);

      });      
       
    }, [])
    
  return (
    <></>
  )
}

export default Logout