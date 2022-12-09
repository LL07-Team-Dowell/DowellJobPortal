import { IoIosArrowBack } from "react-icons/io";
import SearchBar from "../SearchBar/SearchBar";
import "./style.css";

const TitleNavigationBar = ({ title, showSearchBar, handleBackBtnClick }) => {
    return <>
        <div className="title__Navigation__Bar__Container">
            <div className="title__Item">
                <div className="back__Icon__Container" onClick={handleBackBtnClick}>
                    <IoIosArrowBack className="back__Icon" />
                </div>
                { title && <h1>{title}</h1> }
            </div>
            { showSearchBar && <SearchBar />}
        </div>
    </>
}

export default TitleNavigationBar;