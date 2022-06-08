import { BiEdit } from "react-icons/bi";
import CustomHr from "../CustomHr/CustomHr";
import DropdownButton from "../DropdownButton/Dropdown";
import "./style.css";


const CandidateTaskItem = ({ taskNum }) => {
    
    return <>
        <div className="candidate-task-container">
            <div className="candidate-task-status-container">
                <div className="candidate-task-details">
                    <span> {taskNum}. I will eat rice <BiEdit className="edit-icon" /> </span>
                </div>
                <DropdownButton currentSelection={'Completed'} selections={["Completed", "Incomplete"]} />
            </div>
            <div className="candidate-task-date-container">
                <span>Given on 25-04-22</span>
                <span>on 09-05-22</span>
            </div>
        </div>
        <CustomHr />
    </>

}

export default CandidateTaskItem;
