import { BiEdit } from "react-icons/bi";
import CustomHr from "../CustomHr/CustomHr";
import DropdownButton from "../DropdownButton/Dropdown";
import "./style.css";


const CandidateTaskItem = ({ taskNum, currentTask }) => {
    
    return <>
        <div className="candidate-task-container">
            <div className="candidate-task-status-container">
                <div className="candidate-task-details">
                    <span> {taskNum}. {currentTask.taskGiven} <BiEdit className="edit-icon" /> </span>
                </div>
                <DropdownButton currentSelection={currentTask.status} selections={["Completed", "Incomplete"]} />
            </div>
            <div className="candidate-task-date-container">
                <span>Given on {currentTask.dateGiven}</span>
                {currentTask.completionDate ? <span>on {currentTask.completionDate}</span> : <></>}
            </div>
        </div>
        <CustomHr />
    </>

}

export default CandidateTaskItem;
