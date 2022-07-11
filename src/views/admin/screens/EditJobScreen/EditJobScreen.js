import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "../../adminNavigationLinks";

const EditJobScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        if (!location.state) return navigate("/");

    }, [])

    return <>
        <div className="admin__Page__Container">
            <NavigationBar changeToBackIcon={true} />
            <div className="admin__Edit__Jobs__Container">
               Editing job 
            </div>
        </div>

        <BottomNavigationBar links={adminNavigationLinks} />
    </>
}

export default EditJobScreen;
