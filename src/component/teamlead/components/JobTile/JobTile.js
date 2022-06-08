import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./style.css";

const JobTile = ({ setShowCandidate, showTask, setShowCandidateTask, disableClick }) => {
    return <>
        <div className="job-tile-container" onClick={() => disableClick ? {} :  showTask ? setShowCandidateTask(true) : setShowCandidate(true)}>
            <div className="applicant-details">
                <h2>Faizan</h2>
                <p>10th April</p>
            </div>
            <p>Job: Python</p>
            <div className={`applicant-qualifications-container ${showTask ? 'task-active' : ''}`}>
                {
                    showTask ? <></> :
                
                    <div className="applicant-experience">
                        <BusinessCenterIcon />
                        <span>0-1Yr</span>
                    </div>
                }

                <div className="view-application-btn" onClick={() => showTask ? setShowCandidateTask(true) : setShowCandidate(true)}>
                    <span>View</span>
                    <ArrowForwardIcon />
                </div>
            </div>
        </div>
    </>
}

export default JobTile;
