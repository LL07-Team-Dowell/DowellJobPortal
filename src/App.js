import React, { useState } from 'react';
import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import './App.css';
import SignIn from './component/candidate/Login';
import SignUP from './component/candidate/Register';
import CandidateHomeScreen from './component/candidate/screens/CandidateHomeScreen';
import Logout from './component/candidate/Logout';
import AlertScreen from './component/candidate/screens/AlertScreen';
import UserScreen from './component/candidate/screens/UserScreen';
import TaskScreen from './component/candidate/screens/TaskScreen';
import AppliedScreen from'./component/candidate/screens/AppliedScreen';
import Hr_JobScreen from './component/Hr/hr_screens/Hr_JobScreen';
import Teamlead from './component/teamlead/Teamlead';
import AccountPage from './component/account/AccountPage';
import { NavigationContext } from './contexts/NavigationContext';

function App() {
    const { section } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ isNotificationEnabled, setNotificationStatus ] = useState(false);
 
    return (
        <Routes>

          <Route path="/" element={<SignUP/>}/> 
            
          <Route path="/login" element={<SignIn/>}/>
            
          <Route path="/home" element={<CandidateHomeScreen/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/alerts" element={<AlertScreen/>}/>
          <Route path="/user" element={<UserScreen/>}/>
          <Route path="/task" element={<TaskScreen/>}/>
          <Route path="/applied" element={<AppliedScreen/>}/>
          <Route path="/hr_screen" element={<Hr_JobScreen/>}/>

          <Route path="/teamlead" element={
            <NavigationContext.Provider value={{ section, searchParams, isNotificationEnabled, setNotificationStatus }}>
              <Teamlead />
            </NavigationContext.Provider>
          } >
            <Route path=':section' element={<Teamlead />} />
          </Route>
          <Route path="/account" element={
            <NavigationContext.Provider value={{ section, searchParams, isNotificationEnabled, setNotificationStatus }}>
              <AccountPage />
            </NavigationContext.Provider>
          } >
            <Route path=':section' element={<AccountPage />} />
          </Route>

        </Routes>
    );

}

export default App;
