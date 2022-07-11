import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import ApplicantDetails from "../../components/ApplicationDetails/ApplicationDetails"
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CandidateTaskItem from "../../components/CandidateTaskItem/CandidateTaskItem";
import React from "react";

import "./style.css";


const TaskScreen = ({ currentTaskToShow }) => {
    const assignedTasks = ["a", "b", "c"];

    return <>
        <div className="candidate-task-screen-container">
            
            <ApplicantIntro showTask={true} taskDetails={currentTaskToShow} />

            <ApplicantDetails />

            <CustomHr />

            <AssignedProjectDetails showTask={true} />

            {
                React.Children.toArray(currentTaskToShow.taskDetails.map((task, index) => {
                    return <CandidateTaskItem currentTask={task} taskNum={index + 1} />
                }))
            }

            <div className="add-task-btn">
                <span>Add</span>
                <AddCircleOutlineIcon />
            </div>

        </div>
    </>

}

export default TaskScreen;
