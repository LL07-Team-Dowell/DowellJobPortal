import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { excludedApplicantInfo, mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';

import "./style.css";


const ApplicantDetails = ({ hrPageActive, applicantData, candidateApplicationPageActive, showApplicationDetails, handleViewApplicationBtnClick }) => {
    return <>
        { 
            !candidateApplicationPageActive && <div className={`selected-applicant-details ${showApplicationDetails ? 'teamlead__Page' : ''}`} onClick={handleViewApplicationBtnClick}>
                <p>Application details: </p>
                { !hrPageActive &&<span>View <KeyboardArrowDownIcon className="down-icon" /></span> }
            </div>
        }

        {
            (hrPageActive || candidateApplicationPageActive || showApplicationDetails) && <div className={`selected-applicant-info ${candidateApplicationPageActive ? 'candidate__Page' : showApplicationDetails ? 'teamlead__Page' : ''}`}>
                {
                    !applicantData ?
                    <>
                        <span>Name</span>
                        <span>Country</span>
                        <span>Email ID</span>
                        <span>Freelance Platform</span>
                        <span>Profile Link of your Freelance</span>
                        <span>Academic Qualification</span>
                        <span>Discord Id</span>
                        <span>Comments, remarks</span>
                        <span>Speed test</span>
                    </> : 
                    <>
                    {
                        React.Children.toArray(Object.keys(applicantData || {}).map(key => {
                            
                            if ( excludedApplicantInfo.includes(key) || (typeof applicantData[key] === "object") ) return <></>

                            if (typeof applicantData[key] === "object") return <></>

                            if (key === mutableNewApplicationStateNames.applicant) return <span>Name: {applicantData[key]}</span>
                            if (key === mutableNewApplicationStateNames.country) return <span>Country: {applicantData[key]}</span>
                            if (key === mutableNewApplicationStateNames.freelancePlatform) return <span>Freelance Platform: {applicantData[key]}</span>
                            if (key === mutableNewApplicationStateNames.freelancePlatformUrl) return <span>Freelance Platform Url: {applicantData[key]}</span>
                            
                            return <span>{key}: {applicantData[key]}</span>

                        }))
                    }

                    {
                        React.Children.toArray(Object.keys(applicantData.others || {}).map(key => {

                            if ( excludedApplicantInfo.includes(key) ) return <></>

                            if (key === mutableNewApplicationStateNames.others_property_qualification) return <span>Academic Qualification: {applicantData.others[key]}</span>
                            if (key === mutableNewApplicationStateNames.others_property_qualification_type) return <span>Qualification Type: {applicantData.others[key]}</span>
                            if (key === mutableNewApplicationStateNames.others_comments) return <span>Comments: {applicantData.others[key]}</span>
                            
                            return <span>{key}: {applicantData.others[key]}</span>
                        }))
                    }
                    </>
                }
                
            </div>
        }
    </>
}

export default ApplicantDetails;
