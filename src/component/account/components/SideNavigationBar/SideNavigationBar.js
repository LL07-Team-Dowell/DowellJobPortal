import Close from "@mui/icons-material/Close";
import { FiBell } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";

import "./style.css";


const SideNavigationBar = ({ className, sideNavRef, closeSideNavbar, isNotificationEnabled, setNotificationStatus }) => {
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
                    isNotificationEnabled && <>
                        <Link to={''}>
                            <li>
                                Task
                                <ImStack className="nav-link-icon" />
                            </li>
                        </Link>
                        
                        <CustomHr />
                    </>
                }

                <Link to={''}><li>Settings</li></Link>
                <CustomHr />

                <Link to={''}><li>About us</li></Link>
                <CustomHr />

                <Link to={''}><li>Support</li></Link>
                <CustomHr />

                <Link to={''}><li>Terms & Conditions</li></Link>
                <CustomHr />

            </ul>
            <button className="sidebar-logout-btn" onClick={() => navigate("/logout")}>Logout</button>
        </div>
    </>
}

export default SideNavigationBar;
