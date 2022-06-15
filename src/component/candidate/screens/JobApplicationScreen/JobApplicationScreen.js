import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import { GrLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { myAxiosInstance } from "../../../../axios";
import { countriesData } from "./countriesData";
import { AiOutlineDown } from "react-icons/ai";
import { freelancingPlatforms } from "./freelancingPlatforms";
import { validateUrl } from "../../../../helpers/helpers";

import "./style.css";


const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const [jobDescription, setJobDescription] = useState("");
    const [disableApplyBtn, setDisableApplyBtn] = useState(true);
    
    const getCurrentApplicant = async () => {
        const response = await myAxiosInstance.get("/accounts/user_view/");
        return response;
    }

    useEffect(() => {

        if (!location.state) return navigate("/home")
        
        setCurrentJob(location.state.jobToApplyTo);

    }, [])

    useEffect(() => {
        if ( jobDescription.length < 1 ) return setDisableApplyBtn(true);

        setDisableApplyBtn(false);

    }, [jobDescription])


    const handleSubmitApplicationBtnClick = async () => {

        setDisableApplyBtn(true);

        // await myAxiosInstance.post("/jobs/add_application/", jobState);

        // navigate("/applied");

    }

    return <>
        <Navbar changeToBackButton={true} backButtonLink={'/home'} />
            <div className="container-wrapper candidate__Job__Application__Container">
                <h1><b>{ currentJob.title }</b></h1>
                <p>Dowell Ux living lab</p>
                <CustomHr className={'relative-hr'} />
                <div className="job__Skills__Info">
                    <span>
                        Skills: { currentJob.skills }
                    </span>
                    <span>
                        <BusinessCenterIcon className="small-icon" />
                        0-1 Yr
                    </span>
                    <span>
                        <BsPeople />
                        1 opening
                    </span>
                    <span>
                        <GrLocation />
                        Remote
                    </span>
                </div>

                <h2><b>Job Description</b></h2>

                <textarea placeholder="What you'll do" value={jobDescription} onChange={ (e) => setJobDescription(e.target.value) } rows={10}></textarea>
                

                <button className="apply-btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>Apply</button>
            </div>
        <Footer />
    </>
}

export default JobApplicationScreen;
