import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./style.css";

const JobTile = ({ setShowCandidate, showTask, setShowCandidateTask, disableClick, candidateData, jobData, handleJobTileClick, taskData, hrPageActive, routeToJob }) => {

    const handleJobItemClick = ( currentData ) => {
        if (disableClick) return

        handleJobTileClick(currentData);

        if (showTask) return setShowCandidateTask(true);

        setShowCandidate(true);
    }

    return <>
        <div className="job-tile-container job__Container" onClick={() => routeToJob ? handleJobTileClick(jobData) : handleJobItemClick(showTask ? taskData : candidateData)}>
            {
                jobData ? <>
                    <div className="job__Details">
                        <h2><b>{jobData.title}</b></h2>
                    </div>
                    <p>Skills: {jobData.skills}</p>
                    <div className={`job__Details__Container`}>
                        <div className="job__Detail__Item">
                            <BusinessCenterIcon />
                            <span>{jobData.time_period}</span>
                        </div>

                        <div className="job__Tile__Bottom__Row">
                            <span>20 candidates applied for this role</span>
                            <div className="view-application-btn" onClick={() => routeToJob ? handleJobTileClick(jobData) : handleJobItemClick(showTask ? taskData : candidateData)}>
                                <span>View</span>
                                <ArrowForwardIcon />
                            </div>
                        </div>

                    </div>
                </> : 
                
                <>
                    <div className="applicant-details">
                        <h2><b>{showTask ? taskData.assigneeName : candidateData.name}</b></h2>
                        <p>{showTask ? taskData.dateOfTaskAssignment : candidateData.dateOfApplication}</p>
                    </div>
                    <p>{hrPageActive ? `Skills: ${candidateData.skills}` : `Job: ${showTask ? taskData.jobApplied : candidateData.jobApplied}` }</p>
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
