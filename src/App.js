import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './component/candidate/Login';
import SignUP from './component/candidate/Register';
import CandidateHomeScreen from './component/candidate/screens/CandidateHomeScreen';
import Logout from './component/candidate/Logout';
import AlertScreen from './component/candidate/screens/AlertScreen';
import UserScreen from './component/candidate/screens/UserScreen';
import AppliedScreen from './component/candidate/screens/AppliedScreen';
import Hr_JobScreen from './component/Hr/hr_screens/Hr_JobScreen';
import Teamlead from './component/teamlead/Teamlead';
import AccountPage from './component/account/AccountPage';
import { NavigationContextProvider } from './contexts/NavigationContext';
import { CandidateContextProvider } from './contexts/CandidatesContext';
import JobApplicationScreen from './component/candidate/screens/JobApplicationScreen/JobApplicationScreen';
import ErrorPage from './component/error/ErrorPage';
import { NewApplicationContextProvider } from './contexts/NewApplicationContext';
import { refreshToken, routes } from './request';
import AdminPage from './component/admin/AdminPage';
import EditJobScreen from './component/admin/screens/EditJobScreen/EditJobScreen';
import ViewJobScreen from './component/admin/screens/ViewJobScreen/ViewJobScreen';
import AddJobScreen from './component/admin/screens/AddJobScreen/AddJobScreen';
import { authAxiosInstance, myAxiosInstance } from './axios';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    
    if (!savedUser) return setLoading(false);

    const savedAuthToken = localStorage.getItem("auth_token");

    authAxiosInstance.get(routes.User).then(res => {

      // myAxiosInstance.defaults.headers.common = {
      //   Authorization: `Bearer ${JSON.parse(savedAuthToken)}`
      // }

      setLoading(false);
      setUser(JSON.parse(savedUser));

    }).catch(err => {

      if (err.response.status === 401) {
        localStorage.clear("user");
        localStorage.clear("auth_token");
        setLoading(false);
      }

      return Promise.reject(err);

    })

  }, []);

  if (loading) return <></>

  if (!user) {
    return <Routes>
      
      <Route path="/signup" element={<SignUP setUser={setUser} />}/>   
      <Route path="*" element={<SignIn setUser={setUser} />} />

    </Routes>
  }

  if (user.is_account) {
    return <Routes>
      
      <Route path="/signup" element={<SignUP setUser={setUser}/>}/>     
      <Route path="/login" element={<SignIn setUser={setUser}/>}/>
      
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

  if (user.is_admin) {

    return <Routes>

      <Route path="/signup" element={<SignUP setUser={setUser}/>}/>     
      <Route path="/login" element={<SignIn setUser={setUser}/>}/>
      
      <Route path="/logout" element={<Logout/>}/>

      <Route path="/" element={
        <NavigationContextProvider>
          <AdminPage />
        </NavigationContextProvider>} 
      />

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

  if (user.is_hr) {

    return <Routes>

      <Route path="/signup" element={<SignUP setUser={setUser}/>}/>     
      <Route path="/login" element={<SignIn setUser={setUser}/>}/>
      
      <Route path="/logout" element={<Logout/>}/>
      
      <Route path="/" element={
        <NavigationContextProvider>
          <Hr_JobScreen/>
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

  if (user.is_team_leader) {

    return <Routes>

      <Route path="/signup" element={<SignUP setUser={setUser}/>}/>     
      <Route path="/login" element={<SignIn setUser={setUser}/>}/>
      
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

      <Route path="/signup" element={<SignUP setUser={setUser}/>}/> 
        
      <Route path="/login" element={<SignIn setUser={setUser}/>}/>
      
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

      <Route path="/applied" element={ <AppliedScreen user={user} />}/>
      
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
