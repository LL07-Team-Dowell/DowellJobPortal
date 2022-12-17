import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import logo from "../../assets/images/landing-logo.png";
import "./style.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import NewSideNavigationBar from "../../components/SideNavigationBar/NewSideNavigationBar";
import { Link } from "react-router-dom";
import { hrNavigationLinks } from "../../views/Hr/screens/hrNavigationLinks";
import { accountNavigationLinks } from "../../views/account/accountNavigationLinks";
import { teamleadNavigationLinks } from "../../views/teamlead/teamleadNavigationLinks";


const StaffJobLandingLayout = ({ children, hrView, accountView, teamleadView, runExtraFunctionOnNavItemClick, hideSideBar }) => {
    const [ searchValue, setSearchValue ] = useState("");
    const isLargeScreen = useMediaQuery("(min-width: 992px)");
    
    return <>
    <nav>
            <div className="staff__Jobs__Layout__Navigation__Container">
                { 
                    isLargeScreen && <Link to={"/"} className="jobs__Layout__Link__Item">
                        <img src={logo} alt={"dowell logo"} />
                    </Link>
                }
                <SearchBar placeholder={"Search for job/project"} searchValue={searchValue} handleSearchChange={setSearchValue} />
                
                <div className="jobs__Layout__Icons__Container">
                    <Link to={"/user"}>
                        <HiOutlineUserCircle className="icon" />
                    </Link>
                </div>
                <hr />
            </div>
        </nav>
        <main>
            <div className={`staff__Jobs__Layout__Content__Container ${accountView ? 'account' : ''}`}>
                { !hideSideBar && <NewSideNavigationBar links={hrView ? hrNavigationLinks : accountView ? accountNavigationLinks : teamleadView ? teamleadNavigationLinks : []} runExtraFunctionOnNavItemClick={runExtraFunctionOnNavItemClick} /> }
                <div className="jobs__Layout__Content">
                    { children }
                </div>
            </div>
        </main>
    </>
}

export default StaffJobLandingLayout;
