import React, { StrictMode } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './component/candidate/Login';
import SignUP from './component/candidate/Register';
import CandidateHomeScreen from './component/candidate/screens/CandidateHomeScreen';
import {  HashRouter } from 'react-router-dom';
import Logout from './component/candidate/Logout';
import AlertScreen from './component/candidate/screens/AlertScreen';
import UserScreen from './component/candidate/screens/UserScreen';
import TaskScreen from './component/candidate/screens/TaskScreen';
import AppliedScreen from'./component/candidate/screens/AppliedScreen';
import Hr_JobScreen from './component/Hr/hr_screens/Hr_JobScreen';

function App() {
  
 
    return (
      <div className="App">
         <Router> 
         <Routes>
         <Route exact path="/login" element={<SignIn/>}/>
          
             <Route exact path="/" element={<SignUP/>}/> 
            
            
            <Route exact path="/home" element={<CandidateHomeScreen/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            <Route exact path="/alerts" element={<AlertScreen/>}/>
            <Route exact path="/user" element={<UserScreen/>}/>
            <Route exact path="/task" element={<TaskScreen/>}/>
            <Route exact path="/applied" element={<AppliedScreen/>}/>
            <Route exact path="/hr_screen" element={<Hr_JobScreen/>}/>




            

            </Routes>
      
         </Router> 
        
      </div>
    );

}

export default App;
