import React, { useEffect } from 'react';

function Logout() {

  useEffect(() => {

    localStorage.removeItem('user');
    localStorage.clear();
    window.location.href = "https://100014.pythonanywhere.com/sign-out?redirect_url=" + window.location.origin + "/DowellJobPortal/%23";
      
  }, [])
    
  return (
    <></>
  )
}

export default Logout