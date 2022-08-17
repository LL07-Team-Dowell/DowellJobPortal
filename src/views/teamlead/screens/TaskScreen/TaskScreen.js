import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CandidateTaskItem from "../../components/CandidateTaskItem/CandidateTaskItem";
import React, { useEffect, useState } from "react";

import "./style.css";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import { useNavigate } from "react-router-dom";
import { useCandidateTaskContext } from "../../../../contexts/CandidateTasksContext";


const TaskScreen = ({ currentUser, handleAddTaskBtnClick, candidateAfterSelectionScreen, handleEditBtnClick, className, assignedProject }) => {
    const { userTasks, setUserTasks } = useCandidateTaskContext();
    const navigate = useNavigate();

    const fetchUserTasks = async () => {
        const response = await myAxiosInstance.get(routes.Tasks);
        setUserTasks(response.data.filter(task => task.user === currentUser));
        return
    }

    useEffect(() => {

        if (!currentUser) return navigate(-1);

        fetchUserTasks();

    }, [])

    return <>
        <div className={`candidate-task-screen-container ${className ? className : ''}`}>
            
            { 
                !candidateAfterSelectionScreen &&
                <>
                    <ApplicantIntro showTask={true} applicant={currentUser} />

                    <CustomHr />
                </>
            }

            <AssignedProjectDetails showTask={true} availableProjects={null} removeDropDownIcon={true} assignedProject={assignedProject} />

            {
                React.Children.toArray(userTasks.map((task, index) => {
                    return <CandidateTaskItem currentTask={task} taskNum={index + 1} candidatePage={candidateAfterSelectionScreen} handleEditBtnClick={() => handleEditBtnClick(task)} updateTasks={setUserTasks} />
                }))
            }

            <div className="add-task-btn" onClick={handleAddTaskBtnClick}>
                <span>Add</span>
                <AddCircleOutlineIcon />
            </div>

        </div>
    </>

}

export default TaskScreen;
