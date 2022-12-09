import React from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';

function UserScreen({ currentUser }) {

  const navigate = useNavigate();

  const handleLogout = () => navigate("/logout");

  return (
    <div className='candidate__User__Profile__Page'>
      <div className="user__Page__Container user">

        <div className="user__Intro__Item__Container">
              <div className="user__Intro__Item">
                  <h2>User Name</h2>
                  <span>{ currentUser.username }</span>    
              </div>
              <div className="edit__Btn">
                  Edit
              </div>
          </div>
          <div className="user__Intro__Item">
              <h2>Email</h2>
              <span>{currentUser.email}</span>
          </div>
          <div className="user__Intro__Item">
              <h2>First Name</h2>
              <span>{currentUser.first_name}</span>
          </div>
          {
              currentUser.last_name !== "" &&
              <div className="user__Intro__Item">
                  <h2>Last Name</h2>
                  <span>{currentUser.last_name}</span>
              </div>
          }
          <div className="user__Intro__Item">
              <h2>Role</h2>
              <span>{currentUser.role}</span>
          </div>
          <button className="logout__Btn" onClick={handleLogout}>
            Logout
          </button>  
        </div>
    </div>
  )
}

export default UserScreen