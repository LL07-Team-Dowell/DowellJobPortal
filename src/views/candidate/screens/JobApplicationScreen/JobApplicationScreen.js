import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { dowellLoginUrl, myAxiosInstance } from "../../../../lib/axios";
import { AiOutlineDown } from "react-icons/ai";
import { validateUrl } from "../../../../helpers/helpers";
import { countriesData, dowellInfo, freelancingPlatforms, qualificationsData } from "../../utils/jobFormApplicationData";
import { mutableNewApplicationStateNames, useNewApplicationContext } from "../../../../contexts/NewApplicationContext";
import { newJobApplicationDataReducerActions } from "../../../../reducers/NewJobApplicationDataReducer";

import "./style.css";
import { handleShareBtnClick } from "../../utils/helperFunctions";

const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const { newApplicationData, dispatchToNewApplicationData } = useNewApplicationContext();
    const [disableApplyBtn, setDisableApplyBtn] = useState(false);
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
    const [removeFreelanceOptions, setRemoveFreelanceOptions] = useState(false);
    
    const [formPage, setFormPage] = useState(1);

    const addToRefsArray = (elem, arrayToAddTo) => {
        if (elem && !arrayToAddTo.current.includes(elem)) arrayToAddTo.current.push(elem)
    }

    useEffect(() => {

        if (!location.state) return navigate("/home");

        if (!location.state.jobToApplyTo) return navigate("/home");
        
        setCurrentJob(location.state.jobToApplyTo);

        if (!location.state.currentUser) return;

        setDisableApplyBtn(false);
        generalTermsSelectionsRef.current.splice(0, generalTermsSelectionsRef.current.length);
        technicalTermsSelectionsRef.current.splice(0, technicalTermsSelectionsRef.current.length);
        paymentTermsSelectionsRef.current.splice(0, paymentTermsSelectionsRef.current.length);
        workflowTermsSelectionsRef.current.splice(0, workflowTermsSelectionsRef.current.length);

        const currentState = { ...newApplicationData };

        if (location.state.jobToApplyTo.typeof === "Employee" || location.state.jobToApplyTo.typeof === "Internship") {

            delete currentState[mutableNewApplicationStateNames.freelancePlatform];
            delete currentState[mutableNewApplicationStateNames.freelancePlatformUrl];

            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.REWRITE_EXISTING_STATE, payload: { newState: currentState }});
        }
        
        Object.keys(location.state.jobToApplyTo.others || {}).forEach(item => {
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_OTHERS, payload: { stateToChange: item, value: "" }})
        })

        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB, payload: { stateToChange: mutableNewApplicationStateNames.job, value: location.state.jobToApplyTo.id }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_APPLICANT, payload: { stateToChange: mutableNewApplicationStateNames.applicant, value: location.state.currentUser.username }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_DATE_APPLIED, payload: { stateToChange: mutableNewApplicationStateNames.others_date_applied, value: new Date() }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB_TITLE, payload: { stateToChange: mutableNewApplicationStateNames.title, value: location.state.jobToApplyTo.title }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB_DESCRIPTION, payload: { stateToChange: mutableNewApplicationStateNames.jobDescription, value: location.state.jobToApplyTo.description }})

        if (location.state.jobToApplyTo.typeof === "Employee" || location.state.jobToApplyTo.typeof === "Internship") return setRemoveFreelanceOptions(true);

        setRemoveFreelanceOptions(false);

    }, [location]);

    useEffect(() => {

        if (formPage === 1) {

            if (generalTermsSelectionsRef.current.length === 0) return setDisableNextBtn(false);

            if (generalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }

        if (formPage === 2) {

            if (technicalTermsSelectionsRef.current.length === 0) return setDisableNextBtn(false);

            if (technicalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 3) {

            if (paymentTermsSelectionsRef.current.length === 0) return setDisableNextBtn(false);

            if (paymentTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 4) {

            if (workflowTermsSelectionsRef.current.length === 0) return setDisableNextBtn(false);

            if (workflowTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 5) {

            if (!qualificationSelectionRef.current) return;
            
            if (qualificationSelectionRef.current.value !== "default_") {
                dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS, payload: { stateToChange: mutableNewApplicationStateNames.others_property_qualification, value: qualificationSelectionRef.current.value }})
                setShowQualificationInput(true);
            }
            
            
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_COUNTRY, payload:{ stateToChange: mutableNewApplicationStateNames.country, value: selectCountryOptionRef.current.value }})
            
            if ((selectCountryOptionRef.current.value === "default_") || (newApplicationData.country.length < 1)) return setDisableNextBtn(true);
            
            !removeFreelanceOptions && dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM, payload:{ stateToChange: mutableNewApplicationStateNames.freelancePlatform, value: freelancePlatformRef.current.value }})
            
            if (!removeFreelanceOptions) {
                if ((freelancePlatformRef.current.value === "default_") || (newApplicationData.freelancePlatformUrl.length < 1) ) return setDisableNextBtn(true);
            
                if ( !validateUrl(newApplicationData.freelancePlatformUrl, true)) return setDisableNextBtn(true);    
            }
            
            if (qualificationSelectionRef.current.value === "default_") return setDisableNextBtn(true);
            
            if (newApplicationData.others[mutableNewApplicationStateNames.others_property_qualification_type].length < 1) return setDisableNextBtn(true);

            if ( !newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll] ) {
                
                return setDisableNextBtn(true);
            }

            return setDisableNextBtn(false);

        }

        return setDisableNextBtn(true);

    }, [
        formPage, 
        labelClicked, 
        newApplicationData.country, 
        newApplicationData.freelancePlatformUrl, 
        newApplicationData.others[mutableNewApplicationStateNames.others_property_qualification_type], 
        newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll],
        generalTermsSelectionsRef.current,
        technicalTermsSelectionsRef.current,
        paymentTermsSelectionsRef.current,
        workflowTermsSelectionsRef.current,
        section,
        removeFreelanceOptions,
        ]
    )


    const handleSubmitApplicationBtnClick = () => {

        if (!location.state.currentUser) return window.location.href = dowellLoginUrl;

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

    const createInputData = (key, data) => {
        return (
            <>
                <div className="job__Application__Item">
                    <h2>{data}<span className="yellow-color required-indicator">*</span></h2>
                    <label className="text__Container">
                        <input type={'text'} placeholder={data} value={newApplicationData.others[key] ? newApplicationData.others[key] : ""} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_OTHERS, payload: { stateToChange: key, value: e.target.value } })} />
                    </label>
                </div>
            </>
        )
    }

    return <>
        <Navbar changeToBackButton={true} backButtonLink={'/home'} handleShareJobBtnClick={() => handleShareBtnClick(currentJob.title, "Apply for this job on Dowell!", window.location)} />
            <div className="container-wrapper candidate__Job__Application__Container">

                {
                    section === "form" ? <>
                        <div className="job__Application__Title">
                            <h1><b>Job Application Form for {currentJob.title}</b></h1>
                            <CustomHr className={'relative-hr'} />
                            <div>
                                <span className="yellow-color">*</span>
                                <span className="yellow-color">Required</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmitNewApplication}>
                            {
                                
                                formPage === 1 && <>

                                <div className="job__Application__Items">
                                    <h2><b>General Terms and Conditions</b></h2>
                                    <p>Tick each box to continue</p>
                                    <p>Thank you for applying to freelancing opportunity in uxlivinglab. Read following terms and conditions and accept</p>
                                    {React.Children.toArray(Object.keys(currentJob.general_terms || {}).map((key) => createCheckBoxData(currentJob.general_terms[key], generalTermsSelectionsRef)))}
                                </div>
                                </>
                            }

                            {
                                formPage === 2 && <>
                                
                                <div className="job__Application__Items">
                                    <h2><b>Technical Specifications</b></h2>
                                    <p>Tick each box to approve</p>
                                    <p>Thank you for accepting terms and conditions. Read following technical specifications and accept</p>
                                    {React.Children.toArray(Object.keys(currentJob.Technical_Specifications || {}).map((key) => createCheckBoxData(currentJob.Technical_Specifications[key], technicalTermsSelectionsRef)))}
                                </div>    
                                </>
                            }

                            {
                                formPage === 3 && <>

                                <div className="job__Application__Items">
                                    <h2><b>Payment Terms</b></h2>
                                    <p></p>
                                    <p>Thank you for accepting technical specifications. Read following payment terms and accept</p>
                                    {React.Children.toArray(Object.keys(currentJob.Payment_terms || {}).map((key) => createCheckBoxData(currentJob.Payment_terms[key], paymentTermsSelectionsRef)))}
                                </div>
                                </>
                            }

                            {

                                formPage === 4 && <>

                                <div className="job__Application__Items">
                                    <h2><b>Workflow Terms</b></h2>
                                    <p></p>
                                    <p>Thank you for accepting payment terms. Read following work flow to proceed</p>
                                    {React.Children.toArray(Object.keys(currentJob.workflow || {}).map((key) => createCheckBoxData(currentJob.workflow[key], workflowTermsSelectionsRef)))}
                                </div>
                                </>
                            }

                            {
                                formPage === 5 && <>

                                    <div className="job__Application__Item">

                                        <h2>Select Country<span className="yellow-color required-indicator">*</span></h2>
                                        <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                            <select name="country" ref={selectCountryOptionRef} defaultValue={'default_'}>
                                                <option value={'default_'} disabled>Select Option</option>
                                                {React.Children.toArray(countriesData.map(country => {
                                                    return <option value={country.toLocaleLowerCase()}>{country}</option>
                                                }))}
                                            </select>
                                            <AiOutlineDown className="dropdown__Icon" />
                                        </div>
                                    </div>
                                    
                                    {
                                        removeFreelanceOptions ? <></> : 
                                        
                                        <>
                                            <div className="job__Application__Item">
                                                <h2>Freelancing Profile<span className="yellow-color required-indicator">*</span></h2>
                                                
                                                <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                                    <select name="freelancePlaform" ref={freelancePlatformRef} defaultValue={'default_'}>
                                                        <option value={'default_'} disabled>Select Option</option>
                                                        {React.Children.toArray(freelancingPlatforms.map(platform => {
                                                            return <option value={platform.toLocaleLowerCase()}>{platform}</option>
                                                        }))}
                                                    </select>
                                                    <AiOutlineDown className="dropdown__Icon" />
                                                </div>
                                            </div>

                                            <div className="job__Application__Item">
                                                <label className="input__Text__Container">
                                                    <h2>Link to profile on freelancing platform<span className="yellow-color required-indicator">*</span></h2>
                                                    <input aria-label="link to profile on freelance platform" type={'text'} placeholder={'Link to profile on platform'} value={newApplicationData.freelancePlatformUrl} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM_URL, payload: { stateToChange: mutableNewApplicationStateNames.freelancePlatformUrl, value: e.target.value }})} />
                                                </label>
                                            </div>

                                        </>
                                    }
                                    

                                    <div className="job__Application__Item">
                                        <h2>Academic Qualifications<span className="yellow-color required-indicator">*</span></h2>
                                        <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                            <select name="qualifications" ref={qualificationSelectionRef} defaultValue={'default_'}>
                                                <option value={'default_'} disabled>Select Option</option>
                                                {React.Children.toArray(qualificationsData.map(qualification => {
                                                    return <option value={qualification.toLocaleLowerCase()} onClick={() => setLabelClicked(!labelClicked)}>{qualification}</option>
                                                }))}
                                            </select>
                                            <AiOutlineDown className="dropdown__Icon" />
                                        </div>
                                    </div>

                                    { 
                                        showQualificationInput && <div className="job__Application__Item">
                                            <label className="input__Text__Container">
                                                <h2 className="qualification__Title__Text">Qualification<span className="yellow-color required-indicator">*</span></h2>
                                                <input aria-label="your academic qualification" type={'text'} placeholder={'Academic Qualification'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_qualification_type]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS, payload: { stateToChange: mutableNewApplicationStateNames.others_property_qualification_type, value: e.target.value }})} />
                                            </label>
                                        </div>
                                    }

                                    {React.Children.toArray(Object.keys(currentJob.others || {}).map((key) => createInputData(key, currentJob.others[key])))}
                                
                                    <label onClick={() => setLabelClicked(!labelClicked)}>
                                        <input type={'checkbox'} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_AGREE_TO_ALL, payload: { stateToChange: mutableNewApplicationStateNames.others_property_agreeToAll, value: e.target.checked } }) } />
                                        <span>Agree/Disagree to all terms</span>
                                    </label>
                                    
                                    <div className="job__Application__Item">
                                        <label className="input__Text__Container">
                                            Comments/Suggestions
                                            <input type={'text'} placeholder={'Any comments'} value={newApplicationData.others[mutableNewApplicationStateNames.others_comments]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_COMMENTS, payload: { stateToChange: mutableNewApplicationStateNames.others_comments, value: e.target.value } })} />
                                        </label>
                                    </div>

                                </>
                            }
    
                            {
                                
                                formPage !== 5 &&
                                <>
                                    <button type="button" disabled={disableNextBtn} onClick={() => { setFormPage(formPage + 1); } }>Next</button>
                                </>
                            }

                            {
                                formPage === 5 && <>
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
                                { currentJob.time_period}
                            </span>
                        </div>

                        <h2><b>Job Description</b></h2>

                        <textarea readOnly={true} value={currentJob.description} rows={10}></textarea>

                        <h2 className="about__Dowell__Title"><b>About D'Well Research</b></h2>
                        <p className="about__Dowell">{dowellInfo}</p>

                        <div className='apply_Btn_Container'>
                            <button className="apply-btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>Apply</button>
                        </div>
                    </>
                }
                
            </div>
        {newApplicationData.others[mutableNewApplicationStateNames.applicant] && newApplicationData.others[mutableNewApplicationStateNames.applicant] !== "" && <Footer />}
    </>
}

export default JobApplicationScreen;
