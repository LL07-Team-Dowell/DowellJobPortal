import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavigationBar from '../../../Hr/component/BottomNavigation/BottomNavigation';
import { afterSelectionLinks } from '../../utils/afterSelectionLinks';
import "./style.css";
import { useSearchParams, useNavigate } from 'react-router-dom';
import TitleNavigationBar from '../../../../components/TitleNavigationBar/TitleNavigationBar';

function UserScreen({ afterSelection, currentUser }) {

  const [ params, setParams ] = useSearchParams();
  const [ passedCategory, setPassedCategory ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const jobCategoryParam = params.get("jobCategory");

    if (!jobCategoryParam) return;

    setPassedCategory(jobCategoryParam);

  }, [params])

  return (
    <div className='candidate__User__Profile__Page'>
      <TitleNavigationBar title={"Profile"} handleBackBtnClick={() => navigate(-1)} />
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
                
        </div>
      { afterSelection ? <BottomNavigationBar links={afterSelectionLinks} /> : <Footer currentCategory={passedCategory && passedCategory} /> }
    </div>
  )
}

export default UserScreen