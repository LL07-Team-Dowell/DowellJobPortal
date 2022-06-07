import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import ApplicantDetails from "../../components/ApplicationDetails/ApplicationDetails"
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import "./style.css";


const TaskScreen = () => {

    return <>
        <div className="candidate-task-screen-container">
            
            <ApplicantIntro />

            <ApplicantDetails />

            <CustomHr />

            <AssignedProjectDetails showTask={true} />

            <div className="add-task-btn">
                <span>Add</span>
                <AddCircleOutlineIcon />
            </div>
        </div>
    </>

}

export default TaskScreen;
