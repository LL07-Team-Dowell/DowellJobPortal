import React, { useEffect } from 'react';

function Logout() {

  useEffect(() => {

    localStorage.removeItem('user');
    
    window.location.href = "/DowellJobPortal";
      
  }, [])
    
  return (
    <></>
  )
}

export default Logout