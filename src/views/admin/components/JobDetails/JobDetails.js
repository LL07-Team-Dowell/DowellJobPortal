import React, { useEffect, useState } from "react"
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr"
import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown"
import { jobKeys } from "../../utils/jobKeys"
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const JobDetails = ({ currentJob }) => {

    const [ showResearchJobType, setShowResearchJobType ] = useState(false);

    useEffect(() => {

        if (currentJob.typeof && currentJob.typeof === "Research Associate") return setShowResearchJobType(true);
        
        setShowResearchJobType(false);

    }, [currentJob.typeof])

    return <>
        <div className="current__Job__Display">
            <span className={`title__Text`}>
                <><b>{currentJob[jobKeys.jobTitle]}</b><p className="grey__Color">Dowell Ux living lab</p><CustomHr /> </>
            </span>

            <div className="grey__Color">
                <span>Skills: {currentJob[jobKeys.skillsRequired]}</span>
                <span className="display__Flex"><BusinessCenterIcon />{currentJob[jobKeys.jobTimePeriod]}</span>
            </div>
            
            {
                currentJob[jobKeys.jobType] && currentJob[jobKeys.jobType] === "Internship" && <>
                    <span className="display__Flex grey__Color">Job category: {currentJob.others[jobKeys.othersInternJobType]}</span>
                </>
            }

            <span className="display__Flex grey__Color">Payment <DropdownButton currentSelection={currentJob.others && currentJob.others[jobKeys.paymentForJob] ? currentJob.others[jobKeys.paymentForJob] : "$0"} removeDropDownIcon={true} /></span>

            <span className="description__Text display__Flex">
                <b>Job {jobKeys.jobDescription}</b>
                <div className="job__Type">{currentJob[jobKeys.jobType]}</div>
            </span>
            <textarea value={currentJob[jobKeys.jobDescription]} readOnly={true} rows={3} name={jobKeys.jobDescription}></textarea>

            {
                !showResearchJobType && <>
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
                </>
            }

            <span><b>Others</b></span>
            <div className={`textarea__Div__Container ${Object.keys(currentJob[jobKeys.others] || {}).length > 0 ? ( Object.keys(currentJob[jobKeys.others] || {}).length === 1 && Object.keys(currentJob[jobKeys.others] || {})[0] === jobKeys.paymentForJob ) ? 'transparent__Bg' : '' : 'transparent__Bg'}`}>
                {
                    React.Children.toArray(Object.keys(currentJob[jobKeys.others] || {}).map(key => {
                        if (key === jobKeys.paymentForJob) return <></>
                        if (key === jobKeys.othersInternJobType) return <></>
                        return <p>{currentJob[jobKeys.others][key]} <br /></p>
                    }))
                }
            </div>

        </div>
    </>

}

export default JobDetails;
