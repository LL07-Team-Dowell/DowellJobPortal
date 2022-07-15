import { mutableNewApplicationStateNames } from "../../../../contexts/NewApplicationContext";
import "./style.css";


const ApplicantIntro = ({ applicant, showTask, taskDetails, hrPageActive }) => {
    return <>

        {
            hrPageActive ? <div className="applicant-title-container">
                <h1 className="applicant-title-text">{applicant[mutableNewApplicationStateNames.applicant]}</h1>
                <div className="selected-applicant-intro">
                    <span>{applicant.dateOfApplication}</span>
                </div>
            </div> : <>
                <h1 className="applicant-title-text">{showTask ? taskDetails.assigneeName : applicant.name}</h1>
                <div className="selected-applicant-intro">
                    <p>{showTask ? taskDetails.jobApplied : applicant.jobApplied}</p>
                    <span>{showTask ? taskDetails.dateOfTaskAssignment : applicant.dateOfApplication}</span>
                </div>
            </>
        }

    </>
}

export default ApplicantIntro;
