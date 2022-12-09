import { useState } from "react";
import { useCandidateTaskContext } from "../../../../contexts/CandidateTasksContext";
import { useNavigationContext } from "../../../../contexts/NavigationContext";
import JobLandingLayout from "../../../../layouts/CandidateJobLandingLayout/LandingLayout";
import ErrorPage from "../../../error/ErrorPage";
import AddTaskScreen from "../../../teamlead/screens/AddTaskScreen/AddTaskScreen";
import TaskScreen from "../../../teamlead/screens/TaskScreen/TaskScreen";
import TeamsScreen from "../TeamsScreen/TeamsScreen";
import UserScreen from "../UserScreen/UserScreen";

import "./style.css";


const AfterSelectionScreen = ({ user, assignedProject }) => {
    
    const [ showAddTaskModal, setShowAddTaskModal ] = useState(false);
    const { section } = useNavigationContext();
    const { setUserTasks } = useCandidateTaskContext();
    
    return <>
        {
            section === undefined || section === "tasks" ? <>
                <JobLandingLayout user={user} afterSelection={true}>
                {
                    showAddTaskModal && <AddTaskScreen teamMembers={[]} afterSelectionScreen={true} currentUser={user.username} closeTaskScreen={() => setShowAddTaskModal(false)} updateTasks={setUserTasks} />
                }

                <div className="candidate__After__Selection__Screen">
                    <TaskScreen currentUser={user.username} candidateAfterSelectionScreen={true} handleAddTaskBtnClick={() => setShowAddTaskModal(true)} assignedProject={assignedProject} />
                </div>
                </JobLandingLayout>
            </> : 

            section === "teams" ?

            <TeamsScreen currentUser={user} /> :

            section === "user" ?
            
            <UserScreen afterSelection={true} currentUser={user} /> :
            
            <ErrorPage />
        }
    </>
}

export default AfterSelectionScreen;
