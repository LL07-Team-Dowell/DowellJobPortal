import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CandidateHomeScreen from './views/candidate/screens/CandidateHomeScreen/CandidateHomeScreen';
import Logout from './views/authentication/Logout';
import AlertScreen from './views/candidate/screens/AlertsScreen/AlertScreen';
import UserScreen from './views/candidate/screens/UserScreen/UserScreen';
import AppliedScreen from './views/candidate/screens/AppliedPageScreen/AppliedScreen';
import Hr_JobScreen from './views/Hr/screens/JobScreen/Hr_JobScreen';
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
import useTitle from './hooks/useTitle';
import AfterSelectionScreen from './views/candidate/screens/AfterSelectionScreen/AfterSelectionScreen';
import { CandidateTaskContextProvider } from './contexts/CandidateTasksContext';
import { NewJobTermsContextProvider } from './contexts/NewJobTermsContext';
import SingleJobScreen from './views/candidate/screens/JobApplicationScreen/SingleJobScreen';
import JobScreen from './views/candidate/components/Job/Job';
import { useDetectOffline } from './hooks/useDetectOffline';
import ResearchAssociateJobScreen from './views/candidate/screens/ResearchAssociateJobScreen/ResearchAssociateJobScreen';
import EmployeeJobScreen from './views/candidate/screens/JobsLandingScreens/EmployeeJobLandingScreen';
import InternJobScreen from './views/candidate/screens/JobsLandingScreens/InternJobLandingScreen';
import FreelancerJobScreen from './views/candidate/screens/JobsLandingScreens/FreelancerJobScreen';
import { CandidateJobsContextProvider } from './contexts/CandidateJobsContext';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ candidateHired, setCandidateHired ] = useState(false);
  const [ assignedProject, setAssignedProject ] = useState("");

  useDowellLogin(setUser, setLoading);
  useTitle("Dowell Job Portal");
  useDetectOffline();

  if (loading) return <></>

  if (!user) {
    return <Routes>
      
      <Route path="/apply/job/:id" element={
        <NewApplicationContextProvider>
          <JobApplicationScreen />
        </NewApplicationContextProvider>
      } />
      <Route path='/jobs/:jobTitle' element={<SingleJobScreen />} />
      <Route path='/jobs' element={<JobScreen />} />
      <Route exact path='/jobs/c/research-associate' element={<ResearchAssociateJobScreen />} />
      <Route exact path='/jobs/c/employee' element={<EmployeeJobScreen />} />
      <Route exact path='/jobs/c/intern' element={<InternJobScreen />} />
      <Route exact path='/jobs/c/freelancer' element={<FreelancerJobScreen />} />
      <Route path="*" element={<CandidateHomeScreen />} />

    </Routes>
  }

  if (user.role === process.env.REACT_APP_ACCOUNT_ROLE) {
    return <Routes>
      
      <Route path="/logout" element={<Logout/>}/>

      <Route path="/" element={
        <NavigationContextProvider>
          <CandidateContextProvider>
            <AccountPage currentUser={user} />
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
          <AdminPage currentUser={user} />
        </NavigationContextProvider>} 
      >
        <Route path=':section' element={
          <NavigationContextProvider>
            <AdminPage />
          </NavigationContextProvider>
        } />
      </Route>

      <Route path="/edit-job" element={
        <NewJobTermsContextProvider>
          <EditJobScreen />
        </NewJobTermsContextProvider>} 
      />

      <Route path="/view-job" element={
        <NavigationContextProvider>
          <ViewJobScreen />
        </NavigationContextProvider>} 
      />

      <Route path="/add-job" element={
        <NavigationContextProvider>
          <NewJobTermsContextProvider>
            <AddJobScreen />
          </NewJobTermsContextProvider>
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
            <CandidateTaskContextProvider>
              <Hr_JobScreen currentUser={user} />
            </CandidateTaskContextProvider>
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
            <CandidateTaskContextProvider>
              <Teamlead currentUser={user} />
            </CandidateTaskContextProvider>
          </CandidateContextProvider>
        </NavigationContextProvider>
      } >
        <Route path=':section' element={<Teamlead />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
      
    </Routes>

  }



  return (
    candidateHired ? <Routes>

      <Route path='/' element={
        <NavigationContextProvider>
          <CandidateTaskContextProvider>
            <CandidateJobsContextProvider>
              <AfterSelectionScreen user={user} assignedProject={assignedProject} />
            </CandidateJobsContextProvider>
          </CandidateTaskContextProvider>
        </NavigationContextProvider>
      }>
        <Route path=':section' element={<AfterSelectionScreen />} />
      </Route>
      
      <Route path="/logout" element={<Logout/>}/>

      <Route path='*' element={<ErrorPage />} />

    </Routes> :

    <Routes>

      <Route path="/" element={
        <NavigationContextProvider>
          <CandidateJobsContextProvider>
            <CandidateHomeScreen user={user} setHired={setCandidateHired} setAssignedProject={setAssignedProject} />
          </CandidateJobsContextProvider>
        </NavigationContextProvider>
      }>
        <Route path=":section" element={
          <NavigationContextProvider>
            <CandidateJobsContextProvider>
              <CandidateHomeScreen />
            </CandidateJobsContextProvider>
          </NavigationContextProvider>
        } />
      </Route>

      <Route path='/jobs' element={<CandidateJobsContextProvider><JobScreen currentUser={user} /></CandidateJobsContextProvider>} />
      <Route exact path='/jobs/c/research-associate' element={<CandidateJobsContextProvider><ResearchAssociateJobScreen /></CandidateJobsContextProvider>} />
      <Route exact path='/jobs/c/employee' element={<CandidateJobsContextProvider><EmployeeJobScreen currentUser={user} /></CandidateJobsContextProvider>} />
      <Route exact path='/jobs/c/intern' element={<CandidateJobsContextProvider><InternJobScreen currentUser={user} /></CandidateJobsContextProvider>} />
      <Route exact path='/jobs/c/freelancer' element={<CandidateJobsContextProvider><FreelancerJobScreen currentUser={user} /></CandidateJobsContextProvider>} />
      <Route path="/logout" element={<CandidateJobsContextProvider><Logout/></CandidateJobsContextProvider>}/>
      <Route path="/alerts" element={<CandidateJobsContextProvider><AlertScreen/></CandidateJobsContextProvider>}/>
      <Route path="/user" element={<CandidateJobsContextProvider><UserScreen currentUser={user}/></CandidateJobsContextProvider>}/>

      <Route path="/applied" element={ 
        <NavigationContextProvider>
          <CandidateJobsContextProvider>
            <AppliedScreen user={user} />
          </CandidateJobsContextProvider>
        </NavigationContextProvider>
      } >
        <Route path=":section" element={
          <NavigationContextProvider>
            <CandidateJobsContextProvider>
              <AppliedScreen user={user} />
            </CandidateJobsContextProvider>
          </NavigationContextProvider>
        } />
      </Route>
      
      <Route path="/apply/job/:id" element={
        <NewApplicationContextProvider>
            <CandidateJobsContextProvider>
              <JobApplicationScreen />
            </CandidateJobsContextProvider>
        </NewApplicationContextProvider>
        }>
          <Route path=":section" element={
            <NewApplicationContextProvider>
                <CandidateJobsContextProvider>
                  <JobApplicationScreen />
                </CandidateJobsContextProvider>
            </NewApplicationContextProvider>
          } />
      </Route>

      <Route path='/jobs/:jobTitle' element={<CandidateJobsContextProvider><SingleJobScreen user={user} /></CandidateJobsContextProvider>} />
      <Route path='*' element={<ErrorPage />} />

    </Routes>
  );

}

export default App;
