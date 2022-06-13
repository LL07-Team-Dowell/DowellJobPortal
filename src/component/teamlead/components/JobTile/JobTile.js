import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./style.css";

const JobTile = ({ setShowCandidate, showTask, setShowCandidateTask, disableClick, candidateData, handleJobTileClick, taskData }) => {

    const handleJobItemClick = ( currentData ) => {
        if (disableClick) return

        handleJobTileClick(currentData);

        if (showTask) return setShowCandidateTask(true);

        setShowCandidate(true);
    }

    return <>
        <div className="job-tile-container" onClick={() => handleJobItemClick(showTask ? taskData : candidateData)}>
            <div className="applicant-details">
                <h2><b>{showTask ? taskData.assigneeName : candidateData.name}</b></h2>
                <p>{showTask ? taskData.dateOfTaskAssignment : candidateData.dateOfApplication}</p>
            </div>
            <p>Job: {showTask ? taskData.jobApplied : candidateData.jobApplied}</p>
            <div className={`applicant-qualifications-container ${showTask ? 'task-active' : ''}`}>
                {
                    showTask ? <></> :
                
                    <div className="applicant-experience">
                        <BusinessCenterIcon />
                        <span>0-1Yr</span>
                    </div>
                }

                <div className="view-application-btn" onClick={() => handleJobItemClick(showTask ? taskData : candidateData)}>
                    <span>View</span>
                    <ArrowForwardIcon />
                </div>
            </div>
        </div>
    </>
}

export default JobTile;
