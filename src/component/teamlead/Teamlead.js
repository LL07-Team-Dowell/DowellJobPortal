import React, { useEffect, useRef, useState } from "react";
import { useCandidateContext } from "../../contexts/CandidatesContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import SideNavigationBar from "../account/components/SideNavigationBar/SideNavigationBar";
import useClickOutside from "../account/hooks/useClickOutside";
import BottomNavigationBar from "./components/BottomNavigationBar/BottomNavigationBar";
import JobTile from "./components/JobTile/JobTile";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import NavigationItemSelection from "./components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "./components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "./screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import TaskScreen from "./screens/TaskScreen/TaskScreen";

import "./style.css";
import { tasksData } from "./tasks";

const Teamlead = () => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const { candidatesData, dispatchToCandidatesData } = useCandidateContext();
    const [ showCandidate, setShowCandidate ] = useState(false);
    const [ showCandidateTask, setShowCandidateTask ] = useState(false);
    const [ rehireTabActive, setRehireTabActive ] = useState(false);
    const [ interviewTabActive, setInterviewTabActive ] = useState(false);
    const [ selectedTabActive, setSelectedTabActive ] = useState(false);
    const [ isSideNavbarActive, setSideNavbarActive ] = useState(false);
    const [ currentCandidate, setCurrentCandidate ] = useState({});
    const [ currentTask, setCurrentTask ] = useState({});
    
    const sideNavbarRef = useRef(null);

    useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

    
    useEffect(() => {
        const currentTab = searchParams.get("tab");
        
        if (currentTab === "rehire") {
            setRehireTabActive(true);
            setInterviewTabActive(false);
            setSelectedTabActive(false);
            return
        }

        if (currentTab === "selected") {
            setSelectedTabActive(true);
            setRehireTabActive(false);
            setInterviewTabActive(false);
            return
        }

        setInterviewTabActive(true);
        setRehireTabActive(false);
        setSelectedTabActive(false);

    }, [searchParams])

    return <>

        <NavigationBar 
            showCandidate={showCandidate} 
            setShowCandidate={setShowCandidate} 
            showCandidateTask={showCandidateTask} 
            setShowCandidateTask={setShowCandidateTask} 
            handleMenuIconClick={() => setSideNavbarActive(true)}
        />
        
        {
            isSideNavbarActive &&
            <SideNavigationBar 
                sideNavRef={sideNavbarRef}
                closeSideNavbar={() => setSideNavbarActive(false)} 
                isNotificationEnabled={isNotificationEnabled}
                setNotificationStatus={() => setNotificationStatus(prevValue => { return !prevValue } )}
            />
        }

        {
            section === "home" || section == undefined ? 
            showCandidate ? 
            
            <SelectedCandidatesScreen 
                selectedCandidateData={currentCandidate}
                updateShowCandidate={setShowCandidate}
                rehireTabActive={rehireTabActive} 
                allCandidatesData={
                    selectedTabActive ? candidatesData.selectedCandidates :
                    rehireTabActive ? candidatesData.candidatesToRehire :
                    []
                }
                updateCandidateData={dispatchToCandidatesData}
            /> 
            
            : <>
                <NavigationItemSelection items={["Selected", "Rehire"]} searchParams={searchParams} />
                <SelectedCandidates
                    candidatesCount={
                        selectedTabActive ? candidatesData.selectedCandidates.length :
                        rehireTabActive ? candidatesData.candidatesToRehire.length :
                        0
                    }
                />

                <div className="jobs-container">
                    {

                        selectedTabActive ? 
                        React.Children.toArray(candidatesData.selectedCandidates.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} candidateData={dataitem} handleJobTileClick={setCurrentCandidate} />
                        })) :

                        rehireTabActive ?
                        React.Children.toArray(candidatesData.candidatesToRehire.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} candidateData={dataitem} handleJobTileClick={setCurrentCandidate} />
                        })) :

                        <></>                        
                    }
                </div>
            </> : 
            
            section === "task" ? 

            showCandidateTask ? <TaskScreen currentTaskToShow={currentTask}  /> :
            <>
                <SelectedCandidates 
                    showTasks={true} 
                    tasksCount={tasksData.length}
                />

                <div className="tasks-container">
                    {
                        React.Children.toArray(tasksData.map(dataitem => {
                            return <JobTile showTask={true} setShowCandidateTask={setShowCandidateTask} taskData={dataitem} handleJobTileClick={setCurrentTask} />
                        }))
                    }
                </div>
            </> : 
            
            section === "user" ? <></> : <></>
        }
        
        <BottomNavigationBar 
        currentPage={'teamlead'}
        firstLink={'home'}
        secondLink={'task'}
        thirdLink={'user'}
        updateNav={showCandidate ? setShowCandidate: showCandidateTask ? setShowCandidateTask : () => {} } />
    </>
}

export default Teamlead;
