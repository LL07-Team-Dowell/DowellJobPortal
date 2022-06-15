import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Hr_AppliedScreen from './component/Hr/hr_screens/Hr_AppliedScreen';
import SelectedScreen from './component/Hr/hr_screens/selected/SelectedScreen';
import Shorlisted from './component/Hr/component/Active/Shortlisted/Shorlisted';
import ShortlistedScreen from './component/Hr/hr_screens/ShortlistedScreen';
import JobApplied from './component/Hr/hr_screens/JobApplied/JobApplied';
import Teamlead from './component/teamlead/Teamlead';
import AccountPage from './component/account/AccountPage';
import { NavigationContextProvider } from './contexts/NavigationContext';
import { CandidateContextProvider } from './contexts/CandidatesContext';
import JobApplicationScreen from './component/candidate/screens/JobApplicationScreen/JobApplicationScreen';
import ErrorPage from './component/error/ErrorPage';

function App() {

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
          
            <Route path="/id" element={<JobApplied/>}/>

          <Route path="/hr_applied" element={<Hr_AppliedScreen/>}/>
          <Route path="/shortlisted" element={<ShortlistedScreen/>}/>

          <Route path="/hr_applied/selected" element={<SelectedScreen/>}/>
          


          <Route path="/apply/job" element={<JobApplicationScreen />} />

          <Route path="/teamlead" element={
            <NavigationContextProvider>
              <CandidateContextProvider>
                <Teamlead />
              </CandidateContextProvider>
            </NavigationContextProvider>
          } >
            <Route path=':section' element={<Teamlead />} />
          </Route>

          <Route path="/account" element={
            <NavigationContextProvider>
              <CandidateContextProvider>
                <AccountPage />
              </CandidateContextProvider>
            </NavigationContextProvider>
          } >
            <Route path=':section' element={<AccountPage />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />

        </Routes>
    );

}

export default App;
