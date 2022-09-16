import Close from "@mui/icons-material/Close";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";

import "./style.css";


const SideNavigationBar = ({ className, sideNavRef, closeSideNavbar, isNotificationEnabled, setNotificationStatus, hrPageActive }) => {
    const navigate = useNavigate();

    return <>
        <div ref={sideNavRef} className={`sidebar-nav-container ${className ? className : ''}`}>
            <Close className="close-icon" onClick={closeSideNavbar} />
            <ul>
                <CustomHr />

                <Link to={''}>
                    <li onClick={setNotificationStatus}>
                        Notification alerts 
                        <div className={`nav-link-container ${isNotificationEnabled ? 'active' : ''}`}>
                            <div onClick={setNotificationStatus} className={`nav-icon-container ${isNotificationEnabled ? 'active' : ''}`}>
                                <FiBell className="nav-link-icon" />
                            </div>
                        </div> 
                    </li>    
                </Link>

                <CustomHr />

                {
                    hrPageActive ? <>
                    
                        <Link to={'/tasks'} onClick={() => closeSideNavbar()}>
                            <li>
                                Task
                                <ImStack className="nav-link-icon" />
                            </li>
                        </Link>
                        
                        <CustomHr /> 

                        <Link to={'/attendance'} onClick={() => closeSideNavbar()}>
                            <li>
                                Attendance
                                <AiTwotoneCalendar className="nav-link-icon" />
                            </li>
                        </Link>
                        
                        <CustomHr />

                    </>:

                    isNotificationEnabled && <>
                        <Link to={''} onClick={() => closeSideNavbar()}>
                            <li>
                                Task
                                <ImStack className="nav-link-icon" />
                            </li>
                        </Link>
                        
                        <CustomHr />
                    </>
                }

                <Link to={''} onClick={() => closeSideNavbar()}><li>Support</li></Link>
                <CustomHr />

                <button className="sidebar-logout-btn" onClick={() => navigate("/logout")}>Logout</button>
            </ul>
        </div>
    </>
}

export default SideNavigationBar;
