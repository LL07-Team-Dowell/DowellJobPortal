import React, { useEffect, useState } from "react";
import { myAxiosInstance } from "../../lib/axios";
import { initialCandidatesDataStateNames, useCandidateContext } from "../../contexts/CandidatesContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import ErrorPage from "../error/ErrorPage";
import JobTile from "./components/JobTile/JobTile";
import NavigationItemSelection from "./components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "./components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "./screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import TaskScreen from "./screens/TaskScreen/TaskScreen";

import "./style.css";
import { routes } from "../../lib/routes";
import { candidateStatuses } from "../candidate/utils/candidateStatuses";
import { candidateDataReducerActions } from "../../reducers/CandidateDataReducer";
import Button from "../admin/components/Button/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskScreen from "./screens/AddTaskScreen/AddTaskScreen";
import UserScreen from "./screens/UserScreen/UserScreen";
import { useLocation, useNavigate } from "react-router-dom";
import { mutableNewApplicationStateNames } from "../../contexts/NewApplicationContext";
import StaffJobLandingLayout from "../../layouts/StaffJobLandingLayout/StaffJobLandingLayout";
import TitleNavigationBar from "../../components/TitleNavigationBar/TitleNavigationBar";
import TogglerNavMenuBar from "../../components/TogglerNavMenuBar/TogglerNavMenuBar";
import JobCard from "../../components/JobCard/JobCard";


const Teamlead = ({ currentUser }) => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const { candidatesData, dispatchToCandidatesData } = useCandidateContext();
    const [ showCandidate, setShowCandidate ] = useState(false);
    const [ showCandidateTask, setShowCandidateTask ] = useState(false);
    const [ rehireTabActive, setRehireTabActive ] = useState(false);
    const [ selectedTabActive, setSelectedTabActive ] = useState(false);
    const [ currentCandidate, setCurrentCandidate ] = useState({});
    const [ currentTeamMember, setCurrentTeamMember ] = useState({});
    const [ currentUserProject, setCurrentUserProject ] = useState(null);
    const [ jobs, setJobs ] = useState([]);
    const [ showApplicationDetails, setShowApplicationDetails ] = useState(false);
    const [ allTasks, setAllTasks ] = useState([]);
    const [ showAddTaskModal, setShowAddTaskModal ] = useState(false);
    const [ editTaskActive, setEditTaskActive ] = useState(false);
    const [ currentTaskToEdit, setCurrentTaskToEdit ] = useState({});
    const location = useLocation();
    const [ currentActiveItem, setCurrentActiveItem ] = useState("Approval");
    const navigate = useNavigate();

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
        setAllTasks(usersWithTasks.reverse())
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
        
        const foundCandidate = candidatesData.onboardingCandidates.find(data => data.applicant === currentTeamMember);
        
        if (!foundCandidate) return;

        const candidateProject = foundCandidate.others[mutableNewApplicationStateNames.assigned_project];
        setCurrentUserProject(candidateProject);
        
    }, [currentTeamMember])
    
    useEffect(() => {
        const currentTab = searchParams.get("tab");
        
        if (currentTab === "rehire") {
            setRehireTabActive(true);
            setSelectedTabActive(false);
            setCurrentActiveItem("Rehire");
            return
        }

        setRehireTabActive(false);
        setSelectedTabActive(true);

    }, [searchParams])

    useEffect(() => {

        setShowCandidateTask(false);
        const currentPath = location.pathname.split("/")[1];
        const currentTab = searchParams.get("tab");

        if (!currentPath && !currentTab) return setCurrentActiveItem("Approval");
        if (currentPath && currentPath === "task") return setCurrentActiveItem("Tasks")

    }, [location])

    const handleEditTaskBtnClick = (currentData) => {
        setEditTaskActive(true);
        setCurrentTaskToEdit(currentData);
        setShowAddTaskModal(true);
    }

    const handleBackBtnClick = () => {
        setShowCandidate(false);
        setShowCandidateTask(false);
    }

    const handleMenuItemClick = (item) => {
        setCurrentActiveItem(item);
        
        if (item === "Tasks") return navigate("/task")

        const passedItemInLowercase = item.toLocaleLowerCase();
        return navigate(`/?tab=${passedItemInLowercase}`);
    }

    const handleViewTaskBtnClick = (data) => {
        setCurrentTeamMember(data.user);
        setShowCandidateTask(true);
    }

    const handleViewBtnClick = (data) => {
        setShowCandidate(true);
        setCurrentCandidate(data);
    }

    return <>
        <StaffJobLandingLayout teamleadView={true} hideSideBar={showAddTaskModal}>
        <TitleNavigationBar title={section === "task" ? "Tasks" : section === "user" ? "Profile" : showCandidate ? "Application Details" : "Applications"} hideBackBtn={(showCandidate || showCandidateTask) ? false : true} handleBackBtnClick={handleBackBtnClick} />
        { section !== "user" && !showCandidate && <TogglerNavMenuBar className={"teamlead"} menuItems={["Approval", "Tasks", "Rehire"]} currentActiveItem={currentActiveItem} handleMenuItemClick={handleMenuItemClick} /> }
        
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
                            return <JobCard
                                buttonText={"View"}
                                candidateCardView={true}
                                candidateData={dataitem}
                                jobAppliedFor={jobs.find(job => job.id === dataitem.job) ? jobs.find(job => job.id === dataitem.job).title : ""}
                                handleBtnClick={handleViewBtnClick}
                            />
                        })) :

                        rehireTabActive ?
                        React.Children.toArray(candidatesData.candidatesToRehire.map(dataitem => {
                            return <JobCard
                                buttonText={"View"}
                                candidateCardView={true}
                                candidateData={dataitem}
                                jobAppliedFor={jobs.find(job => job.id === dataitem.job) ? jobs.find(job => job.id === dataitem.job).title : ""}
                                handleBtnClick={handleViewBtnClick}
                            />
                        })) :

                        <></>                        
                    }
                </div>
            </> : 
            
            section === "task" ? 

            showCandidateTask ? <TaskScreen currentUser={currentTeamMember} handleAddTaskBtnClick={() => setShowAddTaskModal(true)} handleEditBtnClick={handleEditTaskBtnClick} assignedProject={currentUserProject}  /> :
            <>
                <SelectedCandidates 
                    showTasks={true} 
                    tasksCount={allTasks.length}
                />

                <div className="tasks-container">
                    {
                        React.Children.toArray(allTasks.map(dataitem => {
                            return <JobCard
                                buttonText={"View"}
                                candidateCardView={true}
                                candidateData={dataitem}
                                jobAppliedFor={jobs.find(job => job.id === dataitem.job) ? jobs.find(job => job.id === dataitem.job).title : ""}
                                handleBtnClick={handleViewTaskBtnClick}
                                taskView={true}
                            />
                        }))
                    }

                    <Button text={"Add Task"} icon={<AddCircleOutlineIcon />} handleClick={() => setShowAddTaskModal(true)} />
                </div>
            </> : 
            
            section === "user" ? <UserScreen currentUser={currentUser} /> : <>
                <ErrorPage disableNav={true} />
            </>
        }
        
    </StaffJobLandingLayout>
    </>
}

export default Teamlead;
