import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import ApplicantDetails from "../../components/ApplicationDetails/ApplicationDetails"
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import "./style.css";
import CandidateTaskItem from "../../components/CandidateTaskItem/CandidateTaskItem";
import React from "react";


const TaskScreen = () => {
    const assignedTasks = ["a", "b", "c"];

    return <>
        <div className="candidate-task-screen-container">
            
            <ApplicantIntro />

            <ApplicantDetails />

            <CustomHr />

            <AssignedProjectDetails showTask={true} />

            {
                React.Children.toArray(assignedTasks.map((task, index) => {
                    return <CandidateTaskItem taskNum={index + 1} />
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
