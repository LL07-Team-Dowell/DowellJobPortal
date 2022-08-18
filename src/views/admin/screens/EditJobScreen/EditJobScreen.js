import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import { adminNavigationLinks } from "../../adminNavigationLinks";
import Button from "../../components/Button/Button";
import { AiOutlineSave } from "react-icons/ai";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import EditJobDetails from "../../components/EditJobDetails/EditJobDetails";

const EditJobScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [updatedJobDetails, setUpdatedJobDetails] = useState({
        "title": "",
        "description": "",
        "skills": "",
        "is_active": "",
        "typeof": "",
        "time_period": "",
        "general_terms": {},
        "Technical_Specifications": {},
        "Payment_terms": {},
        "workflow": {},
        "others": {},
    });

    useEffect(() => {

        if ((!location.state) || (!location.state.job)) return navigate("/");
        setUpdatedJobDetails(location.state.job);

    }, [location])

    const handleSaveBtnClick = async () => {
        setDisabled(true);

        try{

            await myAxiosInstance.post(routes.Admin_Update_Job + updatedJobDetails.id + "/", updatedJobDetails);
            setDisabled(false);
            navigate("/");

        }catch (err) {

            console.log(err);
            setDisabled(false);
        }
    }

    return <>
        <div className="admin__Page__Container">
            <NavigationBar changeToBackIcon={true} handleBackIconClick={() => navigate(-1)} />
            <EditJobDetails currentJob={updatedJobDetails} currentJobState={location.state && location.state.job} updateJobDetails={setUpdatedJobDetails} />
            <Button 
                handleClick={handleSaveBtnClick}
                icon={<AiOutlineSave />}
                text={"Save"}
                isDisabled={disabled}
            />
        </div>

        <BottomNavigationBar links={adminNavigationLinks} />
    </>
}

export default EditJobScreen;
