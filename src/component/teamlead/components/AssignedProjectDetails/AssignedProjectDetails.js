import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./style.css";


const AssignedProjectDetails = ({ showTask }) => {
    return <>
        <div className="project-details-container">
            {
                showTask ? <p>Task Details</p> : <></>
            }
            <div className="project-info-container">
                <p>Project</p>
                <div className="project-name">
                    <span>Hr Hiring</span>
                    <KeyboardArrowDownIcon className="down-icon" />
                </div>
            </div>
        </div>
    </>
}

export default AssignedProjectDetails;
