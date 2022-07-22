import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CandidateHomeScreen from './views/candidate/screens/CandidateHomeScreen';
import Logout from './views/authentication/Logout';
import AlertScreen from './views/candidate/screens/AlertScreen';
import UserScreen from './views/candidate/screens/UserScreen';
import AppliedPage from './views/candidate/screens/AppliedPage';
import Hr_JobScreen from './views/Hr/hr_screens/Hr_JobScreen';
import Teamlead from './views/teamlead/Teamlead';
import AccountPage from './views/account/AccountPage';
import { NavigationContextProvider } from './contexts/NavigationContext';
import { CandidateContextProvider } from './contexts/CandidatesContext';
import JobApplicationScreen from './views/candidate/screens/JobApplicationScreen/JobApplicationScreen';
import ErrorPage from './views/error/ErrorPage';
import { NewApplicationContextProvider } from './contexts/NewApplicationContext';
import AdminPage from './views/admin/AdminPage';
import EditJobScreen from './views/admin/screens/EditJobScreen/EditJobScreen';
import ViewJobScreen from './views/admin/screens/ViewJobScreen/ViewJobScreen';
import AddJobScreen from './views/admin/screens/AddJobScreen/AddJobScreen';
import { HrCandidateContextProvider } from './contexts/HrCandidateContext';
import useDowellLogin from './hooks/useDowellLogin';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useDowellLogin(setUser, setLoading);

  if (loading) return <></>

  if (!user) {
    return <Routes>
      
      <Route path="/apply/job" element={
        <NewApplicationContextProvider>
          <JobApplicationScreen />
        </NewApplicationContextProvider>
      } />
      <Route path="*" element={<CandidateHomeScreen />} />

    </Routes>
  }

  if (user.role === process.env.REACT_APP_ACCOUNT_ROLE) {
    return <Routes>
      
      <Route path="/logout" element={<Logout/>}/>

      <Route path="/" element={
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
  }

  if (user.username === process.env.REACT_APP_ADMIN_USERNAME) {

    return <Routes>

      <Route path="/logout" element={<Logout/>}/>

      <Route path="/" element={
        <NavigationContextProvider>
          <AdminPage />
        </NavigationContextProvider>} 
      >
        <Route path=':section' element={
          <NavigationContextProvider>
            <AdminPage />
          </NavigationContextProvider>
        } />
      </Route>

      <Route path="/edit-job" element={<EditJobScreen />} />

      <Route path="/view-job" element={
        <NavigationContextProvider>
          <ViewJobScreen />
        </NavigationContextProvider>} 
      />

      <Route path="/add-job" element={
        <NavigationContextProvider>
          <AddJobScreen />
        </NavigationContextProvider>} 
      />

      <Route path='*' element={<ErrorPage />} />

    </Routes>

  }

  if (user.role === process.env.REACT_APP_HR_ROLE) {

    return <Routes>

      <Route path="/logout" element={<Logout/>}/>
      
      <Route path="/" element={
        <NavigationContextProvider>
          <HrCandidateContextProvider>
            <Hr_JobScreen/>
          </HrCandidateContextProvider>
        </NavigationContextProvider>
      }>
        <Route path=":section" element={
          <NavigationContextProvider>
            <Hr_JobScreen />
          </NavigationContextProvider>
        } >
          <Route path=":sub_section" element={
            <NavigationContextProvider>
              <Hr_JobScreen />
            </NavigationContextProvider>
          } >
            <Route path=":path" element={
              <NavigationContextProvider>
                <Hr_JobScreen />
              </NavigationContextProvider>
            } />
          </Route>
        </Route>
        
      </Route>

      <Route path='*' element={<ErrorPage />} />

    </Routes>
  }

  if (user.role === process.env.REACT_APP_TEAMLEAD_ROLE) {

    return <Routes>

      <Route path="/logout" element={<Logout/>}/>

      <Route path="/" element={
        <NavigationContextProvider>
          <CandidateContextProvider>
            <Teamlead />
          </CandidateContextProvider>
        </NavigationContextProvider>
      } >
        <Route path=':section' element={<Teamlead />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
      
    </Routes>

  }



  return (
    <Routes>

      <Route path="/" element={
        <NavigationContextProvider>
          <CandidateHomeScreen user={user} />
        </NavigationContextProvider>
      }>
        <Route path=":section" element={
          <NavigationContextProvider>
            <CandidateHomeScreen />
          </NavigationContextProvider>
        } />
      </Route>

      <Route path="/logout" element={<Logout/>}/>
      <Route path="/alerts" element={<AlertScreen/>}/>
      <Route path="/user" element={<UserScreen/>}/>

      <Route path="/applied" element={ 
        <NavigationContextProvider>
          <AppliedPage user={user} />
        </NavigationContextProvider>
      } >
        <Route path=":section" element={
          <NavigationContextProvider>
            <AppliedPage user={user} />
          </NavigationContextProvider>
        } />
      </Route>
      
      <Route path="/apply/job" element={
        <NewApplicationContextProvider>
            <JobApplicationScreen />
        </NewApplicationContextProvider>
        }>
          <Route path=":section" element={
            <NewApplicationContextProvider>
                <JobApplicationScreen />
            </NewApplicationContextProvider>
          } />
      </Route>

      <Route path='*' element={<ErrorPage />} />

    </Routes>
  );

}

export default App;
