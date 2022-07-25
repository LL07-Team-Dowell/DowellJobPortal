import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAxiosInstance } from "../../lib/axios";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { routes } from "../../lib/routes";
import SideNavigationBar from "../account/components/SideNavigationBar/SideNavigationBar";
import BottomNavigationBar from "../Hr/component/BottomNavigation/BottomNavigation";
import Search from "../Hr/component/Search/Search";
import JobTile from "../teamlead/components/JobTile/JobTile";
import NavigationBar from "../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "./adminNavigationLinks";
import Button from "./components/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

import "./style.css";
import ErrorPage from "../error/ErrorPage";
import { PageUnderConstruction } from "../under_construction/ConstructionPage";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";


const AdminPage = () => {
    const { section, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const sideNavbarRef = useRef(null);
    const [ isLoading, setLoading ] = useState(true);

    const getApplications = async () => {
        try{

            const response = await myAxiosInstance.get(routes.Applications);
            setApplications(response.data);
            return;

        } catch (err) {
            console.log(err);
            return
        }
    }

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
    
    useEffect(() => {

        getApplications();
        getJobsData();
        setLoading(false);

    }, [])

    const goToEditPage = (jobData) => navigate("/edit-job", { state: { job: jobData }});
    const goToJobDetails = (jobData) => navigate("/view-job", { state: { job: jobData }});
    const goToAddPage = () => navigate("/add-job");
    
    return <>

        {
            ((section === undefined) || (section === "home")) ?
            <>
                <div className="admin__Page__Container">
                    <NavigationBar title={'Jobs'} handleMenuIconClick={() => setSideNavbarActive(true)} />
                    <Search />
                    {
                        isLoading ? <LoadingSpinner /> :

                        <div className="admin__Jobs__Container">
                        {
                            React.Children.toArray(jobs.map(job => {
                                return <JobTile adminPageActive={true} jobData={job} routeToJob={true} handleJobTileClick={() => {}} handleViewBtnClick={goToJobDetails} handleEditIconClick={goToEditPage} candidateForJobCount={applications.filter(application => application.job === job.id).length} />
                            }))
                        } 
                        </div>

                    }
                    <Button 
                        handleClick={goToAddPage} 
                        icon={<AiOutlinePlus />}
                        text={"Add"}
                    />
                </div>
                
            </> : 
            
            section === "user" ?
            <>
                <div className="admin__Page__Container">
                    <NavigationBar title={'User'} handleMenuIconClick={() => setSideNavbarActive(true)} />
                    <PageUnderConstruction />
                </div>
            </> : <ErrorPage disableNav={true} />

        }

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
