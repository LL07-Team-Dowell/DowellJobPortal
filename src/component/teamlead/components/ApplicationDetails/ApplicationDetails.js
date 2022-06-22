import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./style.css";


const ApplicantDetails = ({ hrPageActive }) => {
    return <>
        <div className="selected-applicant-details">
            <p>Application details: </p>
            { !hrPageActive &&<span>View <KeyboardArrowDownIcon className="down-icon" /></span> }
        </div>

        {
            hrPageActive && <div className='selected-applicant-info'>
                <span>Name</span>
                <span>Country</span>
                <span>Email ID</span>
                <span>Freelance Platform</span>
                <span>Profile Link of your Freelance</span>
                <span>Academic Qualification</span>
                <span>Discord Id</span>
                <span>Comments, remarks</span>
                <span>Speed test</span>
            </div>
        }
    </>
}

export default ApplicantDetails;
