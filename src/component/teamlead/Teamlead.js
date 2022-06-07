import React, { useState } from "react";
import BottomNavigationBar from "./BottomNavigationBar/BottomNavigationBar";
import JobTile from "./components/JobTile/JobTile";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import NavigationItemSelection from "./components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "./components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "./screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import TaskScreen from "./screens/TaskScreen/TaskScreen";

import "./style.css";


const Teamlead = () => {
    const testData = ["a", "a", "a", "a", "a", "a", "a", "a", "a"]
    const [showCandidate, setShowCandidate] = useState(false);
    const [showCandidateTask, setShowCandidateTask] = useState(false);
    const [currentSection, setCurrentSection] = useState("home");

    return <>

        <NavigationBar showCandidate={showCandidate} setShowCandidate={setShowCandidate} />
        
        {
            currentSection === "home" ? 
            showCandidate ? <SelectedCandidatesScreen /> : <>
                <NavigationItemSelection />
                <SelectedCandidates  />

                <div className="jobs-container">
                    {
                        React.Children.toArray(testData.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} />
                        }))
                    }
                </div>
            </> : 
            
            currentSection === "task" ? 

            showCandidateTask ? <TaskScreen /> :
            <>
                <SelectedCandidates showTasks={true} />

                <div className="tasks-container">
                    {
                        React.Children.toArray(testData.map(dataitem => {
                            return <JobTile showTask={true} setShowCandidate={setShowCandidateTask} />
                        }))
                    }
                </div>
            </> : 
            
            currentSection === "user" ? <></> : <></>
        }
        
        <BottomNavigationBar setCurrentSection={setCurrentSection} />
    </>
}

export default Teamlead;
