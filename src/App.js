import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './component/candidate/Login';
import SignUP from './component/candidate/Register';
import CandidateHomeScreen from './component/candidate/screens/CandidateHomeScreen';
import Logout from './component/candidate/Logout';
import AlertScreen from './component/candidate/screens/AlertScreen';
import UserScreen from './component/candidate/screens/UserScreen';
import AppliedScreen from'./component/candidate/screens/AppliedScreen';
import Hr_JobScreen from './component/Hr/hr_screens/Hr_JobScreen';
import Teamlead from './component/teamlead/Teamlead';
import AccountPage from './component/account/AccountPage';
import { NavigationContextProvider } from './contexts/NavigationContext';
import { CandidateContextProvider } from './contexts/CandidatesContext';
import JobApplicationScreen from './component/candidate/screens/JobApplicationScreen/JobApplicationScreen';
import ErrorPage from './component/error/ErrorPage';
import { NewApplicationContextProvider } from './contexts/NewApplicationContext';
import { AppliedJobsContextProvider } from './contexts/AppliedJobsContext';
import { refreshToken } from './request';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    const refresh_token = localStorage.getItem("refresh_token");

    if (!savedUser) return setLoading(false);

    if (!refresh_token || refresh_token === "undefined") return setLoading(false);

    setUser(JSON.parse(savedUser));    
    refreshToken(refresh_token);
    setLoading(false);

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
            <AppliedJobsContextProvider>
              <CandidateHomeScreen/>
            </AppliedJobsContextProvider>
          </NavigationContextProvider>
        }>
          <Route path=":section" element={
            <NavigationContextProvider>
              <AppliedJobsContextProvider>
                <CandidateHomeScreen />
              </AppliedJobsContextProvider>
            </NavigationContextProvider>
          } />
        </Route>

        <Route path="/logout" element={<Logout/>}/>
        <Route path="/alerts" element={<AlertScreen/>}/>
        <Route path="/user" element={<UserScreen/>}/>

        <Route path="/applied" element={
          <AppliedJobsContextProvider>
            <AppliedScreen/>
          </AppliedJobsContextProvider>
        }/>
        
        <Route path="/apply/job" element={
          <NewApplicationContextProvider>
            <AppliedJobsContextProvider>
              <JobApplicationScreen />
            </AppliedJobsContextProvider>
          </NewApplicationContextProvider>
          }>
            <Route path=":section" element={
              <NewApplicationContextProvider>
                <AppliedJobsContextProvider>
                  <JobApplicationScreen />
                </AppliedJobsContextProvider>
              </NewApplicationContextProvider>
            } />
        </Route>

        <Route path='*' element={<ErrorPage />} />

      </Routes>
  );

}

export default App;
