import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FiEdit } from 'react-icons/fi';

import "./style.css";
import DropdownButton from '../DropdownButton/Dropdown';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { formatDateAndTime } from '../../../../helpers/helpers';

const JobTile = ({ setShowCandidate, showTask, setShowCandidateTask, disableClick, candidateData, jobData, handleJobTileClick, taskData, hrPageActive, routeToJob, adminPageActive, handleEditIconClick, candidateForJobCount, jobsSkills, jobTitle, handleViewBtnClick }) => {

    const handleJobItemClick = ( currentData ) => {
        if (disableClick) return

        handleJobTileClick(currentData);

        if (showTask) return setShowCandidateTask(true);

        setShowCandidate(true);
    }

    return <>
        <div className={`job-tile-container job__Container ${adminPageActive ? 'rel__Pos' : ''}`} onClick={() => routeToJob ? handleJobTileClick(jobData) : handleJobItemClick(showTask ? taskData : candidateData)}>
            {
                jobData ? <>
                    <div className={`job__Details ${adminPageActive ? 'flex__Display' : ''}`}>
                        <h2><b>{jobData.title}</b></h2>
                        {
                            adminPageActive && <div className="edit__Job__Container" onClick={() => handleEditIconClick(jobData)}>
                                <FiEdit />
                                <span>Edit</span>  
                            </div>
                        }
                    </div>
                    <p>Skills: {jobData.skills}</p>
                    <div className={`job__Details__Container`}>
                        <div className="job__Detail__Item">
                            <BusinessCenterIcon />
                            <span>{jobData.time_period}</span>
                        </div>

                        <div className="job__Tile__Bottom__Row">
                            <span>{candidateForJobCount} candidates applied for this role</span>
                            <div className="view-application-btn" onClick={() => adminPageActive ? handleViewBtnClick(jobData) : routeToJob ? handleJobTileClick(jobData) : handleJobItemClick(showTask ? taskData : candidateData)}>
                                <span>View</span>
                                <ArrowForwardIcon />
                            </div>
                        </div>

                    </div>
                    
                    {
                        adminPageActive && 
                        
                        <DropdownButton
                            adminPageActive={true}
                            currentSelection={jobData.is_active ? 'Active' : 'Inactive'}
                            selections={['Active', 'Inactive']}
                        />
                    }
                    
                </> : 
                
                <>
                    <div className="applicant-details">
                        <h2><b>{showTask ? taskData.assigneeName : hrPageActive ? candidateData[mutableNewApplicationStateNames.applicant] && candidateData[mutableNewApplicationStateNames.applicant] : candidateData.applicant}</b></h2>
                        <p>{showTask ? taskData.dateOfTaskAssignment : formatDateAndTime(candidateData.others[mutableNewApplicationStateNames.others_date_applied])}</p>
                    </div>
                    <p>{hrPageActive ? `` : `Job: ${showTask ? taskData.jobApplied : jobTitle}` }</p>
                    <div className={`applicant-qualifications-container ${showTask ? 'task-active' : ''}`}>
                        {
                            showTask ? <></> :
                        
                            <div className="applicant-experience">
                                <BusinessCenterIcon />
                                <span>{candidateData.time_period}</span>
                            </div>
                        }

                        <div className="view-application-btn" onClick={() => routeToJob ? handleJobTileClick(jobData) : handleJobItemClick(showTask ? taskData : candidateData)}>
                            <span>View</span>
                            <ArrowForwardIcon />
                        </div>
                    </div>
                </>
            }
            
        </div>
    </>
}

export default JobTile;
