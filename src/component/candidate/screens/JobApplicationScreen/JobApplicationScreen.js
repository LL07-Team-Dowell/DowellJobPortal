import React, { useEffect, useReducer, useRef, useState } from "react";
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
import { generalTerms, paymentTerms, qualificationsData, technicalTerms, workFlowTerms } from "./jobFormData";
import { mutableNewApplicationStateNames, useNewApplicationContext } from "../../../../contexts/NewApplicationContext";
import { newJobApplicationDataReducerActions } from "../../../../reducers/NewJobApplicationDataReducer";

import "./style.css";


const JobApplicationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState({});
    const { newApplicationData, dispatchToNewApplicationData } = useNewApplicationContext();
    const [disableApplyBtn, setDisableApplyBtn] = useState(true);
    const { section } = useParams();
    const selectCountryOptionRef = useRef(null);
    const qualificationSelectionRef = useRef(null);
    const [disableNextBtn, setDisableNextBtn] = useState(true);
    const generalTermsSelectionsRef = useRef([]);
    const [labelClicked, setLabelClicked] = useState(false);
    const technicalTermsSelectionsRef = useRef([]);
    const paymentTermsSelectionsRef = useRef([]);
    const workflowTermsSelectionsRef = useRef([]);
    
    const [formPage, setFormPage] = useState(1);
    
    const getCurrentApplicant = async () => {
        const response = await myAxiosInstance.get("/accounts/user_view/");
        return response;
    }

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

            if ((newApplicationData.freelancePlatform.length < 1) || (newApplicationData.freelancePlatformUrl.length < 1) ) return setDisableNextBtn(true);
            
            if ( !validateUrl(newApplicationData.freelancePlatformUrl, true)) return setDisableNextBtn(true);
            
            return setDisableNextBtn(false);

        }
        if (formPage === 7) {

            if (qualificationSelectionRef.current.value === "default_") return setDisableNextBtn(true);
            
            dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS, payload:{ stateToChange: mutableNewApplicationStateNames.others_property_qualifications, value: qualificationSelectionRef.current.value }})
            
            if (newApplicationData.others[mutableNewApplicationStateNames.others_property_qualifications] !== "") return setDisableNextBtn(false);

        }
        if (formPage === 8) {

            if ( newApplicationData.others[mutableNewApplicationStateNames.others_property_discord_id].length < 1 ) return setDisableNextBtn(true);

            if ( ( newApplicationData.others[mutableNewApplicationStateNames.others_property_github_id].length > 0 ) && (!validateUrl(newApplicationData.others[mutableNewApplicationStateNames.others_property_github_id], true))) return setDisableNextBtn(true);

            if ( !newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll] ) return setDisableNextBtn(true);

            return setDisableNextBtn(false);

        }

        setDisableNextBtn(true);

    }, [formPage, labelClicked, newApplicationData.country, newApplicationData.freelancePlatform, newApplicationData.freelancePlatformUrl, newApplicationData.others[mutableNewApplicationStateNames.others_property_qualifications], newApplicationData.others[mutableNewApplicationStateNames.others_property_discord_id], newApplicationData.others[mutableNewApplicationStateNames.others_property_github_id], newApplicationData.others[mutableNewApplicationStateNames.others_property_agreeToAll]])


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

    const createCheckBoxData = (arrayRef) => {

        return (data) => {
            if (typeof(data) === "object") return (
                <label onClick={() => setLabelClicked(!labelClicked)}>
                    <input type={'checkbox'} ref={elem => addToRefsArray(elem, arrayRef)} />
                    <span>{data.term} {data.link ? <a href={data.link} target={"_blank"} rel={'noreferrer noopener'}>Discord Link</a>: ""}</span>
                </label>
            )
    
            return (
                <label onClick={() => setLabelClicked(!labelClicked)}>
                    <input type={'checkbox'} ref={elem => addToRefsArray(elem, arrayRef)} />
                    <span>{data}</span>
                </label>
            )
        }

    }

    return <>
        <Navbar changeToBackButton={true} backButtonLink={'/home'} />
            <div className="container-wrapper candidate__Job__Application__Container">

                {
                    section === "form" ? <>
                        <h1><b>Job Application Form for {currentJob.title}</b></h1>

                        <form>
                            {
                                
                                formPage === 1 && <>

                                    <h2><b>General Terms and Conditions</b></h2>
                                    <p>Tick each box to continue</p>
                                    <p>{generalTerms.title}</p>
                                    
                                    {React.Children.toArray(generalTerms.terms.map(createCheckBoxData(generalTermsSelectionsRef)))}
                                
                                </>
                            }

                            {
                                formPage === 2 && <>
                                
                                    <h2><b>Technical Specifications</b></h2>
                                    <p>Tick each box to approve</p>
                                    <p>{technicalTerms.title}</p>
                                    {React.Children.toArray(technicalTerms.terms.map(createCheckBoxData(technicalTermsSelectionsRef)))}
                                    
                                </>
                            }

                            {
                                formPage === 3 && <>
                                
                                    <h2><b>Payment Terms</b></h2>
                                    <p></p>
                                    <p>{paymentTerms.title}</p>
                                    {React.Children.toArray(paymentTerms.terms.map(createCheckBoxData(paymentTermsSelectionsRef)))}
                                
                                </>
                            }

                            {

                                formPage === 4 && <>

                                    <h2><b>Workflow Terms</b></h2>
                                    <p></p>
                                    <p>{workFlowTerms.title}</p>
                                    {React.Children.toArray(workFlowTerms.terms.map(createCheckBoxData(workflowTermsSelectionsRef)))}
                                
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
                                    <h2><b>Freelancing Profile Link</b></h2>
                                    
                                    <label className="input__Text__Container">
                                        Freelancing Platform
                                        <input aria-label="freelance platform name" type={'text'} placeholder={'Name of Platform'} value={newApplicationData.freelancePlatform} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM, payload: { stateToChange: mutableNewApplicationStateNames.freelancePlatform , value: e.target.value }})} />
                                    </label>
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
                                </>
                            }

                            {
                                formPage === 8 && <>

                                    <h2><b>Your Discord Profile ID</b></h2>
                                    <label className="text__Container">
                                        <input type={'text'} placeholder={'Discord Profile ID'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_discord_id]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_DISCORD_ID, payload: { stateToChange: mutableNewApplicationStateNames.others_property_discord_id, value: e.target.value } })} />
                                    </label>
                                    
                                    <h2><b>Your Github Profile<span className="skip__Option">(skip if not applicable)</span></b></h2>
                                    <label className="text__Container">
                                        <input type={'text'} placeholder={'Github Profile Link'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_github_id]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_GITHUB_ID, payload: { stateToChange: mutableNewApplicationStateNames.others_property_github_id, value: e.target.value } })} />
                                    </label>

                                    <h2><b>Your Canva Profile<span className="skip__Option">(skip if not applicable)</span></b></h2>
                                    <label className="text__Container">
                                        <input type={'text'} placeholder={'Canva Profile'} value={newApplicationData.others[mutableNewApplicationStateNames.others_property_canva_id]} onChange={(e) => dispatchToNewApplicationData({ type: newJobApplicationDataReducerActions.UPDATE_CANVA_ID, payload: { stateToChange: mutableNewApplicationStateNames.others_property_canva_id, value: e.target.value } })} />
                                    </label>
                                    
                                    <label>
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
                                
                                formPage !== 8 ? 
                                <>
                                    <button type="button" disabled={disableNextBtn} onClick={() => { setFormPage(formPage + 1) } }>Next</button>
                                </> :
                                <>
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
