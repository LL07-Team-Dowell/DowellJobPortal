import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { newJobStateDataNames, useNewJobTermsContext } from "../../../../contexts/NewJobTermsContext";
import { newJobTermsReducerActions } from "../../../../reducers/NewJobTermsReducer";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown";
import { jobKeys } from "../../utils/jobKeys";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const EditJobDetails = ({ currentJob, currentJobState, updateJobDetails }) => {
    
    const { newJobTerms, dispatchToNewJobTerms } = useNewJobTermsContext();
    const [ loading, setLoading ] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        updateJobDetails(prevValue => {
            return { ...prevValue, [name]: value }
        })
    }

    useEffect (() => {

        if (!currentJobState) return

        const currentJobTerms = {
            generalTerms: [{}],
            workflowTerms: [{}],
            paymentTerms: [{}],
            technicalTerms: [{}],
            otherTerms: [{}],
        };

        let emptyObj = {};
        
        Object.keys(currentJobState[jobKeys.generalTerms] || {}).forEach(key => {
            emptyObj[key] = currentJobState[jobKeys.generalTerms][key];
            currentJobTerms[newJobStateDataNames.generalTerms].push(emptyObj);
            emptyObj = {};
        })

        Object.keys(currentJobState[jobKeys.technicalSpecifications] || {}).forEach(key => {
            emptyObj[key] = currentJobState[jobKeys.technicalSpecifications][key];
            currentJobTerms[newJobStateDataNames.technicalTerms].push(emptyObj);
            emptyObj = {};
        })

        Object.keys(currentJobState[jobKeys.paymentTerms] || {}).forEach(key => {
            emptyObj[key] = currentJobState[jobKeys.paymentTerms][key];
            currentJobTerms[newJobStateDataNames.paymentTerms].push(emptyObj);
            emptyObj = {};
        })

        Object.keys(currentJobState[jobKeys.workflowOfJob] || {}).forEach(key => {
            emptyObj[key] = currentJobState[jobKeys.workflowOfJob][key];
            currentJobTerms[newJobStateDataNames.workflowTerms].push(emptyObj);
            emptyObj = {};
        })

        Object.keys(currentJobState[jobKeys.others] || {}).forEach(key => {
            emptyObj[key] = currentJobState[jobKeys.others][key];
            currentJobTerms[newJobStateDataNames.otherTerms].push(emptyObj);
            emptyObj = {};
        })

        dispatchToNewJobTerms({ type: newJobTermsReducerActions.UPDATE_STATE, payload: { newState: currentJobTerms }});
        setLoading(false);

    }, [])

    useEffect(() => {

        const removePropertyWithEmptyValue = (obj) => {
            for (const key in obj) {
                if (obj[key] === null || obj[key] === "") {
                    delete obj[key]
                }
            }
            return obj
        }

        const allGenTerms = removePropertyWithEmptyValue(Object.assign({}, ...newJobTerms[newJobStateDataNames.generalTerms]));
        updateJobDetails(prevDetails => { return { ...prevDetails, "general_terms": allGenTerms } });

        const allTechTerms = removePropertyWithEmptyValue(Object.assign({}, ...newJobTerms[newJobStateDataNames.technicalTerms]));
        updateJobDetails(prevDetails => { return { ...prevDetails, "Technical_Specifications": allTechTerms } });

        const allPayTerms = removePropertyWithEmptyValue(Object.assign({}, ...newJobTerms[newJobStateDataNames.paymentTerms]));
        updateJobDetails(prevDetails => { return { ...prevDetails, "Payment_terms": allPayTerms } });

        const allWorkTerms = removePropertyWithEmptyValue(Object.assign({}, ...newJobTerms[newJobStateDataNames.workflowTerms]));
        updateJobDetails(prevDetails => { return { ...prevDetails, "workflow": allWorkTerms } });

        const allOtherTerms = removePropertyWithEmptyValue(Object.assign({}, ...newJobTerms[newJobStateDataNames.otherTerms]));
        if (currentJob.others[jobKeys.paymentForJob]) allOtherTerms[jobKeys.paymentForJob] = currentJob.others[jobKeys.paymentForJob]
        if (currentJob.others[jobKeys.othersEmployeeJobType]) allOtherTerms[jobKeys.othersEmployeeJobType] = currentJob.others[jobKeys.othersEmployeeJobType]
        updateJobDetails(prevDetails => { return { ...prevDetails, "others": allOtherTerms } });

        if (Object.keys(allGenTerms || {}).length === 0) updateJobDetails(prevDetails => { return { ...prevDetails, "general_terms": null } });
        if (Object.keys(allTechTerms || {}).length === 0) updateJobDetails(prevDetails => { return { ...prevDetails, "Technical_Specifications": null } });
        if (Object.keys(allPayTerms || {}).length === 0) updateJobDetails(prevDetails => { return { ...prevDetails, "Payment_terms": null } });
        if (Object.keys(allWorkTerms || {}).length === 0) updateJobDetails(prevDetails => { return { ...prevDetails, "workflow": null } });

    }, [newJobTerms])


    if (loading) return <LoadingSpinner />

    return <>
        <div className="current__Job__Display">
            <span className={`title__Text display__Flex edit__Page__Font__Size`}>
                <> <b>Name of Job: </b> <input type={"text"} name={jobKeys.jobTitle} value={currentJob[jobKeys.jobTitle]} onChange={handleChange} /> </>
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Skills to be displayed: </b> <input type={"text"} name={jobKeys.skillsRequired} value={currentJob[jobKeys.skillsRequired]} onChange={handleChange} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Time period: </b> <input type={"text"} name={jobKeys.jobTimePeriod} value={currentJob[jobKeys.jobTimePeriod]} onChange={handleChange} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Type of job: </b> <DropdownButton currentSelection={currentJob[jobKeys.jobType] ? currentJob[jobKeys.jobType] : "Freelance"} selections={["Freelance", "Employee", "Internship"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.jobType]: selection } })} />
            </span>

            <CustomHr />

            {
                currentJob[jobKeys.jobType] && currentJob[jobKeys.jobType] === "Employee" && <>
                    <span className="display__Flex edit__Page__Font__Size">
                    <b>Full time or part-time job: </b> <DropdownButton currentSelection={currentJob.others[jobKeys.othersEmployeeJobType] ? currentJob.others[jobKeys.othersEmployeeJobType] : "Select type"} selections={["Full time", "Part time"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.paymentForJob]: selection } } })} />
                    </span>

                    <CustomHr />
                </>
            }

            <span className="display__Flex edit__Page__Font__Size">
                <b>State of job: </b> <DropdownButton currentSelection={currentJob[jobKeys.jobIsActive] === true ? "Active" : "Inactive"} selections={["Active", "Inactive"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.jobIsActive]: selection === "Active" ? true : false } })} />
            </span>

            <CustomHr />

            <span className="display__Flex edit__Page__Font__Size">
                <b>Payment: </b> <input type={"text"} name={jobKeys.paymentForJob} value={currentJob.others[jobKeys.paymentForJob]} onChange={(e) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.paymentForJob]: e.target.value } } })} />
            </span>

            <CustomHr />

            <span className="description__Text display__Flex"><p><b>Job {jobKeys.jobDescription}</b>&#40;What this job entails&#41;</p></span>
            <textarea value={currentJob[jobKeys.jobDescription]} rows={3} name={jobKeys.jobDescription} onChange={handleChange}></textarea>

            <CustomHr />

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

            <span><b>Others:</b></span>
            <div className="textarea__Div__Container edit__Page transparent__Bg">
                {
                    React.Children.toArray(newJobTerms[newJobStateDataNames.otherTerms].map((item, index) => {
                        if (index === 0) return <></>
                        if (Object.keys(item)[0] === jobKeys.paymentForJob) return <></>
                        if (Object.keys(item)[0] === jobKeys.othersEmployeeJobType) return <></>
                        
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

        </div>
    </>
}

export default EditJobDetails;
