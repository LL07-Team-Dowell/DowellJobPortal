import { useRef, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { FiStopCircle } from 'react-icons/fi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ApplicantIntro from '../../components/ApplicantIntro/ApplicantIntro';
import ApplicantDetails from '../../components/ApplicationDetails/ApplicationDetails';
import AssignedProjectDetails from '../../components/AssignedProjectDetails/AssignedProjectDetails';
import CustomHr from '../../components/CustomHr/CustomHr';

import "./style.css";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import PaymentDetails from '../../../account/components/PaymentDetails/PaymentDetails';


const SelectedCandidatesScreen = ({ rehireTabActive, accountPage, hireTabActive, showOnboarding }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);

    const handleClick = (ref) => {
        if (!ref.current) return;

        ref.current.classList.toggle("active");

    }

    return <>
        
        <div className="selected-candidate-screen-container">
            
            <ApplicantIntro />

            <ApplicantDetails />

            <CustomHr />

            <AssignedProjectDetails />

            {
                hireTabActive ? <>
                    <div className="comments-container hire-comment">
                        <h2>Remarks <span>&#x00028;by Hr&#x00029;</span></h2>
                        <textarea placeholder={"Add remarks"}></textarea>
                    </div>
                </> : 
                
                <></>
            }

            {

                showOnboarding ? 
                <></> :

                <div className="comments-container">
                    <h2>{hireTabActive ? '' : 'Add'} Remarks {hireTabActive ? <span>&#x00028;by Team Lead&#x00029;</span> : <></>}</h2>
                    <textarea placeholder={accountPage ? "Reason to Rehire" : "Add remarks"}></textarea>
                </div>

            }
            
            {hireTabActive ? <PaymentDetails /> : <></>}

            <div className={`candidate-status-container ${showOnboarding ? 'onboarding-active' : ''}`}>
                <h2>Status {accountPage && rehireTabActive ? <span>&#x00028;by Team Lead&#x00029;</span> : ''}</h2>
                <div className={`status-options-container ${rehireTabActive ? 'rehire': ''}`}>
                    {
                        rehireTabActive ?
                        <div className="status-option green-color" ref={ref3} onClick={() => handleClick(ref3)}>
                            <CheckCircleIcon />
                            <div className='textt'>Pay</div>
                        </div> 
                        : 
                        
                        <></>
                    }
                    
                    <div className="status-option green-color" ref={ref1} onClick={() => handleClick(ref1)}>
                        <BsStopCircle />
                        <div className='textt'>{rehireTabActive ? 'ReHire' : hireTabActive ? 'Onboarding' : showOnboarding ? 'ReHire' : 'Hire'}</div>
                        {/* <FiStopCircle /> */}
                    </div>

                    {
                        showOnboarding ? 
                        
                        <></> :

                        <div className="status-option red-color" ref={ref2} onClick={() => handleClick(ref2)}>
                            {accountPage && rehireTabActive ? <AiOutlineCloseCircle /> : <BsStopCircle />}
                                    
                            {/* <BsStopCircle /> */}
                            <div className='textt'>{hireTabActive ? 'Reject' : 'Rejected'}</div>
                        </div>

                    }

                </div>

                {
                    accountPage && rehireTabActive ? <>
                        <CustomHr className="rehire-hr" />
                        <h2 className='top-m'>Status</h2>
                        <div className="status-options-container">
                            <div className="status-option green-color" ref={ref4} onClick={() => handleClick(ref4)}>
                                <BsStopCircle />
                                <div className='textt'>Onboarding</div>
                                {/* <FiStopCircle /> */}
                            </div>
                            <div className="status-option red-color" ref={ref5} onClick={() => handleClick(ref5)}>
                                <BsStopCircle />
                                <div className='textt'>Reject</div>
                                {/* <FiStopCircle /> */}
                            </div>
                            
                        </div>
                    </> : <></>
                }
            </div>
        </div>

    </>
}

export default SelectedCandidatesScreen;
