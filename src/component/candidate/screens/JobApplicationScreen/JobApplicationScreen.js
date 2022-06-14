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
import { initialNewJobDataReducer, initialNewJobState, initialNewJobStateNames, newJobStateReducerActions } from "../../../../reducers/NewJobReducer";



const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const [jobState, dispatch] = useReducer(initialNewJobDataReducer, initialNewJobState);
    const [disableApplyBtn, setDisableApplyBtn] = useState(true);
    const selectCountryOptionRef = useRef(null);
    const freelanceDropdownRef = useRef(null);

    const getCurrentApplicant = async () => {
        const response = await myAxiosInstance.get("/accounts/user_view/");
        return response;
    }

    useEffect(() => {

        if (!location.state) return navigate("/home")
        
        setCurrentJob(location.state.jobToApplyTo);

        const response = getCurrentApplicant();

        response.then(res => {

            dispatch({ type: newJobStateReducerActions.UPDATE_APPLICANT, payload: { stateToChange: initialNewJobStateNames.applicantEmail, value: res.data.email } });
            dispatch({ type: newJobStateReducerActions.UPDATE_JOB_TITLE, payload: { stateToChange: initialNewJobStateNames.jobTitle, value: location.state.jobToApplyTo.title } });
    
        }).catch(err => {
            return
        });

    }, [])

    useEffect(() => {
        if ( ( jobState.jobDescription.length < 1 ) || ( jobState.freelancePlatformUrl.length < 1) ) return setDisableApplyBtn(true);

        if ( !validateUrl(jobState.freelancePlatformUrl) ) return setDisableApplyBtn(true);

        if ( (!freelanceDropdownRef.current) || (!selectCountryOptionRef.current) ) return;

        if ( (freelanceDropdownRef.current.value == "default_") || (selectCountryOptionRef.current.value == "default_") ) return setDisableApplyBtn(true);

        dispatch({ type: newJobStateReducerActions.UPDATE_COUNTRY, payload: { stateToChange: initialNewJobStateNames.country, value: selectCountryOptionRef.current.value } });
        dispatch({ type: newJobStateReducerActions.UPDATE_FREELANCE_PLATFORM, payload: { stateToChange: initialNewJobStateNames.freelancePlatform, value: freelanceDropdownRef.current.value } });
        
        setDisableApplyBtn(false);

    }, [jobState.jobDescription, jobState.freelancePlatformUrl, freelanceDropdownRef, selectCountryOptionRef])


    const handleSubmitApplicationBtnClick = async () => {

        setDisableApplyBtn(true);

        // // TODO: to fix this
        // Object.keys(currentJob).forEach(fieldName => {
        //     const valueToPut = {}

        //     valueToPut[fieldName] = true;
            
        //     dispatch({ type: newJobStateReducerActions.UPDATE_OTHERS, payload: { 
        //             stateToChange: initialNewJobStateNames.others,
        //             value: [valueToPut] 
        //         }
        //     })
        // });

        await myAxiosInstance.post("/jobs/add_application/", jobState);

        navigate("/applied");

    }

    const handleDropdownBtnClick = (refToElement) => {
        if (!refToElement.current) return;

        refToElement.current.click();
    }

    const createObjectOptions = (object) => {
        if (typeof(object) !== "object") return

        return Object.keys(object).map((objectValue, index) => {
            return (
                <p key={objectValue+index}>
                    {object[objectValue]}
                </p>
            )
        })
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

                <textarea placeholder="What you'll do" value={jobState.jobDescription} onChange={ (e) => dispatch({ type: newJobStateReducerActions.UPDATE_JOB_DESCRIPTION, payload: { stateToChange: initialNewJobStateNames.jobDescription, value: e.target.value } }) } rows={10}></textarea>

            
                <div className="select__Dropdown__Container">
                    <h2><b>Country</b></h2>
                    <div>
                        <select name="country" ref={selectCountryOptionRef} defaultValue={'default_'}>
                            <option value={'default_'} disabled>Select Option</option>
                            {React.Children.toArray(countriesData.map(country => {
                                return <option value={country.toLocaleLowerCase()}>{country}</option>
                            }))}
                        </select>
                        <AiOutlineDown onClick={() => handleDropdownBtnClick(selectCountryOptionRef)} />
                    </div>
                </div>

                <div className="select__Dropdown__Container">
                    <h2><b>Freelancing Platform</b></h2>
                    <div>
                        <select name="freelancingPlatform" defaultValue={'default_'} ref={freelanceDropdownRef}>
                            <option value={'default_'} disabled>Select Option</option>
                            {React.Children.toArray(freelancingPlatforms.map(platform => {
                                return <option value={platform.toLocaleLowerCase()}>{platform}</option>
                            }))}
                        </select>
                        <AiOutlineDown onClick={() => handleDropdownBtnClick(freelanceDropdownRef)} />
                    </div>
                    
                </div>

                <div className="select__Dropdown__Container">
                    <h2><b>Profile Link to Freelancing Platform</b></h2>
                    <div>
                        <input placeholder="Freelancing profile link" value={jobState.freelancePlatformUrl} onChange={(e) => dispatch({ type: newJobStateReducerActions.UPDATE_FREELANCER_URL, payload: { stateToChange: initialNewJobStateNames.freelancePlatformUrl, value: e.target.value } })}></input>
                    </div>
                </div>

                
                <h2><b>General Terms</b></h2>
                {createObjectOptions(currentJob.general_terms)}
                
                <h2><b>Technical Specifications</b></h2>
                {createObjectOptions(currentJob.Technical_Specifications)}

                <h2><b>Payment Terms</b></h2>
                {createObjectOptions(currentJob.Payment_terms)}

                <h2><b>Workflow</b></h2>
                {createObjectOptions(currentJob.workflow)}

                

                <button className="apply-btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>Apply</button>
            </div>
        <Footer />
    </>
}

export default JobApplicationScreen;
