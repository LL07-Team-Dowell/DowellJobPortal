import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./style.css";


const ApplicantDetails = () => {
    return <>
        <div className="selected-applicant-details">
            <p>Application details: </p>
            <span>View <KeyboardArrowDownIcon className="down-icon" /></span>
        </div>
    </>
}

export default ApplicantDetails;
