import { BiEdit } from "react-icons/bi";
import { formatDateAndTime } from "../../../../helpers/helpers";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import CustomHr from "../CustomHr/CustomHr";
import DropdownButton from "../DropdownButton/Dropdown";
import "./style.css";


const CandidateTaskItem = ({ taskNum, currentTask, candidatePage, handleEditBtnClick, updateTasks }) => {

    const handleTaskStatusUpdate = async (updateSelection) => {
        
        currentTask.status = updateSelection;

        try{

            await myAxiosInstance.post(routes.Update_Task + currentTask.id + "/", currentTask);
            
            updateTasks(prevTasks => prevTasks.map(task => {
                
                if (task.id === currentTask.id) {
                    return { ...task, status: updateSelection }
                }

                return task;

            }) );

        } catch (err) {
            console.log(err);
        }
    } 
    
    return <>
        <div className="candidate-task-container">
            <div className="candidate-task-status-container">
                <div className="candidate-task-details">
                    <span> {taskNum}. {currentTask.title} { !candidatePage && <BiEdit className="edit-icon" onClick={handleEditBtnClick} /> }</span>
                </div>
                <DropdownButton currentSelection={currentTask.status} selections={["Completed", "Incomplete"]} handleSelectionClick={handleTaskStatusUpdate} />
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
