import React, { useEffect, useState } from "react";
import { myAxiosInstance } from "../../lib/axios";
import { useCandidateContext, initialCandidatesDataStateNames } from "../../contexts/CandidatesContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { candidateDataReducerActions } from "../../reducers/CandidateDataReducer";
import ErrorPage from "../error/ErrorPage";
import SelectedCandidates from "../teamlead/components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import RejectedCandidates from "./components/RejectedCandidates/RejectedCandidates";
import { routes } from "../../lib/routes";
import { candidateStatuses } from "../candidate/utils/candidateStatuses";
import UserScreen from "./screens/UserScreen/UserScreen";
import { useLocation, useNavigate } from "react-router-dom";
import StaffJobLandingLayout from "../../layouts/StaffJobLandingLayout/StaffJobLandingLayout";
import TitleNavigationBar from "../../components/TitleNavigationBar/TitleNavigationBar";
import TogglerNavMenuBar from "../../components/TogglerNavMenuBar/TogglerNavMenuBar";
import JobCard from "../../components/JobCard/JobCard";
import { useMediaQuery } from "@mui/material";
import { BsPersonCheck, BsPersonPlus, BsPersonX } from "react-icons/bs";
import { AiOutlineRedo } from "react-icons/ai";

const AccountPage = ({ currentUser }) => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const { candidatesData, dispatchToCandidatesData } = useCandidateContext();
    const [currentCandidate, setCurrentCandidate] = useState({});
    const [ showCandidate, setShowCandidate ] = useState(false);
    const [ rehireTabActive, setRehireTabActive ] = useState(false);
    const [ hireTabActive, setHireTabActive ] = useState(false);
    const [ showOnboarding, setShowOnboarding ] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showApplicationDetails, setShowApplicationDetails] = useState(false);
    const location = useLocation();
    const [ currentActiveItem, setCurrentActiveItem ] = useState("Hire");
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery("(min-width: 992px)");

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
            setCurrentActiveItem("Rehire");
            return
        }

        if (currentTab === "onboarding") { 
            setShowOnboarding(true);
            setHireTabActive(false);
            setRehireTabActive(false);
            setCurrentActiveItem("Onboarding");
            return
        }

        setHireTabActive(true);
        setShowOnboarding(false);
        setRehireTabActive(false);

    }, [searchParams])

    useEffect(() => {

        setShowCandidate(false);

        const currentPath = location.pathname.split("/")[1];
        const currentTab = searchParams.get("tab");

        if (!currentPath && !currentTab) return setCurrentActiveItem("Hire");
        if (currentPath && currentPath === "rejected") return setCurrentActiveItem("Reject")

    }, [location])

    const handleMenuItemClick = (item) => {
        typeof item === "object" ? setCurrentActiveItem(item.text) : setCurrentActiveItem(item);
        
        if (item === "Reject") return navigate("/rejected")
        
        const passedItemInLowercase = typeof item === "object" ? item.text.toLocaleLowerCase(): item.toLocaleLowerCase();
        return navigate(`/?tab=${passedItemInLowercase}`);
    }

    const handleBackBtnClick = () => {
        setShowCandidate(false);
    }

    const handleViewBtnClick = (passedData) => {
        setShowCandidate(true);
        setCurrentCandidate(passedData);
    }

    return <>
        <StaffJobLandingLayout accountView={true}>
        <TitleNavigationBar title={showCandidate ? "Application Details" : section === "user" ? "Profile" : "Applications"} hideBackBtn={!showCandidate ? true : false} handleBackBtnClick={handleBackBtnClick} />
        { section !== "user" && !showCandidate && <TogglerNavMenuBar menuItems={isLargeScreen ? ["Hire", "Onboarding", "Rehire", "Reject"] : [{icon: <BsPersonPlus />, text: "Hire"}, {icon: <BsPersonCheck />, text: "Onboarding"}, {icon: <AiOutlineRedo />, text: "Rehire"}, {icon: <BsPersonX />, text: "Reject"}]} currentActiveItem={currentActiveItem} handleMenuItemClick={handleMenuItemClick} /> }
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
                showApplicationDetails={true}
                handleViewApplicationBtnClick={() => setShowApplicationDetails(!showApplicationDetails)}
            /> 
            
            : <>
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
                            return <JobCard
                                buttonText={"View"}
                                candidateCardView={true}
                                candidateData={dataitem}
                                jobAppliedFor={jobs.find(job => job.id === dataitem.job) ? jobs.find(job => job.id === dataitem.job).title : ""}
                                handleBtnClick={handleViewBtnClick}
                            />
                        })) : 
                        
                        showOnboarding ? 

                        React.Children.toArray(candidatesData.onboardingCandidates.map(dataitem => {
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

            section === "rejected" ? <>
                <RejectedCandidates candidatesCount={candidatesData.rejectedCandidates.length} />

                <div className="jobs-container">
                    {
                        React.Children.toArray(candidatesData.rejectedCandidates.map(dataitem => {
                            return <JobCard
                                buttonText={"View"}
                                candidateCardView={true}
                                candidateData={dataitem}
                                jobAppliedFor={jobs.find(job => job.id === dataitem.job) ? jobs.find(job => job.id === dataitem.job).title : ""}
                                handleBtnClick={handleViewBtnClick}
                            />
                        }))
                    }
                </div>
            </> : 
            
            section === "user" ? <UserScreen currentUser={currentUser} /> : <>
                <ErrorPage disableNav={true} />
            </>

        }
        </StaffJobLandingLayout>
    </>
}

export default AccountPage;
