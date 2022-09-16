import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import { useCandidateTaskContext } from "../../../../contexts/CandidateTasksContext";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import ApplicantIntro from "../../../teamlead/components/ApplicantIntro/ApplicantIntro";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import AssignedProjectDetails from "../../../teamlead/components/AssignedProjectDetails/AssignedProjectDetails";
import CandidateTaskItem from "../../../teamlead/components/CandidateTaskItem/CandidateTaskItem";
import { getDaysInMonth } from "../../../../helpers/helpers";


const AttendanceScreen = ({ currentUser, className, assignedProject }) => {
    const { userTasks, setUserTasks } = useCandidateTaskContext();
    const navigate = useNavigate();
    const [ tasksToShow, setTasksToShow ] = useState([]);
    const [ daysInMonth, setDaysInMonth ] = useState(0);
    const [ currentMonth, setCurrentMonth ] = useState("");
    const [ datesToStyle, setDatesToStyle ] = useState([]);

    const fetchUserTasks = async () => {
        const response = await myAxiosInstance.get(routes.Tasks);
        const tasksForCurrentUser = response.data.filter(task => task.user === currentUser).reverse();
        setUserTasks(tasksForCurrentUser);
        setTasksToShow(tasksForCurrentUser.filter(task => new Date(task.created).toDateString() === new Date().toDateString()));

        const datesUserHasTask = [...new Set(tasksForCurrentUser.map(task => [ new Date(task.created) ])).values()].flat();
        setDatesToStyle(datesUserHasTask);
        return
    }

    useEffect(() => {

        if (!currentUser) return navigate(-1);

        fetchUserTasks();

        const today = new Date();

        setDaysInMonth(getDaysInMonth(today));
        setCurrentMonth(today.toLocaleDateString("en-us", {month: "long"}));

    }, [])

    useEffect(() => {

        setTasksToShow(userTasks.filter(task => new Date(task.created).toDateString() === new Date().toDateString()));
    
    }, [userTasks])

    const isSameDay = (a, b) => differenceInCalendarDays(a, b) === 0;

    const tileClassName = ({ date, view }) => {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToStyle.find(dDate => isSameDay(dDate, date))) {
                return 'task__Indicator';
            }
        }
    }
    
    const handleDateChange = (dateSelected) => {

        setDaysInMonth(getDaysInMonth(dateSelected));
        
        setTasksToShow(userTasks.filter(task => new Date(task.created).toDateString() === dateSelected.toDateString()));
        setCurrentMonth(dateSelected.toLocaleDateString("en-us", {month: "long"}));

        console.log(daysInMonth)
    }

    return <>
        <div className={`candidate-task-screen-container ${className ? className : ''}`}>
            
            <ApplicantIntro showTask={true} applicant={currentUser} />

            <CustomHr />

            <AssignedProjectDetails showTask={true} availableProjects={null} removeDropDownIcon={true} assignedProject={assignedProject} hrAttendancePageActive={true} />

            <div className="all__Tasks__Container">
                <Calendar onChange={handleDateChange} tileClassName={tileClassName} />
            </div>

        </div>
    </>

}

export default AttendanceScreen;
