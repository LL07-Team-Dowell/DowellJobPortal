import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { dowellLoginUrl, myAxiosInstance } from "../../../../lib/axios";
import { AiOutlineDown, AiOutlinePlayCircle } from "react-icons/ai";
import { validateUrl } from "../../../../helpers/helpers";
import { countriesData, dowellInfo, dowellLinks, freelancingPlatforms, qualificationsData } from "../../utils/jobFormApplicationData";
import { mutableNewApplicationStateNames, useNewApplicationContext } from "../../../../contexts/NewApplicationContext";
import { newJobApplicationDataReducerActions } from "../../../../reducers/NewJobApplicationDataReducer";

import "./style.css";
import { handleShareBtnClick } from "../../utils/helperFunctions";
import { routes } from "../../../../lib/routes";
import { jobKeys } from "../../../admin/utils/jobKeys";
import { BsCashStack } from "react-icons/bs";
import LoadingSpinner from "../../../admin/components/LoadingSpinner/LoadingSpinner";
import { candidateStatuses } from "../../utils/candidateStatuses";
import TitleNavigationBar from "../../../../components/TitleNavigationBar/TitleNavigationBar";
import { IoBookmarkSharp } from "react-icons/io5";
import { RiShareBoxFill } from "react-icons/ri";
import { IoMdShare, IoIosArrowRoundForward } from "react-icons/io";
import { VscCalendar } from "react-icons/vsc";
import { BsClock } from "react-icons/bs";

const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const { newApplicationData, dispatchToNewApplicationData } = useNewApplicationContext();
    const [disableApplyBtn, setDisableApplyBtn] = useState(false);
    const { section, id } = useParams();
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
    const [allJobs, setAllJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [ currentUser, setCurrentUser ] = useState(null);
    const [jobSaved, setJobSaved] = useState(false);
    
    const [formPage, setFormPage] = useState(1);

    const addToRefsArray = (elem, arrayToAddTo) => {
        if (elem && !arrayToAddTo.current.includes(elem)) arrayToAddTo.current.push(elem)
    }

    const fetchAllJobs = async () => {

        const response = await myAxiosInstance.get(routes.Jobs);
        setAllJobs(response.data);
        setJobsLoading(false);
        return;

    }

    useEffect(() => {

        fetchAllJobs();
        
        const savedUser = localStorage.getItem("user");

        if (!savedUser) return;

        setCurrentUser(JSON.parse(savedUser));

    }, []);

    useEffect(() => {

        if (!id) return navigate("/home");

        if (jobsLoading) return;

        if (typeof(Number(id)) !== "number") return navigate("/home");

        const foundJob = allJobs.find(job => job.id === Number(id));

        if (!foundJob) return navigate("/home");

        setCurrentJob(foundJob)

    }, [id, jobsLoading, allJobs]);

    useEffect(() => {
        
        if (location.pathname.includes("form") || location.pathname.split("/").includes("form")) return setDisableNextBtn(true);

        setDisableApplyBtn(false);

    }, [location])

    useEffect(() => {

        if (jobsLoading) return;
        if (!currentUser) return;
        
        setDisableApplyBtn(false);
        setDisableNextBtn(true);

        generalTermsSelectionsRef.current.splice(0, generalTermsSelectionsRef.current.length);
        technicalTermsSelectionsRef.current.splice(0, technicalTermsSelectionsRef.current.length);
        paymentTermsSelectionsRef.current.splice(0, paymentTermsSelectionsRef.current.length);
        workflowTermsSelectionsRef.current.splice(0, workflowTermsSelectionsRef.current.length);

        const currentState = { ...newApplicationData };

        if (currentJob.typeof === "Employee" || currentJob.typeof === "Internship") {

            delete currentState[mutableNewApplicationStateNames.freelancePlatform];
            delete currentState[mutableNewApplicationStateNames.freelancePlatformUrl];

            if (currentUser.role !== process.env.REACT_APP_GUEST_ROLE) {
                delete currentState.others[mutableNewApplicationStateNames.others_applicant_first_name];
                delete currentState.others[mutableNewApplicationStateNames.others_applicant_email];
            }

            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.REWRITE_EXISTING_STATE, payload: { newState: currentState }});
        }

        if ((currentJob.typeof !== "Employee" || currentJob.typeof !== "Internship") && (currentUser.role !== process.env.REACT_APP_GUEST_ROLE)) {
            delete currentState.others[mutableNewApplicationStateNames.others_applicant_first_name];
            delete currentState.others[mutableNewApplicationStateNames.others_applicant_email];

            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.REWRITE_EXISTING_STATE, payload: { newState: currentState }});
        }

        if (currentUser.role === process.env.REACT_APP_GUEST_ROLE) {
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_APPLICANT_FIRST_NAME, payload: { stateToChange: mutableNewApplicationStateNames.others_applicant_first_name, value: currentUser.username.split("_")[1] }});
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_APPLICANT_EMAIL, payload: { stateToChange: mutableNewApplicationStateNames.others_applicant_email, value: currentUser.email }});
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_APPLICATION_STATUS, payload: { stateToChange: mutableNewApplicationStateNames.status, value: candidateStatuses.GUEST_PENDING_SELECTION }});
        }
        
        Object.keys(currentJob.others || {}).forEach(item => {
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_OTHERS, payload: { stateToChange: item, value: "" }})
        })

        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB, payload: { stateToChange: mutableNewApplicationStateNames.job, value: currentJob.id }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_APPLICANT, payload: { stateToChange: mutableNewApplicationStateNames.applicant, value: currentUser.username }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_DATE_APPLIED, payload: { stateToChange: mutableNewApplicationStateNames.others_date_applied, value: new Date() }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB_TITLE, payload: { stateToChange: mutableNewApplicationStateNames.title, value: currentJob.title }})
        dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_JOB_DESCRIPTION, payload: { stateToChange: mutableNewApplicationStateNames.jobDescription, value: currentJob.description }})

        if (currentJob.typeof === "Employee" || currentJob.typeof === "Internship") return setRemoveFreelanceOptions(true);

        setRemoveFreelanceOptions(false);

    }, [currentJob]);

    useEffect(() => {

        if (formPage === 1) {

            if (generalTermsSelectionsRef.current.length === 0) return setDisableNextBtn(false);

            if (generalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }

        if (formPage === 2) {

            if (technicalTermsSelectionsRef.current.length === 0) return setFormPage(formPage + 1);

            if (technicalTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 3) {

            if (paymentTermsSelectionsRef.current.length === 0) return setFormPage(formPage + 1);

            if (paymentTermsSelectionsRef.current.every(selection => selection.checked === true)) return setDisableNextBtn(false);

            return setDisableNextBtn(true);

        }
        if (formPage === 4) {

            if (workflowTermsSelectionsRef.current.length === 0) return setFormPage(formPage + 1);

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

        if (!currentUser) return window.location.href = dowellLoginUrl + `/apply/job/${id}/`;

        setDisableApplyBtn(true);
        setDisableNextBtn(true);

        navigate(`/apply/job/${id}/form/`);

    }

    const handleSubmitNewApplication = async (e) => {
        e.preventDefault();

        setDisableNextBtn(true);
        
        await myAxiosInstance.post(routes.Add_Appplication, newApplicationData);

        navigate("/applied");
    }

    const createCheckBoxData = (data, arrayRef) => {
        
        return (
            <label className="form__Label" onClick={() => setLabelClicked(!labelClicked)}>
                <input type={'checkbox'} ref={elem => addToRefsArray(elem, arrayRef)} />
                <span>{data}</span>
            </label>
        )

    }

    const createInputData = (key, data) => {
        
        if (key === jobKeys.paymentForJob || key === jobKeys.othersFreelancerJobType || key === jobKeys.othersInternJobType || key === jobKeys.othersResearchAssociateJobType) return <></>

        return (
            <>
                <div className="job__Application__Item">
                    <h2>{data}<span className="required-indicator">*</span></h2>
                    <label className="text__Container">
                        <input type={'text'} placeholder={data} value={newApplicationData.others[key] ? newApplicationData.others[key] : ""} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_OTHERS, payload: { stateToChange: key, value: e.target.value } })} />
                    </label>
                </div>
            </>
        )
    }

    if (jobsLoading) return <LoadingSpinner />

    return <>
            <div className="candidate__Job__Application__Container">
                <TitleNavigationBar handleBackBtnClick={() => navigate(-1)} />
                {
                    section === "form" ? <>
                        <div className="job__Title__Container">
                            <div className="job__Title__Items">
                                <h1 className="job__Title"><b>Job Application Form for {currentJob.title}</b></h1>
                                <p>Dowell Ux living lab</p>  
                            </div>
                            <div className="job__Share__Items">
                                <button className={`save__Btn grey__Btn ${jobSaved ? 'active' : ''}`} onClick={() => setJobSaved(!jobSaved)}>
                                    <span>{jobSaved ? "Saved": "Save"}</span>
                                    <IoBookmarkSharp className="save__Icon" />
                                </button>
                                <button className="share__Btn grey__Btn" onClick={() => handleShareBtnClick(currentJob.title, `Apply for ${currentJob.title} on Dowell!`, window.location)}>
                                    <span>Share</span>
                                    <IoMdShare />
                                </button>
                            </div>
                        </div>

                        <div className="job__Application__Form__Wrapper">
                            <p className="required__Indicator__Item">
                                *Required
                            </p>
                            <form className="job__Application__Form" onSubmit={handleSubmitNewApplication}>
                                {
                                    
                                    formPage === 1 && <>

                                    <div className="job__Application__Items">
                                        <div className="form__Title__Item">
                                            <h2><b>General Terms and Conditions</b></h2>
                                        </div>
                                        <p className="form__Tick__Item">Tick each box to continue</p>
                                        <p className="form__Salutations__Item">Thank you for applying to freelancing opportunity in uxlivinglab. Read following terms and conditions and accept</p>
                                        {React.Children.toArray(Object.keys(currentJob.general_terms || {}).map((key) => createCheckBoxData(currentJob.general_terms[key], generalTermsSelectionsRef)))}
                                    </div>
                                    </>
                                }

                                {
                                    formPage === 2 && <>
                                    
                                    <div className="job__Application__Items">
                                        <div className="form__Title__Item">
                                            <h2><b>Technical Specifications</b></h2>
                                        </div>
                                        <p className="form__Tick__Item">Tick each box to approve</p>
                                        <p className="form__Salutations__Item">Thank you for accepting terms and conditions. Read following technical specifications and accept</p>
                                        {React.Children.toArray(Object.keys(currentJob.Technical_Specifications || {}).map((key) => createCheckBoxData(currentJob.Technical_Specifications[key], technicalTermsSelectionsRef)))}
                                    </div>    
                                    </>
                                }

                                {
                                    formPage === 3 && <>

                                    <div className="job__Application__Items">
                                        <div className="form__Title__Item">
                                            <h2><b>Payment Terms</b></h2>
                                        </div>
                                        <p className="form__Tick__Item">Tick each box to continue</p>
                                        <p className="form__Salutations__Item">Thank you for accepting technical specifications. Read following payment terms and accept</p>
                                        {React.Children.toArray(Object.keys(currentJob.Payment_terms || {}).map((key) => createCheckBoxData(currentJob.Payment_terms[key], paymentTermsSelectionsRef)))}
                                    </div>
                                    </>
                                }

                                {

                                    formPage === 4 && <>

                                    <div className="job__Application__Items">
                                        <div className="form__Title__Item">
                                            <h2><b>Workflow Terms</b></h2>
                                        </div>
                                        <p className="form__Tick__Item">Tick each box to continue</p>
                                        <p className="form__Salutations__Item">Thank you for accepting payment terms. Read following work flow to proceed</p>
                                        {React.Children.toArray(Object.keys(currentJob.workflow || {}).map((key) => createCheckBoxData(currentJob.workflow[key], workflowTermsSelectionsRef)))}
                                    </div>
                                    </>
                                }

                                {
                                    formPage === 5 && <>

                                        <div className="form__Title__Item">
                                            <h2><b>Basic Information</b></h2>
                                        </div>
                                        <div className="job__Application__Item">

                                            <h2>Select Country<span className="required-indicator">*</span></h2>
                                            <div className="select__Dropdown__Container" onClick={() => setLabelClicked(!labelClicked)}>
                                                <select name="country" ref={selectCountryOptionRef} defaultValue={'default_'}>
                                                    <option value={'default_'} disabled>Select Option</option>
                                                    {React.Children.toArray(countriesData.map(country => {
                                                        return <option value={country.toLocaleLowerCase()}>{country}</option>
                                                    }))}
                                                </select>
                                                <AiOutlineDown className="dropdown__Icon" onClick={() => { if (!selectCountryOptionRef.current) return; selectCountryOptionRef.current.click() }} />
                                            </div>
                                        </div>
                                        
                                        {
                                            removeFreelanceOptions ? <></> : 
                                            
                                            <>
                                                <div className="job__Application__Item">
                                                    <h2>Freelancing Profile<span className="required-indicator">*</span></h2>
                                                    
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
                                                        <h2>Link to profile on freelancing platform<span className="required-indicator">*</span></h2>
                                                        <input aria-label="link to profile on freelance platform" type={'text'} placeholder={'Link to profile on platform'} value={newApplicationData.freelancePlatformUrl} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM_URL, payload: { stateToChange: mutableNewApplicationStateNames.freelancePlatformUrl, value: e.target.value }})} />
                                                    </label>
                                                </div>

                                            </>
                                        }
                                        

                                        <div className="job__Application__Item">
                                            <h2>Academic Qualifications<span className="required-indicator">*</span></h2>
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
                                                    <h2 className="qualification__Title__Text">Qualification<span className="required-indicator">*</span></h2>
                                                    <input aria-label="your academic qualification" type={'text'} placeholder={'Academic Qualification'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_qualification_type]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS, payload: { stateToChange: mutableNewApplicationStateNames.others_property_qualification_type, value: e.target.value }})} />
                                                </label>
                                            </div>
                                        }

                                        {React.Children.toArray(Object.keys(currentJob.others || {}).map((key) => createInputData(key, currentJob.others[key])))}
                                    
                                        <label className="form__Label__Accept__All" onClick={() => setLabelClicked(!labelClicked)}>
                                            <input type={'checkbox'} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_AGREE_TO_ALL, payload: { stateToChange: mutableNewApplicationStateNames.others_property_agreeToAll, value: e.target.checked } }) } />
                                            <span>Agree/Disagree to all terms</span>
                                        </label>
                                        
                                        <div className="job__Application__Item comments">
                                            <label className="input__Text__Container">
                                                <h2>Comments/Suggestions</h2>
                                                <input type={'text'} placeholder={'Any comments'} value={newApplicationData.others[mutableNewApplicationStateNames.others_comments]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_COMMENTS, payload: { stateToChange: mutableNewApplicationStateNames.others_comments, value: e.target.value } })} />
                                            </label>
                                        </div>

                                    </>
                                }
        
                                {
                                    
                                    formPage !== 5 &&
                                    <>
                                        <button className="apply__Btn green__Btn" type="button" disabled={disableNextBtn} onClick={() => { setFormPage(formPage + 1); } }>
                                            <span>Next</span>
                                            <IoIosArrowRoundForward />
                                        </button>
                                    </>
                                }

                                {
                                    formPage === 5 && <>
                                        <button className="apply__Btn green__Btn" type="submit" disabled={disableNextBtn} onClick={handleSubmitNewApplication}>
                                            <span>Submit</span>
                                            <IoIosArrowRoundForward />
                                        </button>
                                    </>
                                }

                            </form>
                        </div>
                    </>:

                    <>
                        <div className="job__Title__Container">
                            <div className="job__Title__Items">
                                <h1 className="job__Title"><b>{currentJob.title}</b></h1>
                                <p>Dowell Ux living lab</p>  
                            </div>
                            <div className="job__Share__Items">
                                <button className={`save__Btn grey__Btn ${jobSaved ? 'active' : ''}`} onClick={() => setJobSaved(!jobSaved)}>
                                    <span>{jobSaved ? "Saved": "Save"}</span>
                                    <IoBookmarkSharp className="save__Icon" />
                                </button>
                                <button className="share__Btn grey__Btn" onClick={() => handleShareBtnClick(currentJob.title, `Apply for ${currentJob.title} on Dowell!`, window.location)}>
                                    <span>Share</span>
                                    <IoMdShare />
                                </button>
                            </div>
                        </div>
                        <div className="job__Info__Container">
                            <div className="job__Skills__Info">
                                <span className="job__Skill__Wrapper">
                                    <VscCalendar className="info__Icon" />
                                    <span>Start Date:&nbsp;<span className="highlight__Job__Info">Immediately</span></span>
                                </span>
                                {
                                    currentJob.others && currentJob.others[jobKeys.othersInternJobType] &&
                                    <span className="job__Skill__Wrapper">
                                        <BusinessCenterIcon className="info__Icon" />
                                        <span>Job Type:&nbsp;<span className="highlight__Job__Info">{ currentJob.others[jobKeys.othersInternJobType]}</span></span>
                                    </span>
                                }
                                {
                                    currentJob.others && currentJob.others[jobKeys.othersResearchAssociateJobType] &&
                                    <span className="job__Skill__Wrapper">
                                        <BusinessCenterIcon className="info__Icon" />
                                        <span>Job Type:&nbsp;<span className="highlight__Job__Info">{ currentJob.others[jobKeys.othersResearchAssociateJobType]}</span></span>
                                    </span>
                                }
                                {
                                    currentJob.others && currentJob.others[jobKeys.othersFreelancerJobType] && 
                                    <span className="job__Skill__Wrapper">
                                        <BusinessCenterIcon className="info__Icon" />
                                        <span>Job Type:&nbsp;<span className="highlight__Job__Info">{ currentJob.others[jobKeys.othersFreelancerJobType]}</span></span>
                                    </span>
                                }
                                {
                                    currentJob.typeof === "Employee" && 
                                    <span className="job__Skill__Wrapper">
                                        <BusinessCenterIcon className="info__Icon" />
                                        <span>Job Type:&nbsp;<span className="highlight__Job__Info">Full time</span></span>
                                    </span>
                                }
                                <span className="job__Skill__Wrapper">
                                    <BsClock className="info__Icon" />
                                    <span>Duration:&nbsp;<span className="highlight__Job__Info">{ currentJob.time_period}</span></span>
                                </span>
                                {
                                    currentJob.others && currentJob.others[jobKeys.paymentForJob] &&
                                    <span className="job__Skill__Wrapper">
                                        <BsCashStack className="info__Icon" />
                                        <span>Payment:&nbsp;<span className="highlight__Job__Info">{currentJob.others[jobKeys.paymentForJob]}</span></span>
                                    </span>
                                }
                            </div>
                            <div className="job__Quick__Apply__Container">
                                <button className="apply__Btn green__Btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>
                                    <span>Apply</span>
                                    <RiShareBoxFill />
                                </button>
                            </div>
                        </div>

                        <div className="job__About__Info">
                            <p className="job__About__Title paragraph__Title__Item">Description: </p>
                            <span>{currentJob.description}</span>
                        </div>

                        <div className="job__Skills__Info">
                            <p className="paragraph__Title__Item">Skills:</p>
                            <span>
                                { currentJob.skills }
                            </span>
                        </div>

                        <div className='apply_Btn_Container'>
                            <button className="apply__Btn green__Btn" onClick={handleSubmitApplicationBtnClick} disabled={disableApplyBtn}>
                                <span>Apply for Job</span>
                                <RiShareBoxFill />
                            </button>
                            <button className={`save__Btn grey__Btn ${jobSaved ? 'active' : ''}`} onClick={() => setJobSaved(!jobSaved)}>
                                <span>{jobSaved ? "Saved": "Save"}</span>
                                <IoBookmarkSharp />
                            </button>
                        </div>
                    </>
                }
                
            </div>
            {
                section !== "form" ? <div className="bottom__About__Dowell__Container">
                    <div className="intro__Container">
                        <div className="img__Container">
                            <img src={process.env.PUBLIC_URL + "/logos/logo-1.png"} alt="dowell logo" loading="lazy" />
                        </div>
                        <div className="info__Container">
                            <h2 className="about__Dowell__Title"><b>About D'Well Research</b></h2>
                            <p className="about__Dowell">{dowellInfo}</p>
                        </div>
                    </div>

                    <div className="social__Icons__Container">
                        {
                            React.Children.toArray(dowellLinks.map(dowellLink => {
                                return <a aria-label={dowellLink.title} href={dowellLink.link} rel="noopener" target="_blank" className="social__Icon__Item">
                                    {dowellLink.icon}
                                </a>
                            }))
                        }
                    </div>
                </div> 
                : <></>
            }
        {newApplicationData.others[mutableNewApplicationStateNames.applicant] && newApplicationData.others[mutableNewApplicationStateNames.applicant] !== "" && <Footer currentCategory={currentJob.typeof} />}
    </>
}

export default JobApplicationScreen;
