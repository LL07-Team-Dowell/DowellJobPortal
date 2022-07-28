import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import ApplicantDetails from "../../components/ApplicationDetails/ApplicationDetails"
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CandidateTaskItem from "../../components/CandidateTaskItem/CandidateTaskItem";
import React, { useEffect, useState } from "react";

import "./style.css";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import { useNavigate } from "react-router-dom";


const TaskScreen = ({ currentUser, handleAddTaskBtnClick }) => {
    const [ userTasks, setUserTasks ] = useState([]);
    const [ currentProjects, setCurrentProjects ] = useState([]);
    const navigate = useNavigate();

    const fetchUserTasks = async () => {
        const response = await myAxiosInstance.get(routes.Tasks);
        setUserTasks(response.data.filter(task => task.user === currentUser));
        return
    }

    const fetchAllProjects = async () => {
        const response = await myAxiosInstance.get(routes.Projects);
        setCurrentProjects(response.data.map(project => project.project_name));
        return
    }

    useEffect(() => {

        if (!currentUser) return navigate(-1);

        fetchUserTasks();
        fetchAllProjects();

    }, [])

    return <>
        <div className="candidate-task-screen-container">
            
            <ApplicantIntro showTask={true} applicant={currentUser} />

            <CustomHr />

            <AssignedProjectDetails showTask={true} availableProjects={currentProjects} />

            {
                React.Children.toArray(userTasks.map((task, index) => {
                    return <CandidateTaskItem currentTask={task} taskNum={index + 1} />
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
