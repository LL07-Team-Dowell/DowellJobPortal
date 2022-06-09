import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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


const Teamlead = () => {
    const testData = ["a", "a", "a", "a", "a", "a", "a", "a", "a"]
    const [showCandidate, setShowCandidate] = useState(false);
    const [showCandidateTask, setShowCandidateTask] = useState(false);
    const { section } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [rehireTabActive, setRehireTabActive] = useState(false);
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const [isNotificationEnabled, setNotificationStatus] = useState(false);
    const sideNavbarRef = useRef(null);

    useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

    
    useEffect(() => {
        const currentTab = searchParams.get("tab");
        
        if (currentTab === "rehire") return setRehireTabActive(true);

        setRehireTabActive(false);

    }, [searchParams])

    return <>

        <NavigationBar 
            showCandidate={showCandidate} 
            setShowCandidate={setShowCandidate} 
            showCandidateTask={showCandidateTask} setShowCandidateTask={setShowCandidateTask} 
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
            showCandidate ? <SelectedCandidatesScreen rehireTabActive={rehireTabActive} /> : <>
                <NavigationItemSelection items={["Interview", "Selected", "Rehire"]} />
                <SelectedCandidates  />

                <div className="jobs-container">
                    {
                        React.Children.toArray(testData.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} />
                        }))
                    }
                </div>
            </> : 
            
            section === "task" ? 

            showCandidateTask ? <TaskScreen /> :
            <>
                <SelectedCandidates showTasks={true} />

                <div className="tasks-container">
                    {
                        React.Children.toArray(testData.map(dataitem => {
                            return <JobTile showTask={true} setShowCandidateTask={setShowCandidateTask} />
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
