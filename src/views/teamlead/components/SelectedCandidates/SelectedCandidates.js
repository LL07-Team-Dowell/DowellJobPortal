import Close from "@mui/icons-material/Close";
import FilterIcon from "../FilterIcon/FilterIcon";
import { IoCalendarClearOutline } from "react-icons/io5";

import "./style.css";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useRef, useState } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";


const SelectedCandidates = ({ showTasks, candidatesCount, tasksCount, hrPageActive, title }) => {
    const [showSortOptions, setShowSortOptions] = useState(false);
    const sortOptionsRef = useRef(null);

    useClickOutside(sortOptionsRef, () => setShowSortOptions(false));

    return <>

        <section className="selected-candidates-container">
            {
                showSortOptions && <div className="background__Overlay">

                </div>
            }
            {
                hrPageActive ? <>
                    <div className="selected-candidates-count-container">
                        <h2>{title}</h2>
                        <p>{`${candidatesCount ? candidatesCount : '0'} new candidates are applied for the roles` }</p>    
                    </div>
                </>: 

                <div className="selected-candidates-count-container">
                    <h2>{ showTasks ? "Task" : "Selected Candidates" }</h2>
                    <p>{ showTasks ? `Task given to ${tasksCount ? tasksCount : '0'} candidates`: `${candidatesCount ? candidatesCount : '0'} candidates are selected for the roles` }</p>    
                </div>
            }

            <div className="sort-candidates-container" onClick={() => {setShowSortOptions(true)}}>
                <FilterIcon />
                <p>Sort</p>
            </div>

            {
                showSortOptions && <>

                    <div className="sort__Candidates__Selection__Container" ref={sortOptionsRef}>
                        <Close className="close-icon" onClick={() => setShowSortOptions(false)} />
                        <div className="sort__Candidates__Selections">
                            <p>Sort By</p>
                            <div className="vertical-line"></div>
                            <ul>
                                <li>
                                    <span>Applied Date</span>
                                    <IoCalendarClearOutline />
                                </li>
                                <li>
                                    <span>Phone Number</span>
                                    <BsTelephone />
                                </li>
                                <li>
                                    <span>Email Address</span>
                                    <AiOutlineMail />
                                </li>
                                <li>
                                    <span>Skill</span>
                                    <IoCalendarClearOutline />
                                </li>
                            </ul>
                        </div>
                    </div>

                </>
            }
        </section>
    </>
}

export default SelectedCandidates;
