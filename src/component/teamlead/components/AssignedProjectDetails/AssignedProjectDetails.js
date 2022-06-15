import DropdownButton from "../DropdownButton/Dropdown";


import "./style.css";


const AssignedProjectDetails = ({ showTask }) => {
    return <>
        <div className="project-details-container">
            {
                showTask ? <p>Task Details</p> : <></>
            }
            <div className={`project-info-container ${showTask ? 'flex-end' : ''}`}>
                <p>Project</p>
                <DropdownButton currentSelection={'Hr Hiring'} />
            </div>
        </div>
    </>
}

export default AssignedProjectDetails;
