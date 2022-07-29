import React, { useEffect, useRef, useState } from "react";
import { myAxiosInstance } from "../../lib/axios";
import { initialCandidatesDataStateNames, useCandidateContext } from "../../contexts/CandidatesContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import SideNavigationBar from "../account/components/SideNavigationBar/SideNavigationBar";
import useClickOutside from "../../hooks/useClickOutside";
import ErrorPage from "../error/ErrorPage";
import BottomNavigationBar from "./components/BottomNavigationBar/BottomNavigationBar";
import JobTile from "./components/JobTile/JobTile";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import NavigationItemSelection from "./components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "./components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "./screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import TaskScreen from "./screens/TaskScreen/TaskScreen";

import "./style.css";
import { routes } from "../../lib/routes";
import { candidateStatuses } from "../candidate/utils/candidateStatuses";
import { candidateDataReducerActions } from "../../reducers/CandidateDataReducer";
import { PageUnderConstruction } from "../under_construction/ConstructionPage";
import Button from "../admin/components/Button/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskScreen from "./screens/AddTaskScreen/AddTaskScreen";


const Teamlead = () => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const { candidatesData, dispatchToCandidatesData } = useCandidateContext();
    const [ showCandidate, setShowCandidate ] = useState(false);
    const [ showCandidateTask, setShowCandidateTask ] = useState(false);
    const [ rehireTabActive, setRehireTabActive ] = useState(false);
    const [ selectedTabActive, setSelectedTabActive ] = useState(false);
    const [ isSideNavbarActive, setSideNavbarActive ] = useState(false);
    const [ currentCandidate, setCurrentCandidate ] = useState({});
    const [ currentTeamMember, setCurrentTeamMember ] = useState({});
    const [ jobs, setJobs ] = useState([]);
    const [ showApplicationDetails, setShowApplicationDetails ] = useState(false);
    const [ allTasks, setAllTasks ] = useState([]);
    const [ showAddTaskModal, setShowAddTaskModal ] = useState(false);
    const [ editTaskActive, setEditTaskActive ] = useState(false);
    const [ currentTaskToEdit, setCurrentTaskToEdit ] = useState({});

    const sideNavbarRef = useRef(null);

    useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

    async function getTeamlead () {
        const response = await myAxiosInstance.get(routes.Teamlead_View);
        return response;
    }

    async function getJobs() {
        const response = await myAxiosInstance.get(routes.Jobs);
        setJobs(response.data)
        return;
    }

    async function getTasks() {
        const response = await myAxiosInstance.get(routes.Tasks);
        const usersWithTasks = [...new Map(response.data.map(task => [ task.user, task ])).values()];
        setAllTasks(usersWithTasks)
        return
    }

    async function getApplications () {
        const response = await myAxiosInstance.get(routes.Applications);
        const selectedCandidates = response.data.filter(application => application.status === candidateStatuses.SELECTED);
        const candidatesToRehire = response.data.filter(application => application.status === candidateStatuses.TO_REHIRE);
        const onboardingCandidates = response.data.filter(application => application.status === candidateStatuses.ONBOARDING);
        
        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_SELECTED_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.selectedCandidates,
            value: selectedCandidates,
        }});

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
            value: candidatesToRehire,
        }});

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
            value: onboardingCandidates,
        }});
        
        return
    }
    
    useEffect(() => {
        
        getTeamlead();
        getJobs();
        getApplications();
        getTasks();

    }, [])
    
    useEffect(() => {
        const currentTab = searchParams.get("tab");
        
        if (currentTab === "rehire") {
            setRehireTabActive(true);
            setSelectedTabActive(false);
            return
        }

        setRehireTabActive(false);
        setSelectedTabActive(true);

    }, [searchParams])

    const handleEditTaskBtnClick = (currentData) => {
        setEditTaskActive(true);
        setCurrentTaskToEdit(currentData);
        setShowAddTaskModal(true);
    }

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
            showAddTaskModal && 
            <AddTaskScreen closeTaskScreen={() => setShowAddTaskModal(false)} teamMembers={candidatesData.onboardingCandidates} updateTasks={setAllTasks} editPage={editTaskActive} setEditPage={setEditTaskActive} taskToEdit={currentTaskToEdit} />
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
                jobTitle={jobs.filter(job => job.id === currentCandidate.job).length >=1 ? jobs.filter(job => job.id === currentCandidate.job)[0].title : ""}
                showApplicationDetails={showApplicationDetails}
                teamleadPageActive={true}
                handleViewApplicationBtnClick={() => setShowApplicationDetails(!showApplicationDetails)}
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
                            return  <JobTile setShowCandidate={setShowCandidate} candidateData={dataitem} handleJobTileClick={setCurrentCandidate} jobTitle={jobs.filter(job => job.id === dataitem.job).length >=1 ? jobs.filter(job => job.id === dataitem.job)[0].title : ""} />
                        })) :

                        rehireTabActive ?
                        React.Children.toArray(candidatesData.candidatesToRehire.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} candidateData={dataitem} handleJobTileClick={setCurrentCandidate} jobTitle={jobs.filter(job => job.id === dataitem.job).length >=1 ? jobs.filter(job => job.id === dataitem.job)[0].title : ""} />
                        })) :

                        <></>                        
                    }
                </div>
            </> : 
            
            section === "task" ? 

            showCandidateTask ? <TaskScreen currentUser={currentTeamMember} handleAddTaskBtnClick={() => setShowAddTaskModal(true)} handleEditBtnClick={handleEditTaskBtnClick}  /> :
            <>
                <SelectedCandidates 
                    showTasks={true} 
                    tasksCount={allTasks.length}
                />

                <div className="tasks-container">
                    {
                        React.Children.toArray(allTasks.map(dataitem => {
                            return <JobTile showTask={true} setShowCandidateTask={setShowCandidateTask} taskData={dataitem} handleJobTileClick={setCurrentTeamMember} />
                        }))
                    }

                    <Button text={"Add Task"} icon={<AddCircleOutlineIcon />} handleClick={() => setShowAddTaskModal(true)} />
                </div>
            </> : 
            
            section === "user" ? <PageUnderConstruction /> : <>
                <ErrorPage disableNav={true} />
            </>
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
