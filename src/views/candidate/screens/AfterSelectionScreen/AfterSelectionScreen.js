import { useState } from "react";
import { useCandidateTaskContext } from "../../../../contexts/CandidateTasksContext";
import { useNavigationContext } from "../../../../contexts/NavigationContext";
import ErrorPage from "../../../error/ErrorPage";
import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation";
import AddTaskScreen from "../../../teamlead/screens/AddTaskScreen/AddTaskScreen";
import TaskScreen from "../../../teamlead/screens/TaskScreen/TaskScreen";
import Navbar from "../../components/Navbar/Navbar";
import { afterSelectionLinks } from "../../utils/afterSelectionLinks";

import "./style.css";


const AfterSelectionScreen = ({ user }) => {
    
    const [ showAddTaskModal, setShowAddTaskModal ] = useState(false);
    const { section } = useNavigationContext();
    const { setUserTasks } = useCandidateTaskContext();
    
    return <>
        {
            section === undefined || section === "tasks" ? <>
                {
                    showAddTaskModal && <AddTaskScreen teamMembers={[]} afterSelectionScreen={true} currentUser={user.username} closeTaskScreen={() => setShowAddTaskModal(false)} updateTasks={setUserTasks} />
                }

                <Navbar title={"Tasks"} />

                <div className="candidate__After__Selection__Screen">
                    <TaskScreen currentUser={user.username} candidateAfterSelectionScreen={true} handleAddTaskBtnClick={() => setShowAddTaskModal(true)} />
                </div>
                
                <BottomNavigationBar links={afterSelectionLinks} />
            </> : 
            
            <ErrorPage />
        }

    </>
}

export default AfterSelectionScreen;
