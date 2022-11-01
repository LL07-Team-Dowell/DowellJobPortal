import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newJobStateDataNames, useNewJobTermsContext } from "../../../../contexts/NewJobTermsContext";
import { communityAxiosInstance, myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import { newJobTermsReducerActions } from "../../../../reducers/NewJobTermsReducer";
import { countriesData } from "../../../candidate/utils/jobFormApplicationData";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown";
import { jobKeys } from "../../utils/jobKeys";
import Button from "../Button/Button";
import stateCountry from "state-country";

const NewJobDetails = () => {
    const [ newJobDetails, setNewJobDetails ] = useState({
        "title": "",
        "description": "",
        "skills": "",
        "is_active": false,
        "typeof": "",
        "time_period": "",
        "general_terms": {},
        "Technical_Specifications": {},
        "Payment_terms": {},
        "workflow": {},
        "others": {},
    });
    const { newJobTerms, dispatchToNewJobTerms } = useNewJobTermsContext();
    const [ disableSaveJobBtn, setDisableSaveJobBtn ] = useState(false);
    const [ showInternJobType, setShowInternJobType ] = useState(false);
    const [ showFreelancerJobType, setShowFreelancerJobType ] = useState(false);
    const [ showResearchJobType, setShowResearchJobType ] = useState(false);
    const [ country, setCountry ] = useState(null);
    const [ state, setState ] = useState(null);
    const [ allStates, setAllStates ] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewJobDetails(prevValue => {
            return { ...prevValue, [name]: value }
        })

    }

    useEffect(() => {

        if (newJobDetails.title.length < 1) return setDisableSaveJobBtn(true);
        if (newJobDetails.description.length < 1) return setDisableSaveJobBtn(true);
        if (newJobDetails.time_period.length < 1) return setDisableSaveJobBtn(true);
        
        setDisableSaveJobBtn(false);

    }, [newJobDetails])

    useEffect(() => {

        const allGenTerms = Object.assign({}, ...newJobTerms[newJobStateDataNames.generalTerms]);
        setNewJobDetails(prevDetails => { return { ...prevDetails, "general_terms": allGenTerms } });

        const allTechTerms = Object.assign({}, ...newJobTerms[newJobStateDataNames.technicalTerms]);
        setNewJobDetails(prevDetails => { return { ...prevDetails, "Technical_Specifications": allTechTerms } });

        const allPayTerms = Object.assign({}, ...newJobTerms[newJobStateDataNames.paymentTerms]);
        setNewJobDetails(prevDetails => { return { ...prevDetails, "Payment_terms": allPayTerms } });

        const allWorkTerms = Object.assign({}, ...newJobTerms[newJobStateDataNames.workflowTerms]);
        setNewJobDetails(prevDetails => { return { ...prevDetails, "workflow": allWorkTerms } });

        const allOtherTerms = Object.assign({}, ...newJobTerms[newJobStateDataNames.otherTerms]);
        setNewJobDetails(prevDetails => { return { ...prevDetails, "others": { ...prevDetails["others"], ...allOtherTerms} } });

        if (Object.keys(allGenTerms || {}).length === 0) setNewJobDetails(prevDetails => { return { ...prevDetails, "general_terms": null } });
        if (Object.keys(allTechTerms || {}).length === 0) setNewJobDetails(prevDetails => { return { ...prevDetails, "Technical_Specifications": null } });
        if (Object.keys(allPayTerms || {}).length === 0) setNewJobDetails(prevDetails => { return { ...prevDetails, "Payment_terms": null } });
        if (Object.keys(allWorkTerms || {}).length === 0) setNewJobDetails(prevDetails => { return { ...prevDetails, "workflow": null } });

    }, [newJobTerms])

    useEffect(() => {

        if (newJobDetails.typeof && newJobDetails.typeof === "Internship") return setShowInternJobType(true);
        if (newJobDetails.typeof && newJobDetails.typeof === "Freelancer") return setShowFreelancerJobType(true);
        if (newJobDetails.typeof && newJobDetails.typeof === "Research Associate") return setShowResearchJobType(true);
        
        setShowInternJobType(false);
        setShowFreelancerJobType(false);
        setShowResearchJobType(false);

    }, [newJobDetails.typeof])

    useEffect(() => {

        if (!country) return
        
        setState(null)

        const statesInCurrentCountry = stateCountry.getAllStatesInCountry(country).map(state => state.name);
        setAllStates(statesInCurrentCountry);

    }, [country])

    const handleSaveNewJobBtnClick = async () => {
        if (newJobDetails.typeof.length < 1) return
        if (newJobDetails.typeof === "Internship" && !newJobDetails.others[jobKeys.othersInternJobType]) return toast.info("Please specify whether it is a 'Full time' or 'Part time' job.")
        if (newJobDetails.typeof === "Freelancer" && !newJobDetails.others[jobKeys.othersFreelancerJobType]) return toast.info("Please specify whether it is a 'Task based' or 'Time based' job.")
        if (newJobDetails.typeof === "Research Associate" && !newJobDetails.others[jobKeys.othersResearchAssociateJobType]) return toast.info("Please specify whether it is a 'Full time' or 'Part time' job.")
        
        setDisableSaveJobBtn(true);

        const detailsForNewResearchJob = {
            location: country,
            title: newJobDetails.title,
            description: newJobDetails.description,
            skills: newJobDetails.skills,
            is_active: newJobDetails.is_active,
            typeof: newJobDetails.typeof,
            city: state,
            others: newJobDetails.others,
        }

        if (newJobDetails.typeof === "Research Associate") {
            
            try {
                
                await communityAxiosInstance.post(routes.Admin_Add_Research_Job, detailsForNewResearchJob);
                dispatchToNewJobTerms({ type: newJobTermsReducerActions.RESET_STATE });
                navigate("/home");

            } catch (error) {

                console.log(error);
                setDisableSaveJobBtn(false);

            }
            return
        }

        try {
            
            await myAxiosInstance.post(routes.Admin_Add_Job, newJobDetails);
            dispatchToNewJobTerms({ type: newJobTermsReducerActions.RESET_STATE });
            navigate("/home");

        } catch (error) {
            console.log(error);
            setDisableSaveJobBtn(false);
        }
        

    }
    
    return <>
        <div className="current__Job__Display">
            <span className={`title__Text display__Flex edit__Page__Font__Size`}>
                <> <b>Name of Job: </b> <input type={"text"} name={jobKeys.jobTitle} value={newJobDetails[jobKeys.jobTitle]} onChange={handleChange} /> </>
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Skills to be displayed: </b> <input type={"text"} name={jobKeys.skillsRequired} value={newJobDetails[jobKeys.skillsRequired]} onChange={handleChange} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Time period: </b> <input type={"text"} name={jobKeys.jobTimePeriod} value={newJobDetails[jobKeys.jobTimePeriod]} onChange={handleChange} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Type of job: </b> <DropdownButton currentSelection={newJobDetails[jobKeys.jobType] ? newJobDetails[jobKeys.jobType] : "Select type"} selections={["Freelancer", "Employee", "Internship", "Research Associate"]} handleSelectionClick={(selection) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.jobType]: selection } })} />
            </span>

            <CustomHr />

            {
                showInternJobType && <>

                <span className="display__Flex edit__Page__Font__Size">
                    <b>Full time or part-time job: </b> <DropdownButton currentSelection={newJobDetails.others[jobKeys.othersInternJobType] ? newJobDetails.others[jobKeys.othersInternJobType] : "Select type"} selections={["Full time", "Part time"]} handleSelectionClick={(selection) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.othersInternJobType]: selection } } })} />
                </span>

                <CustomHr />

                </>
            }

            {
                showResearchJobType && <>

                <span className="display__Flex edit__Page__Font__Size">
                    <b>Full time or part-time job: </b> <DropdownButton currentSelection={newJobDetails.others[jobKeys.othersInternJobType] ? newJobDetails.others[jobKeys.othersInternJobType] : "Select type"} selections={["Full time", "Part time"]} handleSelectionClick={(selection) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.othersResearchAssociateJobType]: selection } } })} />
                </span>

                <CustomHr />

                <span className="display__Flex edit__Page__Font__Size">
                    <b>Location: </b> <DropdownButton currentSelection={country ? country : "Select location"} selections={countriesData} handleSelectionClick={(selection) => setCountry(selection)} />
                </span>

                <CustomHr />

                {
                    country && <>
                        <span className="display__Flex edit__Page__Font__Size">
                            <b>City: </b> <DropdownButton currentSelection={state ? state : "Select city"} selections={allStates} handleSelectionClick={(selection) => setState(selection)} />
                        </span>

                        <CustomHr />
                    </>
                }

                </>
            }

            {
                showFreelancerJobType && <>

                <span className="display__Flex edit__Page__Font__Size">
                    <b>Full time or part-time job: </b> <DropdownButton currentSelection={newJobDetails.others[jobKeys.othersInternJobType] ? newJobDetails.others[jobKeys.othersInternJobType] : "Select type"} selections={["Task based", "Time based"]} handleSelectionClick={(selection) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.othersFreelancerJobType]: selection } } })} />
                </span>

                <CustomHr />

                </>
            }

            <span className="display__Flex edit__Page__Font__Size">
                <b>State of job: </b> <DropdownButton currentSelection={newJobDetails[jobKeys.jobIsActive] === true ? "Active" : "Inactive"} selections={["Active", "Inactive"]} handleSelectionClick={(selection) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.jobIsActive]: selection === "Active" ? true : false } })} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Payment: </b> <input type={"text"} name={jobKeys.paymentForJob} value={newJobDetails[jobKeys.paymentForJob]} onChange={(e) => setNewJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.paymentForJob]: e.target.value } } })} />
            </span>

            <CustomHr />

            <span className="description__Text display__Flex"><p><b>Job {jobKeys.jobDescription}</b>&#40;What this job entails&#41;</p></span>
            <textarea value={newJobDetails[jobKeys.jobDescription]} rows={3} name={jobKeys.jobDescription} onChange={handleChange}></textarea>

            <CustomHr />

            {
                !showResearchJobType && <>

                <span><b>General Terms</b></span>
                <div className="textarea__Div__Container edit__Page transparent__Bg">
                    
                    {
                        React.Children.toArray(newJobTerms[newJobStateDataNames.generalTerms].map((item, index) => {
                            if (index === 0) return <></>
                            
                            return <div className="new__Key__Value__Container">
                                <input type={'text'} placeholder={'KEY'} value={Object.keys(item || {})[0]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_KEY, payload: { stateToChange: jobKeys.generalTerms, currentKeyIndex: index, value: e.target.value } })} />
                                <input type={'text'} placeholder={'VALUE'} value={item[Object.keys(item || {})[0]]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_VALUE, payload: { stateToChange: jobKeys.generalTerms, currentKeyIndex: index, value: e.target.value } })} />
                                <AiFillCloseCircle className="remove__Key__Value__Icon" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.REMOVE_TERM, payload: { stateToChange: newJobStateDataNames.generalTerms, currentKeyIndex: index } })} />
                            </div>
                        }))
                    }
                        
                </div>

                <div>
                    <span className="display__Flex btn__Custom" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.ADD_NEW_TERM, payload: { stateToChange: newJobStateDataNames.generalTerms } })}>Add General Term<AiOutlinePlus /></span>
                </div>

                <CustomHr />

                </>
            }

            {
                !showResearchJobType && <>

                <span><b>Technical Specifications:</b></span>
                <div className="textarea__Div__Container edit__Page transparent__Bg">
                    {
                        React.Children.toArray(newJobTerms[newJobStateDataNames.technicalTerms].map((item, index) => {
                            if (index === 0) return <></>
                            
                            return <div className="new__Key__Value__Container">
                                <input type={'text'} placeholder={'KEY'} value={Object.keys(item || {})[0]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_KEY, payload: { stateToChange: jobKeys.technicalSpecifications, currentKeyIndex: index, value: e.target.value } })} />
                                <input type={'text'} placeholder={'VALUE'} value={item[Object.keys(item || {})[0]]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_VALUE, payload: { stateToChange: jobKeys.technicalSpecifications, currentKeyIndex: index, value: e.target.value } })} />
                                <AiFillCloseCircle className="remove__Key__Value__Icon" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.REMOVE_TERM, payload: { stateToChange: newJobStateDataNames.technicalTerms, currentKeyIndex: index } })} />
                            </div>
                        }))
                    }
                </div>

                <div>
                    <span className="display__Flex btn__Custom" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.ADD_NEW_TERM, payload: { stateToChange: newJobStateDataNames.technicalTerms } })}>Add Technical Specification<AiOutlinePlus /></span>
                </div>

                <CustomHr />

                </>
            }

            {
                !showResearchJobType && <>

                <span><b>Payment Terms:</b></span>
                <div className="textarea__Div__Container edit__Page transparent__Bg">
                    {
                        React.Children.toArray(newJobTerms[newJobStateDataNames.paymentTerms].map((item, index) => {
                            if (index === 0) return <></>
                            
                            return <div className="new__Key__Value__Container">
                                <input type={'text'} placeholder={'KEY'} value={Object.keys(item || {})[0]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_KEY, payload: { stateToChange: jobKeys.paymentTerms, currentKeyIndex: index, value: e.target.value } })} />
                                <input type={'text'} placeholder={'VALUE'} value={item[Object.keys(item || {})[0]]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_VALUE, payload: { stateToChange: jobKeys.paymentTerms, currentKeyIndex: index, value: e.target.value } })} />
                                <AiFillCloseCircle className="remove__Key__Value__Icon" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.REMOVE_TERM, payload: { stateToChange: newJobStateDataNames.paymentTerms, currentKeyIndex: index } })} />
                            </div>
                        }))
                    }
                </div>

                <div>
                    <span className="display__Flex btn__Custom" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.ADD_NEW_TERM, payload: { stateToChange: newJobStateDataNames.paymentTerms } })}>Add Payment Terms<AiOutlinePlus /></span>
                </div>

                <CustomHr />

                </>
            }

            {
                !showResearchJobType && <>

                <span><b>Workflow:</b></span>
                <div className="textarea__Div__Container edit__Page transparent__Bg">
                    {
                        React.Children.toArray(newJobTerms[newJobStateDataNames.workflowTerms].map((item, index) => {
                            if (index === 0) return <></>
                            
                            return <div className="new__Key__Value__Container">
                                <input type={'text'} placeholder={'KEY'} value={Object.keys(item || {})[0]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_KEY, payload: { stateToChange: jobKeys.workflowOfJob, currentKeyIndex: index, value: e.target.value } })} />
                                <input type={'text'} placeholder={'VALUE'} value={item[Object.keys(item || {})[0]]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_VALUE, payload: { stateToChange: jobKeys.workflowOfJob, currentKeyIndex: index, value: e.target.value } })} />
                                <AiFillCloseCircle className="remove__Key__Value__Icon" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.REMOVE_TERM, payload: { stateToChange: newJobStateDataNames.workflowTerms, currentKeyIndex: index } })} />
                            </div>
                        }))
                    }
                </div>

                <div>
                    <span className="display__Flex btn__Custom" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.ADD_NEW_TERM, payload: { stateToChange: newJobStateDataNames.workflowTerms } })}>Add Workflow<AiOutlinePlus /></span>
                </div>
                
                <CustomHr />
                
                </>
            }

            <span><b>Others:</b></span>
            <div className="textarea__Div__Container edit__Page transparent__Bg">
                {
                    React.Children.toArray(newJobTerms[newJobStateDataNames.otherTerms].map((item, index) => {
                        if (index === 0) return <></>
                        
                        return <div className="new__Key__Value__Container">
                            <input type={'text'} placeholder={'KEY'} value={Object.keys(item || {})[0]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_KEY, payload: { stateToChange: jobKeys.others, currentKeyIndex: index, value: e.target.value } })} />
                            <input type={'text'} placeholder={'VALUE'} value={item[Object.keys(item || {})[0]]} onChange={(e) => dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_VALUE, payload: { stateToChange: jobKeys.others, currentKeyIndex: index, value: e.target.value } })} />
                            <AiFillCloseCircle className="remove__Key__Value__Icon" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.REMOVE_TERM, payload: { stateToChange: newJobStateDataNames.otherTerms, currentKeyIndex: index } })} />
                        </div>
                    }))
                }
            </div>

            <div>
                <span className="display__Flex btn__Custom" onClick={() => dispatchToNewJobTerms({ type: newJobTermsReducerActions.ADD_NEW_TERM, payload: { stateToChange: newJobStateDataNames.otherTerms } })}>Add Other Term<AiOutlinePlus /></span>
            </div>

            <Button text={"Save"} className={"rel__Pos"} isDisabled={disableSaveJobBtn} handleClick={handleSaveNewJobBtnClick} />
            
        </div>
    </>
}

export default NewJobDetails;
