import { useNavigate } from "react-router-dom";
import ApplicantDetails from "../../../teamlead/components/ApplicationDetails/ApplicationDetails";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

import "./style.css";


const ViewAppliedJobScreen = ( { job, applicationDetails }) => {
    
    const navigate = useNavigate();

    return <>

        <div className="view__Applied__Jobs__Container">
            <NavigationBar changeToBackIcon={true} handleBackIconClick={() => navigate(-1)} />
            <div className="view__Job__Details">
                <h2><b>{job.title}</b></h2>
                <ApplicantDetails candidateApplicationPageActive={true} applicantData={applicationDetails} />
            </div>
        </div>
        <Footer />
    </>
}

export default ViewAppliedJobScreen;

