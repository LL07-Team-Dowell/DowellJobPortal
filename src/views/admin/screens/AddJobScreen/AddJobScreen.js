import { useRef, useState } from "react";
import { useNavigationContext } from "../../../../contexts/NavigationContext";
import SideNavigationBar from "../../../account/components/SideNavigationBar/SideNavigationBar";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "../../adminNavigationLinks";

const AddJobScreen = () => {
    const [isSideNavbarActive, setSideNavbarActive] = useState(false);
    const sideNavbarRef = useRef(null);
    const { isNotificationEnabled, setNotificationStatus } = useNavigationContext();
    
    return <>
        <div className="admin__Page__Container">
            <NavigationBar title={'Add Job'} handleMenuIconClick={() => setSideNavbarActive(true)} />
            <div style={{ width: "79%", margin: "4% auto"}}>Add job</div>
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

export default AddJobScreen;
