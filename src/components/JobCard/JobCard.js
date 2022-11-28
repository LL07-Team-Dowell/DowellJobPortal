import { AiFillCheckCircle, AiOutlineArrowRight } from "react-icons/ai";
import { changeToTitleCase, formatDateAndTime, getDaysDifferenceFromPresentDate } from "../../helpers/helpers";
import { jobKeys } from "../../views/admin/utils/jobKeys";
import { IoMdTime } from "react-icons/io";
import "./style.css";
import { mutableNewApplicationStateNames } from "../../contexts/NewApplicationContext";


const JobCard = ({ job, subtitle, candidateViewJob, disableActionBtn, buttonText, handleBtnClick, showCandidateAppliedJob, showCandidateDeclinedJob, showCandidateInterview, guestUser, interviewDetails }) => {
    return <div className="job__Card__Container">
        <div className="job__Card__Title__Info">
            <h2><b>{changeToTitleCase(job.title)}</b></h2>
            { subtitle && <span className="subtitle__Item"><span>{subtitle}</span><span>- UX Living Lab</span></span> }
        </div>
        { 
            candidateViewJob && 
            <div className="job__Details__Info">
                <div className="detail__Item">
                    <span className="dot"></span>
                    <span className="job__Highlight__Item">Duration: </span>
                    <span>6 months</span>
                </div>
                <div className="vertical__Seperator"></div>
                <div className="detail__Item">
                    <span className="dot"></span>
                    <span className="job__Highlight__Item">Skills: </span>
                    <span>{job.skills.length > 18 ? job.skills.slice(0, 18) + "..." : job.skills}</span>
                </div>
                <div className="vertical__Seperator"></div>
                <div className="detail__Item">
                    <span className="dot"></span>
                    <span className="job__Highlight__Item">Stipend: </span>
                    <span>{job.others[jobKeys.paymentForJob] ? job.others[jobKeys.paymentForJob] : "Not specified"}</span>
                </div>
            </div> 
        }
        {
            showCandidateAppliedJob &&
            <div className="job__Details__Info mt__5">
                <div className="detail__Item">
                    <IoMdTime className="status__Icon" />
                    <span>Applied {getDaysDifferenceFromPresentDate(job.others[mutableNewApplicationStateNames.others_date_applied])} {getDaysDifferenceFromPresentDate(job.others[mutableNewApplicationStateNames.others_date_applied]) > 1 ? 'days' : 'day'} ago</span>
                </div>
                <div className="vertical__Seperator lg"></div>
                <div className="detail__Item">
                    <IoMdTime className="status__Icon" />
                    <span>Application Submitted</span>
                </div>
            </div>
        }
        {
            showCandidateInterview &&
            <div className="job__Details__Info mt__5">
                <div className="detail__Item">
                    <IoMdTime className="status__Icon" />
                    <span>Application Approved</span>
                </div>
                <div className="vertical__Seperator lg"></div>
                <div className="detail__Item">
                    <AiFillCheckCircle className="status__Icon green__Color" />
                    <span className="job__Highlight__Item">Interview scheduled</span>
                    <br/>
                    <span>{guestUser ? 'Interview to be scheduled' : `${(job.others[mutableNewApplicationStateNames.others_scheduled_interview_date] && job.others[mutableNewApplicationStateNames.others_scheduled_interview_date] !== "") ? formatDateAndTime(job.others[mutableNewApplicationStateNames.others_scheduled_interview_date]) : formatDateAndTime(interviewDetails.created)}`}</span>
                </div>
            </div>
        }
        {
            showCandidateDeclinedJob &&
            <div className="job__Details__Info mt__5">
                <div className="detail__Item">
                    <span className="dot"></span>
                    <span className="job__Highlight__Item">Duration: </span>
                    <span>6 months</span>
                </div>
                <div className="vertical__Seperator lg"></div>
                <div className="detail__Item">
                    <span className="dot"></span>
                    <span className="job__Highlight__Item">Skills: </span>
                    <span>{job.skills.length > 18 ? job.skills.slice(0, 18) + "..." : job.skills}</span>
                </div>
            </div>
        }
        
        <button disabled={disableActionBtn} className="cta__Button" onClick={() => handleBtnClick(job)}>
            <span>{buttonText ? buttonText : "Apply"}</span>
            <AiOutlineArrowRight />
        </button>
    </div>
}

export default JobCard;