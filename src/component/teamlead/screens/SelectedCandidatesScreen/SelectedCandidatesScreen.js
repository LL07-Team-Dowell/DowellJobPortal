import { useRef, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { FiStopCircle } from 'react-icons/fi';
import ApplicantIntro from '../../components/ApplicantIntro/ApplicantIntro';
import ApplicantDetails from '../../components/ApplicationDetails/ApplicationDetails';
import AssignedProjectDetails from '../../components/AssignedProjectDetails/AssignedProjectDetails';
import CustomHr from '../../components/CustomHr/CustomHr';

import "./style.css";


const SelectedCandidatesScreen = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const handleClick = (ref) => {
        if (!ref.current) return;

        ref.current.classList.toggle("active");

        console.log(ref.current.classList)

    }

    return <>
        
        <div className="selected-candidate-screen-container">
            
            <ApplicantIntro />

            <ApplicantDetails />

            <CustomHr />

            <AssignedProjectDetails />

            <div className="comments-container">
                <h2>Add Remarks</h2>
                <textarea placeholder="Add remarks"></textarea>
            </div>

            <div className="candidate-status-container">
                <h2>Status</h2>
                <div className="status-options-container">
                    <div className="status-option green-color" ref={ref1} onClick={() => handleClick(ref1)}>
                        <BsStopCircle />
                        <div className='textt'>Hire</div>
                        {/* <FiStopCircle /> */}
                    </div>
                    <div className="status-option red-color" ref={ref2} onClick={() => handleClick(ref2)}>
                        <FiStopCircle />
                        {/* <BsStopCircle /> */}
                        <div className='textt'>Rejected</div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default SelectedCandidatesScreen;
