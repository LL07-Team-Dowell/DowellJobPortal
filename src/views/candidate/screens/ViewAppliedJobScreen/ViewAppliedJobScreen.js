import { useNavigate } from "react-router-dom";
import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";
import Footer from "../../Footer";

import "./style.css";


const ViewAppliedJobScreen = ( { job }) => {
    
    const navigate = useNavigate();

    return <>

        <div className="view__Applied__Jobs__Container">
            <NavigationBar changeToBackIcon={true} handleBackIconClick={() => navigate(-1)} />
            <div className="view__Job__Details">
                <h2><b>{job.title}</b></h2>
            </div>
        </div>
        <Footer />
    </>
}

export default ViewAppliedJobScreen;

