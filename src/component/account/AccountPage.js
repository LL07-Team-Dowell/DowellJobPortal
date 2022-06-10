import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios";
import { NavigationContext } from "../../contexts/NavigationContext";
import BottomNavigationBar from "../teamlead/components/BottomNavigationBar/BottomNavigationBar";
import JobTile from "../teamlead/components/JobTile/JobTile";
import NavigationBar from "../teamlead/components/NavigationBar/NavigationBar";
import NavigationItemSelection from "../teamlead/components/NavigationItemSelection/NavigationItemSelection";
import SelectedCandidates from "../teamlead/components/SelectedCandidates/SelectedCandidates";
import SelectedCandidatesScreen from "../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen";
import RejectedCandidates from "./components/RejectedCandidates/RejectedCandidates";
import SideNavigationBar from "./components/SideNavigationBar/SideNavigationBar";
import useClickOutside from "./hooks/useClickOutside";

const AccountPage = () => {
    const { section, searchParams, isNotificationEnabled, setNotificationStatus } = useContext(NavigationContext);
    const accountData = ["a", "a", "a", "a", "a", "a", "a", "a"];
    const [showCandidate, setShowCandidate] = useState(false);
    const [rehireTabActive, setRehireTabActive] = useState(false);
    const [hireTabActive, setHireTabActive] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const sideNavbarRef = useRef(null);

    useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

    // useEffect(() => {
    //     // axios.defaults.baseURL = "https://100055.pythonanywhere.com/api/";

    //     axiosInstance.get("/accounts/get_users/")
    // }, [])

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
            showCandidate ? <SelectedCandidatesScreen accountPage={true} rehireTabActive={rehireTabActive} hireTabActive={hireTabActive} showOnboarding={showOnboarding} /> : <>
                <NavigationItemSelection items={["Hire", "Onboarding", "Rehire"]} searchParams={searchParams} />
                <SelectedCandidates />

                <div className="jobs-container">
                    {
                        React.Children.toArray(accountData.map(dataitem => {
                            return  <JobTile setShowCandidate={setShowCandidate} />
                        }))
                    }
                </div>
            </> :

            section === "rejected" ? <>
                <RejectedCandidates />

                <div className="jobs-container">
                    {
                        React.Children.toArray(accountData.map(dataitem => {
                            return  <JobTile disableClick={true} />
                        }))
                    }
                </div>
            </> : 
            
            section === "user" ? <></> : <></>

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
