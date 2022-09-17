import React, { useEffect, useRef, useState } from 'react';
import './Hr_JobScreen.css';
import Search from '../../component/Search/Search';
import { hrNavigationLinks } from '../hrNavigationLinks';
import BottomNavigationBar from '../../component/BottomNavigation/BottomNavigation';
import JobTile from '../../../teamlead/components/JobTile/JobTile';
import { myAxiosInstance } from '../../../../lib/axios';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import NavigationBar from '../../../teamlead/components/NavigationBar/NavigationBar';
import useClickOutside from '../../../../hooks/useClickOutside';
import SideNavigationBar from '../../../account/components/SideNavigationBar/SideNavigationBar';
import ShortlistedScreen from '../ShortlistedScreen/ShortlistedScreen';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectedCandidates from '../../../teamlead/components/SelectedCandidates/SelectedCandidates';
import SelectedCandidatesScreen from '../../../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen';
import ErrorPage from '../../../error/ErrorPage';
import { routes } from '../../../../lib/routes';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { candidateStatuses } from '../../../candidate/utils/candidateStatuses';
import { useHrCandidateContext } from '../../../../contexts/HrCandidateContext';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import UserScreen from '../UserScreen/UserScreen';
import Button from '../../../admin/components/Button/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskScreen from '../../../teamlead/screens/AddTaskScreen/AddTaskScreen';
import TaskScreen from '../../../teamlead/screens/TaskScreen/TaskScreen';
import AttendanceScreen from '../AttendanceScreen/AttendanceScreen';



function Hr_JobScreen({ currentUser }) {
  
  const { section, sub_section, path, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
  const [jobs, setJobs] = useState([]);
  const [ appliedJobs, setAppliedJobs ] = useState([]);
  const sideNavbarRef = useRef(null);
  const [sideNavbarActive, setSideNavbarActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [jobSearchInput, setJobSearchInput] = useState("");
  const [ searchActive, setSearchActive ] = useState(false);
  const [ matchedJobs, setMatchedJobs ] = useState([]);
  const { candidateData, setCandidateData } = useHrCandidateContext();
  const [ isLoading, setLoading ] = useState(true);
  const [ currentProjects, setCurrentProjects ] = useState([]);
  const [ allTasks, setAllTasks ] = useState([]);
  const [ showAddTaskModal, setShowAddTaskModal ] = useState(false);
  const [ hiredCandidates, setHiredCandidates ] = useState([]);
  const [ showCurrentCandidateTask, setShowCurrentCandidateTask ] = useState(false);
  const [ currentTeamMember, setCurrentTeamMember ] = useState({});
  const [ editTaskActive, setEditTaskActive ] = useState(false);
  const [ currentTaskToEdit, setCurrentTaskToEdit ] = useState({});
  const [ currentCandidateProject, setCurrentCandidateProject ] = useState(null);
  const [ currentSortOption, setCurrentSortOption ] = useState(null);
  const [ sortResults, setSortResults ] = useState([]);
  const [ showCurrentCandidateAttendance, setShowCurrentCandidateAttendance ] = useState(false);
  
  useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

  const getJobs = async () => {

    const response = await myAxiosInstance.get(routes.Jobs);
    setJobs(response.data);
    return;
  
  }

  const getJobApplications = async () => {
    const response = await myAxiosInstance.get(routes.Applications);
    setAppliedJobs(response.data.filter(application => application.status === candidateStatuses.PENDING_SELECTION));
    setCandidateData(response.data.filter(application => application.status === candidateStatuses.SHORTLISTED));
    setHiredCandidates(response.data.filter(application => application.status === candidateStatuses.ONBOARDING));
    return;
  }

  const getProjects = async () => {
    const response = await myAxiosInstance.get(routes.Projects);
    setCurrentProjects(response.data.map(project => project.project_name));
    return
  }

  const getTasks = async () => {
    const response = await myAxiosInstance.get(routes.Tasks);
    const usersWithTasks = [...new Map(response.data.map(task => [ task.user, task ])).values()];
    setAllTasks(usersWithTasks.reverse());
    return;
  }

  const handleEditTaskBtnClick = (currentData) => {
    setEditTaskActive(true);
    setCurrentTaskToEdit(currentData);
    setShowAddTaskModal(true);
  }

  const goToJobDetails = (jobData, candidateData) => navigate("/home/job", { state: { job: jobData, appliedCandidates: candidateData } });

  const goToJobApplicationDetails = (candidateData) => navigate(`/home/job/${candidateData[mutableNewApplicationStateNames.applicant]}`, { state: { candidate: candidateData } });

  useEffect(() => {

    if ( (sub_section !== undefined) && (!location.state) ) return navigate("/home");

    if ( (path !== undefined) && (!location.state)) return navigate("/home");

  }, [sub_section, path])

  useEffect(() => {

    getJobApplications();
    getJobs();
    getProjects();
    getTasks();
    setLoading(false);

  }, [])

  useEffect(() => {
    
    if (jobSearchInput.length < 1) return setSearchActive(false);
    
    setSearchActive(true);
    setMatchedJobs(jobs.filter(job => job.skills.toLocaleLowerCase().includes(jobSearchInput.toLocaleLowerCase()) || job.title.toLocaleLowerCase().includes(jobSearchInput.toLocaleLowerCase())));

  }, [jobSearchInput])

  useEffect(() => {
        
    const foundCandidate = hiredCandidates.find(data => data.applicant === currentTeamMember);
    
    if (!foundCandidate) return;

    const candidateProject = foundCandidate.others[mutableNewApplicationStateNames.assigned_project];
    setCurrentCandidateProject(candidateProject);
    
  }, [currentTeamMember])

  useEffect(() => {

    setShowCurrentCandidateTask(false);
    
  }, [location])

  useEffect(() => {

    if (!currentSortOption) return;

    const categories = {};
    const newArray = [];
    const tasksWithProjectAdded = allTasks.map(task => ( {...task, [mutableNewApplicationStateNames.assigned_project]: hiredCandidates.find(data => data.applicant === task.user) && hiredCandidates.find(data => data.applicant === task.user).others[mutableNewApplicationStateNames.assigned_project] }));

    const getCategoryArray = (propertyName, date) => {

      tasksWithProjectAdded.forEach(task => {
        if (date) {

          if (categories.hasOwnProperty(new Date(task[`${propertyName}`]).toDateString())) return

          categories[`${new Date(task[propertyName]).toDateString()}`] = new Date(task[`${propertyName}`]).toDateString();
          return

        }

        if (!categories.hasOwnProperty(task[`${propertyName}`])){
          categories[`${task[propertyName]}`] = task[`${propertyName}`]
        }
      })

      let categoryObj = {};

      Object.keys(categories || {}).forEach(key => {

        if (key === "undefined") return;
        
        if (date) {
          const matchingTasks = tasksWithProjectAdded.filter(task => new Date(task[`${propertyName}`]).toDateString() === key);
          categoryObj.name = key;
          categoryObj.data = matchingTasks;
          newArray.push(categoryObj);
          categoryObj = {};    
          return
        }
        
        const matchingTasks = tasksWithProjectAdded.filter(task => task[`${propertyName}`] === key);
        categoryObj.name = key;
        categoryObj.data = matchingTasks;
        newArray.push(categoryObj);
        categoryObj = {};
      })

      return newArray;
    }

    switch (currentSortOption) {
      case "project":
        const projectCategoryData = getCategoryArray(mutableNewApplicationStateNames.assigned_project);
        setSortResults(projectCategoryData);
        break;
      case "date":
        const dateCategoryData = getCategoryArray("updated", true);
        setSortResults(dateCategoryData.sort((a, b) => new Date(b.name) - new Date(a.name)));
        break;
      default:
        setSortResults([]);
        break;
    }

  }, [currentSortOption])

  return (
    <>
    {
      sub_section === undefined && section === "home" || section === undefined ? <>
        <div className='hr__wrapper'>
          <NavigationBar 
            title={'Jobs'} 
            className={'hr_navigation'} 
            handleMenuIconClick={() => setSideNavbarActive(true)}
          />
          <div className='search'>
            <Search searchValue={jobSearchInput} updateSearchValue={setJobSearchInput} />
          </div>

          {
            isLoading ? <LoadingSpinner /> :

            <div className='job__wrapper'>
              {
                searchActive ? matchedJobs.length === 0 ? <>No jobs found matching your query</> :
                
                React.Children.toArray(matchedJobs.map(job => {
                  return <>
                    <JobTile jobData={job} routeToJob={true} handleJobTileClick={() => goToJobDetails(job, appliedJobs.filter(application => application.job === job.id))} candidateForJobCount={appliedJobs.filter(application => application.job === job.id).length} />
                  </>
                })) :

                React.Children.toArray(jobs.map(job => {
                  return <>
                    <JobTile jobData={job} routeToJob={true} handleJobTileClick={() => goToJobDetails(job, appliedJobs.filter(application => application.job === job.id))} candidateForJobCount={appliedJobs.filter(application => application.job === job.id).length} />
                  </>
                }))
              }
            </div>

          }
          
        </div>
      </> :
      
      <>
        <NavigationBar
          handleMenuIconClick={() => setSideNavbarActive(true)}
          className={'hr_navigation'}
          title={section === "shortlisted" ? "Shortlisted" : section === "user" ? "User" : ""}
          changeToBackIcon={sub_section !== undefined ? true : section === "tasks" && showCurrentCandidateTask ? true : section === "attendance" && showCurrentCandidateAttendance ? true : false}
          handleBackIconClick={section === "tasks" && showCurrentCandidateTask ? () => setShowCurrentCandidateTask(false) : section === "attendance" && showCurrentCandidateAttendance ? () => setShowCurrentCandidateAttendance(false) : () => navigate(-1)}
        />
        
        { 

          sub_section === undefined && section === "shortlisted" ? <>
            <ShortlistedScreen shortlistedCandidates={candidateData} jobData={jobs} />
          </> :

          sub_section === undefined && section === "attendance" ? 

          isLoading ? <LoadingSpinner /> :

          showCurrentCandidateAttendance ? <AttendanceScreen className="hr__Page" currentUser={currentTeamMember} assignedProject={currentCandidateProject} /> :
          
          <>

            <SelectedCandidates 
              showTasks={true} 
              sortActive={currentSortOption ? true : false}
              tasksCount={currentSortOption ? sortResults.length : allTasks.length}
              className={"hr__Page"}
              title={"Attendance"}
              hrAttendancePageActive={true}
              handleSortOptionClick={(data) => setCurrentSortOption(data)}
            />

            {
              currentSortOption ?

              <>
                {
                  sortResults.length === 0 ? <p className='sort__Title__Item'> No tasks found matching '{currentSortOption}' sort selection </p>  :
                  
                  <>
                    {
                      React.Children.toArray(sortResults.map(result => {
                        return <>
                          <p className='sort__Title__Item'><b>{result.name}</b></p>
                          <>
                            <div className="tasks-container hr__Page sort__Active">
                              {
                                React.Children.toArray(result.data.map(dataitem => {
                                  return <JobTile showTask={true} setShowCandidateTask={setShowCurrentCandidateAttendance} taskData={dataitem} handleJobTileClick={setCurrentTeamMember} />
                                }))
                              }
                            </div>
                          </>
                        </>
                      }))
                    }
                    <div className='sort__Margin__Bottom'></div>
                  </>
                }
              </> :

              <>
                <div className="tasks-container hr__Page">
                  {
                    React.Children.toArray(allTasks.map(dataitem => {
                      return <JobTile showTask={true} setShowCandidateTask={setShowCurrentCandidateAttendance} taskData={dataitem} handleJobTileClick={setCurrentTeamMember} />
                    }))
                  }
                </div>
              </>
            }
          </>
          :

          sub_section === undefined && section === "tasks" ? 

          isLoading ? <LoadingSpinner /> :

          <>
            {
              showAddTaskModal && <>
                <AddTaskScreen closeTaskScreen={() => setShowAddTaskModal(false)} teamMembers={hiredCandidates} updateTasks={setAllTasks} editPage={editTaskActive} setEditPage={setEditTaskActive} taskToEdit={currentTaskToEdit} hrPageActive={true} />
              </>
            }

            {
              showCurrentCandidateTask ? <TaskScreen className="hr__Page" currentUser={currentTeamMember} handleAddTaskBtnClick={() => setShowAddTaskModal(true)} handleEditBtnClick={handleEditTaskBtnClick} assignedProject={currentCandidateProject} /> :
          
              <>

                <SelectedCandidates 
                  showTasks={true} 
                  sortActive={currentSortOption ? true : false}
                  tasksCount={currentSortOption ? sortResults.length : allTasks.length}
                  className={"hr__Page"}
                  handleSortOptionClick={(data) => setCurrentSortOption(data)}
                />

                {
                  currentSortOption ?

                  <>
                    {
                      sortResults.length === 0 ? <p className='sort__Title__Item'> No tasks found matching '{currentSortOption}' sort selection </p>  :
                      
                      <>
                        {
                          React.Children.toArray(sortResults.map(result => {
                            return <>
                              <p className='sort__Title__Item'><b>{result.name}</b></p>
                              <>
                                <div className="tasks-container hr__Page sort__Active">
                                  {
                                    React.Children.toArray(result.data.map(dataitem => {
                                      return <JobTile showTask={true} setShowCandidateTask={setShowCurrentCandidateTask} taskData={dataitem} handleJobTileClick={setCurrentTeamMember} />
                                    }))
                                  }
                                  
                                  <Button text={"Add Task"} icon={<AddCircleOutlineIcon />} handleClick={() => setShowAddTaskModal(true)} />
                                </div>
                              </>
                            </>
                          }))
                        }
                        <div className='sort__Margin__Bottom'></div>
                      </>
                    }
                  </> :

                  <>
                    <div className="tasks-container hr__Page">
                      {
                        React.Children.toArray(allTasks.map(dataitem => {
                          return <JobTile showTask={true} setShowCandidateTask={setShowCurrentCandidateTask} taskData={dataitem} handleJobTileClick={setCurrentTeamMember} />
                        }))
                      }
                      <Button text={"Add Task"} icon={<AddCircleOutlineIcon />} handleClick={() => setShowAddTaskModal(true)} />
                    </div>
                  </>
                }
              </>
            }
          </>
          
          :

          sub_section === undefined && section === "user" ? <UserScreen currentUser={currentUser} /> :

          sub_section === undefined &&
          <><ErrorPage disableNav={true} /></>

        }
      
      </>
    }

    {
      path === undefined && sub_section === "job" ? 
      
      <>
      
        <div className='hr__wrapper'>
          <SelectedCandidates title={location.state.job.title} candidatesCount={location.state.appliedCandidates.length} hrPageActive={true} />

          {
            <div className='hr__Job__Tile__Container'>
              {
                React.Children.toArray(location.state.appliedCandidates.map(candidate => {
                  return <JobTile hrPageActive={true} jobsSkills={location.state.job.skills} candidateData={candidate} setShowCandidate={() => {}} handleJobTileClick={goToJobApplicationDetails} />
                }))
              }
            </div>
          }
        </div>
        
      </> : 
      
      path !== undefined && sub_section === "job" ? <>
        {
          <div className='hr__Job__Tile__Container'>
            <>
              <SelectedCandidatesScreen
                hrPageActive={true}
                selectedCandidateData={location.state.candidate}
                updateCandidateData={setCandidateData}
                updateAppliedData={setAppliedJobs}
              />
            </>
          </div>
        }
      </> :

      path !== undefined && sub_section === "after_initial_meet" ? <>
        {
          <div className='hr__Job__Tile__Container'>
            <>
              <SelectedCandidatesScreen
                hrPageActive={true}
                initialMeet={true}
                selectedCandidateData={location.state.candidate}
                updateCandidateData={setCandidateData}
                availableProjects={currentProjects}
              />
            </>
          </div>
        }
      </> :

      <></>
    }

    {
      sideNavbarActive && 
      <SideNavigationBar 
        className={'hr_side_navigation'}
        sideNavRef={sideNavbarRef} 
        closeSideNavbar={() => setSideNavbarActive(false)}
        isNotificationEnabled={isNotificationEnabled}
        setNotificationStatus={() => setNotificationStatus(prevValue => { return !prevValue })}
        hrPageActive={true}
      />
    }

    <BottomNavigationBar links={hrNavigationLinks} />

    </>
  )
}

export default Hr_JobScreen