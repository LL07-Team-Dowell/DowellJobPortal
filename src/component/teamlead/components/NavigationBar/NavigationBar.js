import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./style.css";


const NavigationBar = ({ showCandidate, setShowCandidate }) => {
    return <>
        <nav>
            <div className="navbar-container">
                {
                    showCandidate ? <ArrowBackIcon className="navbar-icon" onClick={() => setShowCandidate(false)} /> : <>
                
                        <MenuIcon className="navbar-icon" />
                        <NotificationsNoneIcon className="navbar-icon" />
                    </>
                }
            </div>
        </nav>
    </>
}

export default NavigationBar;
