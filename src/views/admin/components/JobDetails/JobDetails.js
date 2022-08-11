import React, { useEffect } from "react"
import { formatDateAndTime } from "../../../../helpers/helpers"
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr"
import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown"
import { jobKeys } from "../../utils/jobKeys"
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const JobDetails = ({ currentJob, editPage, updateJobDetails }) => {

    const handleChange = (e, stateName) => {
        const { name, value } = e.target;
        if (stateName) {
            updateJobDetails(prevValue => {
                return { ...prevValue, [stateName]: { ...prevValue[stateName], [name]: value } }
            })
            return
        }
        updateJobDetails(prevValue => {
            return { ...prevValue, [name]: value }
        })
    }  
    
    const updateOptions = (currentStateKey) => {
        Object.keys(currentJob[currentStateKey] || {}).map(key => {
            if (currentJob[currentStateKey][key] === "") {
                const currentState = { ...currentJob[currentStateKey] };
                const currentKeys = Object.keys(currentState || {});
                const keysToUpdate = currentKeys.slice(currentKeys.findIndex(stateKey => stateKey === key) + 1);
                
                delete currentState[key];
                
                keysToUpdate.forEach( _ => {
                    if (currentState[Number(_) - 1] === undefined) return;

                    currentState[Number(_) - 1] = currentState[Number(_)];

                });

                console.log(currentState)

                delete currentState[keysToUpdate.length - 1];

                if (!updateJobDetails) return

                updateJobDetails(prevValue => {
                    return { ...prevValue, [currentStateKey]: currentState }
                })
            }
        })
    }

    useEffect(() => {
        
        updateOptions(jobKeys.generalTerms);
        updateOptions(jobKeys.paymentTerms);
        updateOptions(jobKeys.technicalSpecifications);
        updateOptions(jobKeys.workflowOfJob);
        updateOptions(jobKeys.others);

    }, [currentJob[jobKeys.generalTerms], currentJob[jobKeys.workflowOfJob], currentJob[jobKeys.technicalSpecifications], currentJob[jobKeys.paymentTerms]])

    
    return <>
        <div className="current__Job__Display">
            {
                editPage ? <>
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

                    <span className="display__Flex edit__Page__Font__Size">
                        <b>State of job: </b> <DropdownButton currentSelection={currentJob[jobKeys.jobIsActive] === true ? "Active" : "InActive"} selections={["Active", "Inactive"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.jobIsActive]: selection === "Active" ? true : false } })} />
                    </span>

                    <CustomHr />

                    <span className="display__Flex edit__Page__Font__Size">
                        <b>Payment: </b> <DropdownButton currentSelection={currentJob.others && currentJob.others[jobKeys.paymentForJob] ? currentJob.others[jobKeys.paymentForJob] : "$30"} selections={["$30", "$35"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [jobKeys.others]: { ...prevValue["others"], [jobKeys.paymentForJob]: selection } } })} />
                    </span>

                    <CustomHr />

                    <span className="description__Text display__Flex"><p><b>Job {jobKeys.jobDescription}</b></p></span>
                    <textarea value={currentJob[jobKeys.jobDescription]} rows={3} name={jobKeys.jobDescription} onChange={handleChange}></textarea>

                    <CustomHr />

                    <span><b>General Terms</b></span>
                    <div className={`textarea__Div__Container edit__Page ${Object.keys(currentJob[jobKeys.generalTerms] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.generalTerms] || {}).map(key => {
                                return <p>{key}. <input type={'text'} name={key} value={currentJob[jobKeys.generalTerms][key]} onChange={(e) => handleChange(e, jobKeys.generalTerms)} /> </p>
                            }))
                        }
                    </div>

                    <CustomHr />

                    <span><b>Technical Specifications:</b></span>
                    <div className={`textarea__Div__Container edit__Page ${Object.keys(currentJob[jobKeys.technicalSpecifications] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.technicalSpecifications] || {}).map(key => {
                                return <p>{key}. <input type={'text'} value={currentJob[jobKeys.technicalSpecifications][key]} onChange={(e) => handleChange(e, jobKeys.technicalSpecifications)} /></p>
                            }))
                        }
                    </div>

                    <CustomHr />

                    <span><b>Payment Terms:</b></span>
                    <div className={`textarea__Div__Container edit__Page  ${Object.keys(currentJob[jobKeys.paymentTerms] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.paymentTerms] || {}).map(key => {
                                return <p>{key}. <input type={'text'} name={key} value={currentJob[jobKeys.paymentTerms][key]} onChange={(e) => handleChange(e, jobKeys.paymentTerms)} /></p>
                            }))
                        }
                    </div>

                    <CustomHr />

                    <span><b>Workflow:</b></span>
                    <div className={`textarea__Div__Container edit__Page  ${Object.keys(currentJob[jobKeys.workflowOfJob] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.workflowOfJob] || {}).map(key => {
                                return <p>{key}. <input type={'text'} value={currentJob[jobKeys.workflowOfJob][key]} onChange={(e) => handleChange(e, jobKeys.workflowOfJob)} /></p>
                            }))
                        }
                    </div>
                    
                    <CustomHr />

                    <span><b>Others:</b></span>
                    <div className={`textarea__Div__Container edit__Page  ${Object.keys(currentJob[jobKeys.others] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.others] || {}).map(key => {
                                return <p>{key}. <input type={'text'} value={currentJob[jobKeys.others][key]} onChange={(e) => handleChange(e, jobKeys.others)} /></p>
                            }))
                        }
                    </div>
                </> :
                
                <>
                    <span className={`title__Text`}>
                        <><b>{currentJob[jobKeys.jobTitle]}</b><p className="grey__Color">Dowell Ux living lab</p><CustomHr /> </>
                    </span>

                    <div className="grey__Color">
                        <span>Skills: {currentJob[jobKeys.skillsRequired]}</span>
                        <span className="display__Flex"><BusinessCenterIcon />{currentJob[jobKeys.jobTimePeriod]}</span>
                    </div>

                    <span className="display__Flex grey__Color">Payment <DropdownButton currentSelection={currentJob.others && currentJob.others[jobKeys.paymentForJob] ? currentJob.others[jobKeys.paymentForJob] : "$30"} removeDropDownIcon={true} /></span>
                    
                    <span className="description__Text display__Flex">
                        <b>Job {jobKeys.jobDescription}</b>
                        <div className="job__Type">{currentJob[jobKeys.jobType]}</div>
                    </span>
                    <textarea value={currentJob[jobKeys.jobDescription]} readOnly={true} rows={3} name={jobKeys.jobDescription}></textarea>

                    <span><b>General Terms</b></span>
                    <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.generalTerms] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.generalTerms] || {}).map(key => {
                                return <p>{key}. {currentJob[jobKeys.generalTerms][key]} <br /></p>
                            }))
                        }
                    </div>

                    <span><b>Technical Specifications</b></span>
                    <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.technicalSpecifications] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.technicalSpecifications] || {}).map(key => {
                                return <p>{key}. {currentJob[jobKeys.technicalSpecifications][key]} <br /></p>
                            }))
                        }
                    </div>

                    <span><b>Payment Terms</b></span>
                    <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.paymentTerms] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.paymentTerms] || {}).map(key => {
                                return <p>{key}. {currentJob[jobKeys.paymentTerms][key]} <br /></p>
                            }))
                        }
                    </div>

                    <span><b>Workflow</b></span>
                    <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.workflowOfJob] || {}).length > 0 ? '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.workflowOfJob] || {}).map(key => {
                                return <p>{key}. {currentJob[jobKeys.workflowOfJob][key]} <br /></p>
                            }))
                        }
                    </div>

                    <span><b>Others</b></span>
                    <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.others] || {}).length > 0 ? ( Object.keys(currentJob[jobKeys.others] || {}).length === 1 && Object.keys(currentJob[jobKeys.others] || {})[0] === jobKeys.paymentForJob ) ? 'transparent__Bg' : '' : 'transparent__Bg'}`}>
                        {
                            React.Children.toArray(Object.keys(currentJob[jobKeys.others] || {}).map(key => {
                                if (key === jobKeys.paymentForJob) return <></>
                                return <p>{currentJob[jobKeys.others][key]} <br /></p>
                            }))
                        }
                    </div>

                </>
            }

        </div>
    </>

}

export default JobDetails;
