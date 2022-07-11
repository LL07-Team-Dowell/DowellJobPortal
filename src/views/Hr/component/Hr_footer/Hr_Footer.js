import { useEffect, useRef } from "react";
import { FiHome, FiUser, FiFileText } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { TbFolderX } from "react-icons/tb";
import {RiSendPlaneLine} from 'react-icons/ri';
import { Link, useParams } from "react-router-dom";

import "./Hr_Footer.css";


const BottomNavigationBar = () => {
    
    return <>
        <footer>
            <div className="bottom-nav-container">
                <div className="bottom-navigation-item" >
                    <Link   to='/hr_screen'>
                        <FiHome />
                        Home
                    </Link>
                </div>
                <div className="bottom-navigation-item" >
                    <Link  to='/hr_applied'>
                        <RiSendPlaneLine/>
                        Applied
                    </Link>
                </div>
                <div className="bottom-navigation-item" >
                    <Link  to='/shortlisted'>
                        <FiFileText />
                        After Initial Meet
                    </Link>
                </div>
                <div className="bottom-navigation-item" >
                    <Link  to=''>
                        <FiUser />
                        User
                    </Link>
                </div>
            </div>
        </footer>
    </>
}

export default BottomNavigationBar;