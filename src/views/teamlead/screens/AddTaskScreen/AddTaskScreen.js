import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "../../../../hooks/useClickOutside";
import { IoIosArrowBack } from "react-icons/io";

import "./style.css";
import { myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import { useNavigate } from "react-router-dom";


const AddTaskScreen = ({ teamMembers , closeTaskScreen, updateTasks, afterSelectionScreen, currentUser, editPage, setEditPage, taskToEdit }) => {

    const ref = useRef(null);
    const [ showTaskForm, setShowTaskForm ] = useState(false);
    const [ newTaskDetails, setNewTaskDetails ] = useState({
        "username": "",
        "title": "",
        "description": "",
        "status": "Incomplete",
    });
    const [ disabled, setDisabled ] = useState(true);
    const navigate = useNavigate();

    useClickOutside(ref, () => { closeTaskScreen(); !afterSelectionScreen && setEditPage(false) });

    useEffect (() => {

        if (newTaskDetails.username.length < 1) return setShowTaskForm(false);

        if ((newTaskDetails.title.length < 1) || (newTaskDetails.description.length < 1)) return setDisabled(true)
        
        setDisabled(false)

    }, [newTaskDetails])

    useEffect (() => {

        if (afterSelectionScreen) {
            setNewTaskDetails(prevValue => { return { ...prevValue, username: currentUser }});
            setShowTaskForm(true);
        }

    }, [afterSelectionScreen])

    useEffect(() => {
        if (editPage) {
            
            setNewTaskDetails({
                username: taskToEdit.user,
                title: taskToEdit.title,
                description: taskToEdit.description,
            });
            setShowTaskForm(true);

        }
    }, [editPage])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTaskDetails(prevValue => { return { ...prevValue, [name]: value } })
    }

    const handleMemberItemClick = (member) => {
        setNewTaskDetails(prevValue => { return { ...prevValue, "username": member }});
        setShowTaskForm(true); 
    }

    const handleNewTaskBtnClick = async () => {

        setDisabled(true);

        const dataToSend = { ...newTaskDetails };
        dataToSend.user = newTaskDetails.username;
        delete dataToSend["username"];

        try{

            await myAxiosInstance.post(routes.Add_New_Task, dataToSend);
            
            updateTasks(prevTasks => { return [ ...prevTasks, dataToSend ] } );
            closeTaskScreen();
            { afterSelectionScreen ? navigate("/tasks") : navigate("/task"); }

        } catch (err) {
            console.log(err);
            setDisabled(false);
        }

    }

    const handleUpdateTaskBtnClick = async () => {

        setDisabled(true);

        const dataToSend = { ...newTaskDetails };
        dataToSend.user = newTaskDetails.username;
        delete dataToSend["username"];

        try{

            await myAxiosInstance.post(routes.Update_Task + taskToEdit.id + "/", dataToSend);
            
            updateTasks(prevTasks => { return [ ...prevTasks.filter(task => task.id !== taskToEdit.id) ] } );
            updateTasks(prevTasks => { return [ ...prevTasks, dataToSend ] } );

            closeTaskScreen();
            navigate("/task");

        } catch (err) {
            console.log(err);
            setDisabled(false);
        }

    }

    console.log(teamMembers)

    return <>
        <div className="add__New__Task__Overlay">
            <div className="add__New__Task__Container" ref={ref}>
                <h1 className="title__Item">
                    {
                        showTaskForm ? <>
                            <IoIosArrowBack onClick={editPage ? () => { closeTaskScreen(); setEditPage(false); } : () => setShowTaskForm(false)} style={{ cursor: "pointer" }} />
                            { editPage ? "Edit Task": "New Task Details" }
                        </> : <>Add new task</>
                    }

                    <AiOutlineClose onClick={() => { closeTaskScreen(); !afterSelectionScreen && setEditPage(false) }} style={{ cursor: "pointer" }} />
                </h1>
                {
                    showTaskForm ? <>
                        <input type={"text"} placeholder={"Task Assignee"} value={newTaskDetails.username} readOnly={true} />
                        <input type={"text"} placeholder={"Task Title"} name="title" value={newTaskDetails.title} onChange={handleChange} />
                        <textarea placeholder="Task Description" name="description" value={newTaskDetails.description} onChange={handleChange}></textarea>
                        <button type={"button"} className="add__Task__Btn" disabled={disabled} onClick={() => editPage ? handleUpdateTaskBtnClick() : handleNewTaskBtnClick()}>{editPage ? "Update Task" : "Add Task"}</button>
                    </> :
                    
                    <>
                        {
                            teamMembers.length < 1 ? <>
                                <h4>Your team members will appear here</h4>
                            </> :
                            <>
                                <h4>Your team members ({teamMembers.length})</h4>
                                <div className="team__Members__Container">
                                    {
                                        React.Children.toArray(teamMembers.map(member => {
                                            return  <p className="team__Member__Item" onClick={() => handleMemberItemClick(member.applicant)}>{member.applicant}</p>
                                        }))
                                    }
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    </>
}

export default AddTaskScreen;
