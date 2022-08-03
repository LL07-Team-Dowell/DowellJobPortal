import React, { useEffect, useRef, useState } from "react";
import { myAxiosInstance } from "../../lib/axios";
import { useCandidateContext, initialCandidatesDataStateNames } from "../../contexts/CandidatesContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { candidateDataReducerActions } from "../../reducers/CandidateDataReducer";
import ErrorPage from "../error/ErrorPage";
import BottomNavigationBar from "../teamlead/components/BottomNavigationBar/BottomNavigationBar";
import JobTile from "../teamlead/components/JobTile/JobTile";
import NavigationBar from "../teamlead/components/NavigationBar/NavigationBar";
import NavigationItemSelection from "../teamlead/components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "../teamlead/components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import RejectedCandidates from "./components/RejectedCandidates/RejectedCandidates";
import SideNavigationBar from "./components/SideNavigationBar/SideNavigationBar";
import useClickOutside from "../../hooks/useClickOutside";
import { routes } from "../../lib/routes";
import { candidateStatuses } from "../candidate/utils/candidateStatuses";
import UserScreen from "./screens/UserScreen/UserScreen";

const AccountPage = ({ currentUser }) => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const { candidatesData, dispatchToCandidatesData } = useCandidateContext();
    const [currentCandidate, setCurrentCandidate] = useState({});
    const [ showCandidate, setShowCandidate ] = useState(false);
    const [ rehireTabActive, setRehireTabActive ] = useState(false);
    const [ hireTabActive, setHireTabActive ] = useState(false);
    const [ showOnboarding, setShowOnboarding ] = useState(false);
    const [ isSideNavbarActive, setSideNavbarActive ] = useState(false);
    const sideNavbarRef = useRef(null);
    const [jobs, setJobs] = useState([]);
    const [showApplicationDetails, setShowApplicationDetails] = useState(false);

    useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

    async function getAccount (){
        const response = await myAxiosInstance.get(routes.Accounts_View);
        return response
    }

    async function getApplications () {
        const response = await myAxiosInstance.get(routes.Applications);
        const candidatesToHire = response.data.filter(application => application.status === candidateStatuses.TEAMLEAD_HIRE);
        const candidatesToRehire = response.data.filter(application => application.status === candidateStatuses.TO_REHIRE || application.status === candidateStatuses.TEAMLEAD_TOREHIRE);
        const candidatesOnboarding = response.data.filter(application => application.status === candidateStatuses.ONBOARDING);
        const candidatesRejected = response.data.filter(application => application.status === candidateStatuses.REJECTED);

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_CANDIDATES_TO_HIRE, payload: {
            stateToChange: initialCandidatesDataStateNames.candidatesToHire,
            value: candidatesToHire,
        }});
        
        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
            value: candidatesToRehire,
        }});
        
        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
            value: candidatesOnboarding,
        }});

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_REJECTED_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.rejectedCandidates,
            value: candidatesRejected,
        }});

        return
    }

    const getJobs = async () => {
        const response = await myAxiosInstance.get(routes.Jobs);
        setJobs(response.data)
        return
    }
    
    useEffect(() => {
        
        getAccount();
        getJobs();
        getApplications();
        
    }, [])

    useEffect(() => {
        const currentTab = searchParams.get("tab");
        
        if (currentTab === "rehire") {
            setRehireTabActive(true);
            setHireTabActive(false);
            setShowOnboarding(false);
            return
        }

        if (currentTab === "onboarding") { 
            setShowOnboarding(true);
            setHireTabActive(false);
            setRehireTabActive(false);
            return
        }

        setHireTabActive(true);
        setShowOnboarding(false);
        setRehireTabActive(false);

    }, [searchParams])

    return <>
        <NavigationBar 
            showCandidate={showCandidate} 
            setShowCandidate={setShowCandidate} 
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
                accountPage={true} 
                rehireTabActive={rehireTabActive} 
                hireTabActive={hireTabActive} 
                showOnboarding={showOnboarding} 
                updateCandidateData={dispatchToCandidatesData}
                allCandidatesData={
                    hireTabActive ? candidatesData.candidatesToHire :
                    showOnboarding ? candidatesData.onboardingCandidates :
                    rehireTabActive ? candidatesData.candidatesToRehire :
                    []
                }
                jobTitle={jobs.filter(job => job.id === currentCandidate.job).length >=1 ? jobs.filter(job => job.id === currentCandidate.job)[0].title : ""}
                showApplicationDetails={showApplicationDetails}
                handleViewApplicationBtnClick={() => setShowApplicationDetails(!showApplicationDetails)}
            /> 
            
            : <>
                <NavigationItemSelection items={["Hire", "Onboarding", "Rehire"]} searchParams={searchParams} />
                <SelectedCandidates 
                    candidatesCount={
                        hireTabActive ? candidatesData.candidatesToHire.length :
                        showOnboarding ? candidatesData.onboardingCandidates.length :
                        rehireTabActive ? candidatesData.candidatesToRehire.length :
                        0
                    } 
                />

                <div className="jobs-container">
                    {
                        hireTabActive ?
                        React.Children.toArray(candidatesData.candidatesToHire.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} candidateData={dataitem} handleJobTileClick={setCurrentCandidate} jobTitle={jobs.filter(job => job.id === dataitem.job).length >=1 ? jobs.filter(job => job.id === dataitem.job)[0].title : ""} />
                        })) : 
                        
                        showOnboarding ? 

                        React.Children.toArray(candidatesData.onboardingCandidates.map(dataitem => {
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

            section === "rejected" ? <>
                <RejectedCandidates candidatesCount={candidatesData.rejectedCandidates.length} />

                <div className="jobs-container">
                    {
                        React.Children.toArray(candidatesData.rejectedCandidates.map(dataitem => {
                            return  <JobTile disableClick={true} candidateData={dataitem} jobTitle={jobs.filter(job => job.id === dataitem.job).length >=1 ? jobs.filter(job => job.id === dataitem.job)[0].title : ""} />
                        }))
                    }
                </div>
            </> : 
            
            section === "user" ? <UserScreen currentUser={currentUser} /> : <>
                <ErrorPage disableNav={true} />
            </>

        }

        <BottomNavigationBar
            updateNav={showCandidate ? setShowCandidate : () => {} }
            currentPage={'account'}
            firstLink={'home'}
            secondLink={'rejected'}
            thirdLink={'user'}
            changeSecondIcon={true}
         />
    </>
}

export default AccountPage;
