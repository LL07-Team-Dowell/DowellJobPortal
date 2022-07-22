import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "../../adminNavigationLinks";
import Button from "../../components/Button/Button";
import JobDetails from "../../components/JobDetails/JobDetails";

const ViewJobScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    
    useEffect(() => {

        if (!location.state.job) return navigate("/");
        setCurrentJob(location.state.job);

    }, [])

    const handleEditBtnClick = (currentJobData) => navigate("/edit-job", { state: { job: currentJobData }});

    return <>
        <div className="admin__Page__Container">
            <NavigationBar title={currentJob.title} changeToBackIcon={true} handleBackIconClick={() => navigate(-1)} />
            <JobDetails currentJob={currentJob} />
            <Button
                handleClick={() => handleEditBtnClick(currentJob)}
                icon={<FiEdit />}
                text={"Edit"}
            />
        </div>

        <BottomNavigationBar links={adminNavigationLinks} />
    </>
}

export default ViewJobScreen;
