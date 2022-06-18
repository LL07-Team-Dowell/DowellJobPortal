import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import { BsPeople } from "react-icons/bs";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { myAxiosInstance } from "../../../../axios";
import { countriesData } from "./countriesData";
import { AiOutlineDown } from "react-icons/ai";
import { freelancingPlatforms } from "./freelancingPlatforms";
import { validateUrl } from "../../../../helpers/helpers";
import { qualificationsData } from "./jobFormData";
import { mutableNewApplicationStateNames, useNewApplicationContext } from "../../../../contexts/NewApplicationContext";
import { newJobApplicationDataReducerActions } from "../../../../reducers/NewJobApplicationDataReducer";

import "./style.css";
import { initialAppliedJobsStateNames, useAppliedJobsContext } from "../../../../contexts/AppliedJobsContext";
import { appliedJobsReducerActions } from "../../../../reducers/AppliedJobsReducer";


const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const { newApplicationData, dispatchToNewApplicationData } = useNewApplicationContext();
    const [disableApplyBtn, setDisableApplyBtn] = useState(true);
    const { section } = useParams();
    const selectCountryOptionRef = useRef(null);
    const qualificationSelectionRef = useRef(null);
    const freelancePlatformRef = useRef(null);
    const [disableNextBtn, setDisableNextBtn] = useState(true);
    const generalTermsSelectionsRef = useRef([]);
    const [labelClicked, setLabelClicked] = useState(false);
    const [showQualificationInput, setShowQualificationInput] = useState(false);
    const technicalTermsSelectionsRef = useRef([]);
    const paymentTermsSelectionsRef = useRef([]);
    const workflowTermsSelectionsRef = useRef([]);
    const { appliedJobsState, dispatchToAppliedJobsState } = useAppliedJobsContext();
    
    const [formPage, setFormPage] = useState(1);

    const addToRefsArray = (elem, arrayToAddTo) => {
        if (elem && !arrayToAddTo.current.includes(elem)) arrayToAddTo.current.push(elem)
    }

    useEffect(() => {

        if (!location.state) return navigate("/home")
        
        setCurrentJob(location.state.jobToApplyTo);

    }, [])

    useEffect(() => {
        if ( newApplicationData.others.jobDescription.length < 1 ) return setDisableApplyBtn(true);

        setDisableApplyBtn(false);

    }, [newApplicationData.others.jobDescription])

    useEffect(() => {   

        Object.keys(currentJob.others || {}).forEach(item => {
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_OTHERS, payload: { stateToChange: item, value: item }})
        })

        if (formPage === 1) {

            if (generalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }

        if (formPage === 2) {

            if (technicalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 3) {

            if (paymentTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 4) {

            if (workflowTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 5) {

            if (selectCountryOptionRef.current.value === "default_") return setDisableNextBtn(true);
            
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_COUNTRY, payload:{ stateToChange: mutableNewApplicationStateNames.country, value: selectCountryOptionRef.current.value }})
            
            if (newApplicationData.country !== "") return setDisableNextBtn(false);

        }
        if (formPage === 6) {

            if ((freelancePlatformRef.current.value === "default_") || (newApplicationData.freelancePlatformUrl.length < 1) ) return setDisableNextBtn(true);
            
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM, payload:{ stateToChange: mutableNewApplicationStateNames.freelancePlatform, value: freelancePlatformRef.current.value }})
            
            if ( !validateUrl(newApplicationData.freelancePlatformUrl, true)) return setDisableNextBtn(true);
            
            return setDisableNextBtn(false);

        }
        if (formPage === 7) {

            if (qualificationSelectionRef.current.value === "default_") return setDisableNextBtn(true);
            
            setShowQualificationInput(true);
            
            if (newApplicationData.others[mutableNewApplicationStateNames.others_property_qualifications].length > 0) return setDisableNextBtn(false);

            return setDisableNextBtn(true);
            
        }
        if (formPage === 8) {

            if ( !newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll] ) {
                
                dispatchToAppliedJobsState({ type: appliedJobsReducerActions.UPDATE_APPLIED_JOBS, payload: { removeFromExisting: true, stateToChange: initialAppliedJobsStateNames.appliedJobs, value: currentJob }})
            
                return setDisableNextBtn(true);
            }
                

            dispatchToAppliedJobsState({ type: appliedJobsReducerActions.UPDATE_APPLIED_JOBS, payload: { updateExisting: true, stateToChange: initialAppliedJobsStateNames.appliedJobs, value: currentJob }})
            
            return setDisableNextBtn(false);

        }

        return setDisableNextBtn(true);

    }, [
        formPage, 
        labelClicked, 
        newApplicationData.country, 
        newApplicationData.freelancePlatformUrl, 
        newApplicationData.others[mutableNewApplicationStateNames.others_property_qualifications], 
        newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll]
        ]
    )


    const handleSubmitApplicationBtnClick = () => {

        setDisableApplyBtn(true);
        setDisableNextBtn(true);

        navigate("/apply/job/form", { state: { jobToApplyTo: currentJob }});

    }

    const handleSubmitNewApplication = async (e) => {
        e.preventDefault();

        setDisableNextBtn(true);

        await myAxiosInstance.post("/jobs/add_application/", newApplicationData);

        navigate("/applied");
    }

    const createCheckBoxData = (data, arrayRef) => {
        
        return (
            <label onClick={() => setLabelClicked(!labelClicked)}>
                <input type={'checkbox'} ref={elem => addToRefsArray(elem, arrayRef)} />
                <span>{data}</span>
            </label>
        )

    }

    const createInputData = (data) => {

        return (
            <>
                <h2><b>{data}</b></h2>
                <label className="text__Container">
                    <input type={'text'} placeholder={data}/>
                </label>
            </>
        )
    }

    return <>
        <Navbar changeToBackButton={true} backButtonLink={'/home'} />
            <div className="container-wrapper candidate__Job__Application__Container">

                {
                    section === "form" ? <>
                        <h1><b>Job Application Form for {currentJob.title}</b></h1>

                        <form onSubmit={handleSubmitNewApplication}>
                            {
                                
                                formPage === 1 && <>

                                    <h2><b>General Terms and Conditions</b></h2>
                                    <p>Tick each box to continue</p>
                                    <p>Thank you for applying to freelancing opportunity in uxlivinglab. Read following terms and conditions and accept</p>
                                    
                                    {React.Children.toArray(Object.keys(currentJob.general_terms || {}).map((key) => createCheckBoxData(currentJob.general_terms[key], generalTermsSelectionsRef)))}
                                
                                </>
                            }

                            {
                                formPage === 2 && <>
                                
                                    <h2><b>Technical Specifications</b></h2>
                                    <p>Tick each box to approve</p>
                                    <p>Thank you for accepting terms and conditions. Read following technical specifications and accept</p>
                                    {React.Children.toArray(Object.keys(currentJob.Technical_Specifications || {}).map((key) => createCheckBoxData(currentJob.Technical_Specifications[key], technicalTermsSelectionsRef)))}
                                    
                                </>
                            }

                            {
                                formPage === 3 && <>
                                
                                    <h2><b>Payment Terms</b></h2>
                                    <p></p>
                                    <p>Thank you for accepting technical specifications. Read following payment terms and accept</p>
                                    {React.Children.toArray(Object.keys(currentJob.Payment_terms || {}).map((key) => createCheckBoxData(currentJob.Payment_terms[key], paymentTermsSelectionsRef)))}
                                
                                </>
                            }

                            {

                                formPage === 4 && <>

                                    <h2><b>Workflow Terms</b></h2>
                                    <p></p>
                                    <p>Thank you for accepting payment terms. Read following work flow to proceed</p>
                                    {React.Children.toArray(Object.keys(currentJob.workflow || {}).map((key) => createCheckBoxData(currentJob.workflow[key], workflowTermsSelectionsRef)))}
                                
                                </>
                            }

                            {
                                formPage === 5 && <>

                                    <h2><b>Select Country</b></h2>
                                    <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                        <select name="country" ref={selectCountryOptionRef} defaultValue={'default_'}>
                                            <option value={'default_'} disabled>Select Option</option>
                                            {React.Children.toArray(countriesData.map(country => {
                                                return <option value={country.toLocaleLowerCase()}>{country}</option>
                                            }))}
                                        </select>
                                        <AiOutlineDown className="dropdown__Icon" />
                                    </div>
                                </>
                            }

                            {
                                formPage === 6 && <>
                                    <h2><b>Freelancing Profile</b></h2>
                                    
                                    <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                        <select name="freelancePlaform" ref={freelancePlatformRef} defaultValue={'default_'}>
                                            <option value={'default_'} disabled>Select Option</option>
                                            {React.Children.toArray(freelancingPlatforms.map(platform => {
                                                return <option value={platform.toLocaleLowerCase()}>{platform}</option>
                                            }))}
                                        </select>
                                        <AiOutlineDown className="dropdown__Icon" />
                                    </div>

                                    <label className="input__Text__Container">
                                        Link to profile on freelancing platform
                                        <input aria-label="link to profile on freelance platform" type={'text'} placeholder={'Link to profile on platform'} value={newApplicationData.freelancePlatformUrl} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM_URL, payload: { stateToChange: mutableNewApplicationStateNames.freelancePlatformUrl, value: e.target.value }})} />
                                    </label>

                                </>
                            }

                            {
                                formPage === 7 && <>

                                    <h2><b>Academic Qualifications</b></h2>
                                    <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                        <select name="qualifications" ref={qualificationSelectionRef} defaultValue={'default_'}>
                                            <option value={'default_'} disabled>Select Option</option>
                                            {React.Children.toArray(qualificationsData.map(qualification => {
                                                return <option value={qualification.toLocaleLowerCase()}>{qualification}</option>
                                            }))}
                                        </select>
                                        <AiOutlineDown className="dropdown__Icon" />
                                    </div>

                                    { 
                                        showQualificationInput && <label className="input__Text__Container">
                                            Qualification
                                            <input aria-label="your academic qualification" type={'text'} placeholder={'Academic Qualification'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_qualifications]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS, payload: { stateToChange: mutableNewApplicationStateNames.others_property_qualifications, value: e.target.value }})} />
                                        </label>
                                    }

                                </>
                            }

                            {
                                formPage === 8 && <>

                                    {React.Children.toArray(Object.keys(currentJob.others || {}).map((key) => createInputData(currentJob.others[key])))}
                                
                                    <label onClick={() => setLabelClicked(!labelClicked)}>
                                        <input type={'checkbox'} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_AGREE_TO_ALL, payload: { stateToChange: mutableNewApplicationStateNames.others_property_agreeToAll, value: e.target.checked } }) } />
                                        <span>Agree/Disagree to all terms</span>
                                    </label>
                                    
                                    <label className="input__Text__Container">
                                        Comments/Suggestions
                                        <input type={'text'} placeholder={'Any comments'} value={newApplicationData.others[mutableNewApplicationStateNames.others_comments]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_COMMENTS, payload: { stateToChange: mutableNewApplicationStateNames.others_comments, value: e.target.value } })} />
                                    </label>
                                
                                </>
                            }
    
                            {
                                
                                formPage !== 8 &&
                                <>
                                    <button type="button" disabled={disableNextBtn} onClick={() => { setFormPage(formPage + 1); } }>Next</button>
                                </>
                            }

                            {
                                formPage === 8 && <>
                                    <button type="submit" disabled={disableNextBtn} onClick={handleSubmitNewApplication}>Submit</button>
                                </>
                            }

                        </form>
                    </>:

                    <>
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
                        </div>

                        <h2><b>Job Description</b></h2>

                        <textarea placeholder="What you'll do" value={newApplicationData.jobDescription} onChange={ (e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB_DESCRIPTION, payload: { stateToChange: mutableNewApplicationStateNames.others_property_jobDescription ,value: e.target.value } }) } rows={10}></textarea>
                        

                        <button className="apply-btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>Apply</button>
                    </>
                }
                
            </div>
        <Footer />
    </>
}

export default JobApplicationScreen;
