import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavigationContext } from "../../../../contexts/NavigationContext";
import SideNavigationBar from "../../../account/components/SideNavigationBar/SideNavigationBar";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "../../adminNavigationLinks";
import Button from "../../components/Button/Button";

const ViewJobScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const sideNavbarRef = useRef(null);
    const { isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    
    useEffect(() => {

        if (!location.state) return navigate("/");

    }, [])

    const handleEditBtnClick = (currentJobData) => navigate("/edit-job", { state: { job: currentJobData }});

    return <>
        <div className="admin__Page__Container">
            <NavigationBar title={currentJob.title} handleMenuIconClick={() => setSideNavbarActive(true)} />
            <>view job</>
            <Button
                handleClick={() => handleEditBtnClick(currentJob)}
                icon={<FiEdit />}
                text={"Edit"}
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

export default ViewJobScreen;
