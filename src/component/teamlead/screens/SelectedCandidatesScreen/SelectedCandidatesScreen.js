import { useRef, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { FiStopCircle } from 'react-icons/fi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ApplicantIntro from '../../components/ApplicantIntro/ApplicantIntro';
import ApplicantDetails from '../../components/ApplicationDetails/ApplicationDetails';
import AssignedProjectDetails from '../../components/AssignedProjectDetails/AssignedProjectDetails';
import CustomHr from '../../components/CustomHr/CustomHr';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import PaymentDetails from '../../../account/components/PaymentDetails/PaymentDetails';

import "./style.css";
import { accountPageActions } from '../../../account/actions/AccountActions';
import { candidateDataReducerActions } from '../../../../reducers/CandidateDataReducer';
import { initialCandidatesDataStateNames } from '../../../../contexts/CandidatesContext';


const SelectedCandidatesScreen = ({ selectedCandidateData, updateCandidateData, allCandidatesData, rehireTabActive, accountPage, hireTabActive, showOnboarding, updateShowCandidate }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const [ disabled, setDisabled ] = useState(false);

    const handleClick = (ref, action) => {
        
        if (!ref.current) return;

        setDisabled(true);

        ref.current.classList.toggle("active");
        
        switch (action) {
            case accountPageActions.MOVE_TO_ONBOARDING:

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload: {
                    stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
                    updateExisting: true,
                    value: selectedCandidateData
                }})

                if ( accountPage && rehireTabActive ){

                    updateCandidateData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
                        stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
                        value: allCandidatesData.filter(candidate => candidate.id !== selectedCandidateData.id)
                    }})

                    setTimeout(() => updateShowCandidate(false), 1500);

                    return
                }

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_CANDIDATES_TO_HIRE, payload: {
                    stateToChange: initialCandidatesDataStateNames.candidatesToHire,
                    value: allCandidatesData.filter(candidate => candidate.id !== selectedCandidateData.id )
                } })

                setTimeout(() => updateShowCandidate(false), 1500);

                break;

            case accountPageActions.MOVE_TO_REHIRE:
                updateCandidateData({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload: {
                    stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
                    value: allCandidatesData.filter(candidate => candidate.id !== selectedCandidateData.id )
                }})

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
                    stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
                    updateExisting: true,
                    value: selectedCandidateData
                }})

                setTimeout(() => updateShowCandidate(false), 1500);

                break;

            case accountPageActions.MOVE_TO_REJECTED:

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_REJECTED_CANDIDATES, payload: {
                    stateToChange: initialCandidatesDataStateNames.rejectedCandidates,
                    updateExisting: true,
                    value: selectedCandidateData
                }})

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_CANDIDATES_TO_HIRE, payload: {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.candidatesToHire,
                    value: selectedCandidateData
                }})

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
                    value: selectedCandidateData
                }})

                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_INTERVIEWING_CANDIDATES, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.candidatesToInterview,
                    value: selectedCandidateData
                }})

                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_SELECTED_CANDIDATES, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.selectedCandidates,
                    value: selectedCandidateData
                }})

                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
                    value: selectedCandidateData
                }})

                setTimeout(() => updateShowCandidate(false), 1500);

                break;

            default:
                console.log("no action")
                break;
        }

    }

    return <>
        
        <div className="selected-candidate-screen-container">
            
            <ApplicantIntro applicant={selectedCandidateData} />

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
                        <button className="status-option green-color" ref={ref3} onClick={() => handleClick(ref3)} disabled={disabled}>
                            <CheckCircleIcon className='status-icon' />
                            <br /><br/>
                            <div className='textt'>Pay</div>
                        </button> 
                        : 
                        
                        <></>
                    }
                    
                    <button className="status-option green-color" ref={ref1} onClick={() => handleClick(ref1, hireTabActive ? accountPageActions.MOVE_TO_ONBOARDING : showOnboarding ? accountPageActions.MOVE_TO_REHIRE : "")} disabled={disabled}>
                        <BsStopCircle className='status-icon' />
                        {/* <FiStopCircle className='status-icon' /> */}
                        <br /><br/>
                        <div className='textt'>{rehireTabActive ? 'ReHire' : hireTabActive ? 'Onboarding' : showOnboarding ? 'ReHire' : 'Hire'}</div>
                    </button>

                    {
                        showOnboarding ? 
                        
                        <></> :

                        <button className="status-option red-color" ref={ref2} onClick={() => handleClick(ref2, accountPageActions.MOVE_TO_REJECTED)} disabled={disabled}>
                            {accountPage && rehireTabActive ? <AiOutlineCloseCircle className='status-icon' /> : <BsStopCircle className='status-icon' />}
                            <br /><br/>
                            {/* <FiStopCircle className='status-icon' /> */}
                        
                            <div className='textt'>{hireTabActive ? 'Reject' : 'Rejected'}</div>
                        </button>

                    }

                </div>

                {
                    accountPage && rehireTabActive ? <>
                        <CustomHr className="rehire-hr" />
                        <h2 className='top-m'>Status</h2>
                        <div className="status-options-container">
                            <button className="status-option green-color" ref={ref4} onClick={() => handleClick(ref4, accountPageActions.MOVE_TO_ONBOARDING)} disabled={disabled}>
                                <BsStopCircle className='status-icon' />
                                <br /><br/>
                                {/* <FiStopCircle className='status-icon' /> */}
                                <div className='textt'>Onboarding</div>
                            </button>
                            <button className="status-option red-color" ref={ref5} onClick={() => handleClick(ref5, accountPageActions.MOVE_TO_REJECTED)} disabled={disabled}>
                                <BsStopCircle className='status-icon' />
                                <br /><br/>
                                {/* <FiStopCircle className='status-icon' /> */}
                                <div className='textt'>Reject</div>
                            </button>
                            
                        </div>
                    </> : <></>
                }
            </div>
        </div>

    </>
}

export default SelectedCandidatesScreen;
