import "./style.css";


const ApplicantIntro = ({ applicant, showTask, taskDetails }) => {
    return <>

        <h1 className="applicant-title-text">{showTask ? taskDetails.assigneeName : applicant.name}</h1>
        <div className="selected-applicant-intro">
            <p>{showTask ? taskDetails.jobApplied : applicant.jobApplied}</p>
            <span>{showTask ? taskDetails.dateOfTaskAssignment : applicant.dateOfApplication}</span>
        </div>

    </>
}

export default ApplicantIntro;
