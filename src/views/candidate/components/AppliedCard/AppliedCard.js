import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getDaysDifferenceFromPresentDate } from '../../../../helpers/helpers';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { useNavigate } from 'react-router-dom';

import "./style.css";


const AppliedCard = ( { job, applicationDetails } ) => {

    const navigate = useNavigate();
    const daysDifference = getDaysDifferenceFromPresentDate(job.others[mutableNewApplicationStateNames.others_date_applied]);
    
    const handleClickOnApplicationCard = () => {
        navigate("/applied/view_job_application", { state: { jobToView: job, applicationDetails: applicationDetails } });
    }

    return <>
        <div className='candidate__Applied__Card'>
            <div className='top__Row__Details'>
                <p className='job__Title'><b>{ job.title }</b></p>
                <p className='time__Details'>{ daysDifference } { daysDifference > 1 ? 'days' : 'day'} ago</p>
            </div>
            <div className='bottom__Row__Details'>
                <div className='application__Status__Container'>
                    <RiErrorWarningLine className='application__Icon yellow__Color' />
                    <span>Application sent</span>
                </div>
                <button className='view__Btn' onClick={handleClickOnApplicationCard}>
                    <span>View</span>
                    <AiOutlineArrowRight />
                </button>
            </div>
        </div>
    </>
}

export default AppliedCard;
