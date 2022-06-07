import { FiHome, FiUser } from "react-icons/fi";
import { ImStack } from "react-icons/im";

import "./style.css";


const BottomNavigationBar = ({ setCurrentSection }) => {

    return <>
        <footer>
            <div className="bottom-nav-container">
                <div className="bottom-navigation-item" onClick={() => setCurrentSection("home")}>
                    <FiHome />
                    <span>Home</span>
                </div>
                <div className="bottom-navigation-item" onClick={() => setCurrentSection("task")}>
                    <ImStack />
                    <span>Task</span>
                </div>
                <div className="bottom-navigation-item" onClick={() => setCurrentSection("user")}>
                    <FiUser />
                    <span>User</span>
                </div>
            </div>
        </footer>
    </>
}

export default BottomNavigationBar;
