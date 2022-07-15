import { mutableNewApplicationStateNames } from "../../../../contexts/NewApplicationContext";
import { formatDateAndTime } from "../../../../helpers/helpers";
import "./style.css";


const ApplicantIntro = ({ applicant, showTask, taskDetails, hrPageActive, jobTitle }) => {
    return <>

        {
            hrPageActive ? <div className="applicant-title-container">
                <h1 className="applicant-title-text">{applicant[mutableNewApplicationStateNames.applicant]}</h1>
                <div className="selected-applicant-intro">
                    <span>{applicant.dateOfApplication}</span>
                </div>
            </div> : <>
                <h1 className="applicant-title-text">{showTask ? taskDetails.assigneeName : applicant.applicant}</h1>
                <div className="selected-applicant-intro">
                    <p>{showTask ? taskDetails.jobApplied : jobTitle}</p>
                    <span>{showTask ? taskDetails.dateOfTaskAssignment : formatDateAndTime(applicant.others[mutableNewApplicationStateNames.others_date_applied])}</span>
                </div>
            </>
        }

    </>
}

export default ApplicantIntro;
