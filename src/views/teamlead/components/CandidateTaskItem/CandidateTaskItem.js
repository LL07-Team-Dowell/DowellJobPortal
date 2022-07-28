import { BiEdit } from "react-icons/bi";
import { formatDateAndTime } from "../../../../helpers/helpers";
import CustomHr from "../CustomHr/CustomHr";
import DropdownButton from "../DropdownButton/Dropdown";
import "./style.css";


const CandidateTaskItem = ({ taskNum, currentTask }) => {
    
    return <>
        <div className="candidate-task-container">
            <div className="candidate-task-status-container">
                <div className="candidate-task-details">
                    <span> {taskNum}. {currentTask.title} <BiEdit className="edit-icon" /> </span>
                </div>
                <DropdownButton currentSelection={currentTask.status} selections={["Completed", "Incomplete"]} />
            </div>
            <div className="candidate-task-date-container">
                <span>Given on {formatDateAndTime(currentTask.created)}</span>
                {formatDateAndTime(currentTask.updated) ? <span>on {formatDateAndTime(currentTask.updated)}</span> : <></>}
            </div>
        </div>
        <CustomHr />
    </>

}

export default CandidateTaskItem;
