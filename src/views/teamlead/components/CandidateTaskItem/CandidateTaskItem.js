import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { formatDateAndTime } from "../../../../helpers/helpers";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import CustomHr from "../CustomHr/CustomHr";
import DropdownButton from "../DropdownButton/Dropdown";
import "./style.css";


const CandidateTaskItem = ({ taskNum, currentTask, candidatePage, handleEditBtnClick, updateTasks }) => {

    const [ currentTaskStatus, setCurrentTaskStatus ] = useState("");

    useEffect(() => {
        
        setCurrentTaskStatus(currentTask.status);

    }, [currentTask.status])

    const handleTaskStatusUpdate = async (updateSelection) => {

        currentTask.status = updateSelection;
        setCurrentTaskStatus(updateSelection)

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
            setCurrentTaskStatus("");
        }
    } 
    
    return <>
        <div className="candidate-task-container">
            <div className="candidate-task-status-container">
                <div className="candidate-task-details">
                    <span> {taskNum}. Task: {currentTask.title} { !candidatePage && <BiEdit className="edit-icon" onClick={handleEditBtnClick} /> }</span>
                    <span className="task__Description">Task Description: {currentTask.description}</span>
                </div>
                
                <div className="task__Status__Container">
                    {
                        candidatePage ? <>
                            <DropdownButton currentSelection={currentTask.status} removeDropDownIcon={true} />
                        </> : <>
                            <DropdownButton className={currentTaskStatus === "Complete" && "task__Active"} currentSelection={"Complete"} removeDropDownIcon={true} handleClick={handleTaskStatusUpdate} />
                            <DropdownButton className={currentTaskStatus === "Incomplete" && "task__Active"} currentSelection={"Incomplete"} removeDropDownIcon={true} handleClick={handleTaskStatusUpdate} />
                        </>
                    }
                    
                </div>
                
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
