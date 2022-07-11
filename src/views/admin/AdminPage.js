import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAxiosInstance } from "../../axios";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { routes } from "../../request";
import SideNavigationBar from "../account/components/SideNavigationBar/SideNavigationBar";
import BottomNavigationBar from "../Hr/component/BottomNavigation/BottomNavigation";
import Search from "../Hr/component/Search/Search";
import JobTile from "../teamlead/components/JobTile/JobTile";
import NavigationBar from "../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "./adminNavigationLinks";
import Button from "./components/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

import "./style.css";


const AdminPage = () => {
    const { isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const sideNavbarRef = useRef(null);

    useEffect(() => {

        const getJobsData = async () => {
        
            try{
            
                const response = await myAxiosInstance.get(routes.Jobs);
                setJobs(response.data);
                return;
    
            }catch (err){
                console.log(err)
                return;
            }

        }

        getJobsData();

    }, [])

    const goToEditPage = (jobData) => navigate("/edit-job", { state: { job: jobData }});
    const goToJobDetails = (jobData) => navigate("/view-job", { state: { job: jobData }});
    const goToAddPage = () => navigate("/add-job");
    
    return <>
        <div className="admin__Page__Container">
            <NavigationBar title={'Jobs'} handleMenuIconClick={() => setSideNavbarActive(true)} />
            <Search />
            <div className="admin__Jobs__Container">
               {
                    React.Children.toArray(jobs.map(job => {
                        return <JobTile adminPageActive={true} jobData={job} routeToJob={true} handleJobTileClick={goToJobDetails} handleEditIconClick={goToEditPage} />
                    }))
               } 
            </div>
            <Button 
                handleClick={goToAddPage} 
                icon={<AiOutlinePlus />}
                text={"Add"}
            />
        </div>
        
        {
            isSideNavbarActive &&
            <SideNavigationBar
                sideNavRef={sideNavbarRef}
                closeSideNavbar={() => setSideNavbarActive(false)}
                isNotificationEnabled={isNotificationEnabled}
                setNotificationStatus={() => setNotificationStatus(prevValue => { return !prevValue })}
            />
        }

        <BottomNavigationBar links={adminNavigationLinks} />
    </>
}

export default AdminPage;
