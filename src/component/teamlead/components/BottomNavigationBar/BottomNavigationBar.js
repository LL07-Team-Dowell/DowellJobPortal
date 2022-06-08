import { FiHome, FiUser } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { TbFolderX } from "react-icons/tb";
import { Link } from "react-router-dom";

import "./style.css";


const BottomNavigationBar = ({ updateNav, currentPage, firstLink, secondLink, thirdLink, changeSecondIcon }) => {

    const handleClick = () => {
        updateNav(false);
    }

    return <>
        <footer>
            <div className="bottom-nav-container">
                <div className="bottom-navigation-item" onClick={handleClick}>
                    <Link to={currentPage ? `/${currentPage.toLocaleLowerCase()}/${firstLink.toLocaleLowerCase()}` : ''}>
                        <FiHome />
                        {firstLink ? firstLink[0].toLocaleUpperCase() + firstLink.slice(1) : ''}
                    </Link>
                </div>
                <div className="bottom-navigation-item" onClick={handleClick}>
                    <Link to={currentPage ? `/${currentPage.toLocaleLowerCase()}/${secondLink.toLocaleLowerCase()}`: ''}>
                        {changeSecondIcon ? <TbFolderX /> : <ImStack />}
                        {secondLink ? secondLink[0].toLocaleUpperCase() + secondLink.slice(1) : ''}
                    </Link>
                </div>
                <div className="bottom-navigation-item" onClick={handleClick}>
                    <Link to={currentPage ? `/${currentPage.toLocaleLowerCase()}/${thirdLink.toLocaleLowerCase()}`: ''}>
                        <FiUser />
                        {thirdLink ? thirdLink[0].toLocaleUpperCase() + thirdLink.slice(1) : ''}
                    </Link>
                </div>
            </div>
        </footer>
    </>
}

export default BottomNavigationBar;
