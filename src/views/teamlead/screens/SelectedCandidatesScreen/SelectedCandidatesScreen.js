import { useRef, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
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
import { hrPageActions } from '../../../Hr/actions/HrActions';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import { candidateStatuses } from '../../../candidate/utils/candidateStatuses';
import { useNavigate } from 'react-router-dom';
import { teamLeadActions } from '../../actions/TeamLeadActions';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { changeToTitleCase } from '../../../../helpers/helpers';


const SelectedCandidatesScreen = ({ selectedCandidateData, updateCandidateData, allCandidatesData, rehireTabActive, accountPage, hireTabActive, showOnboarding, updateShowCandidate, hrPageActive, initialMeet, jobTitle, teamleadPageActive, showApplicationDetails, handleViewApplicationBtnClick, availableProjects, updateAppliedData }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const [ disabled, setDisabled ] = useState(false);
    const navigate = useNavigate();
    const [ remarks, setRemarks ] = useState("");
    const [ hrDiscordLink, setHrDiscordLink ] = useState("");
    const [ candidatePlatform, setCandidatePlatform ] = useState("");

    useState(() => {

        setCandidatePlatform(selectedCandidateData[mutableNewApplicationStateNames.freelancePlatform]);

    }, [])

    const handleClick = async (ref, disableOtherBtns, action) => {
        
        if (!ref.current) return;

        { disableOtherBtns && setDisabled(true) };

        ref.current.classList.toggle("active");

        switch (action) {
            case accountPageActions.MOVE_TO_ONBOARDING:
                if (!selectedCandidateData) return;

                if ( accountPage && rehireTabActive ){

                    updateCandidateData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
                        stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
                        value: allCandidatesData.filter(candidate => candidate.id !== selectedCandidateData.id)
                    }})
                    
                }

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.ONBOARDING, job: selectedCandidateData.job, [mutableNewApplicationStateNames.freelancePlatform]: candidatePlatform });
                
                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_CANDIDATES_TO_HIRE, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.candidatesToHire,
                    value: selectedCandidateData,
                }});

                selectedCandidateData[mutableNewApplicationStateNames.freelancePlatform] = candidatePlatform;

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload: {
                    stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
                    updateExisting: true,
                    value: selectedCandidateData,
                }})

                return updateShowCandidate(false);

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

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.TO_REHIRE, job: selectedCandidateData.job });

                return updateShowCandidate(false);

            case accountPageActions.MOVE_TO_REJECTED:

                if (!selectedCandidateData) return;

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

                updateCandidateData({ type: candidateDataReducerActions.UPDATE_SELECTED_CANDIDATES, payload: {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.selectedCandidates,
                    value: selectedCandidateData
                }})

                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_ONBOARDING_CANDIDATES, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.onboardingCandidates,
                    value: selectedCandidateData
                }})

                // selectedCandidateData.others[mutableNewApplicationStateNames.others_team_lead_remarks] = remarks;
                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.REJECTED, job: selectedCandidateData.job });

                return updateShowCandidate(false)

            case teamLeadActions.MOVE_TO_HIRED:
                if (!selectedCandidateData) return;

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.TEAMLEAD_HIRE, job: selectedCandidateData.job, others: { ...selectedCandidateData.others,  [mutableNewApplicationStateNames.others_team_lead_remarks] : remarks } });
                
                updateCandidateData ({ type: candidateDataReducerActions.UPDATE_SELECTED_CANDIDATES, payload : {
                    removeFromExisting: true,
                    stateToChange: initialCandidatesDataStateNames.selectedCandidates,
                    value: selectedCandidateData
                }})

                return updateShowCandidate(false);
            
            case hrPageActions.MOVE_TO_SHORTLISTED:
                if (!selectedCandidateData) return;

                selectedCandidateData[mutableNewApplicationStateNames.hr_remarks] = remarks;

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.SHORTLISTED, job: selectedCandidateData.job, [mutableNewApplicationStateNames.hr_remarks]: remarks});
                updateCandidateData(prevCandidates => { return [ ...prevCandidates, selectedCandidateData ] } )
                updateAppliedData(prevAppliedCandidates => { return prevAppliedCandidates.filter(application => application.id !== selectedCandidateData.id) })

                return navigate("/shortlisted");

            case hrPageActions.MOVE_TO_SELECTED:
                if (!selectedCandidateData) return;

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.SELECTED, job: selectedCandidateData.job, others: { ...selectedCandidateData.others, [mutableNewApplicationStateNames.hr_discord_link] : hrDiscordLink } });
                updateCandidateData(prevCandidates => { return prevCandidates.filter(candidate => candidate.id !== selectedCandidateData.id) })
                
                return navigate("/shortlisted");

            case hrPageActions.MOVE_TO_REJECTED:
                if (!selectedCandidateData) return;

                await myAxiosInstance.post(routes.Update_Application + selectedCandidateData.id + "/", { applicant: selectedCandidateData.applicant, status: candidateStatuses.REJECTED, job: selectedCandidateData.job });
                updateCandidateData(prevCandidates => { return prevCandidates.filter(candidate => candidate.id !== selectedCandidateData.id) })
                
                return navigate("/shortlisted");

            default:
                console.log("no action")
                break;
        }

    }

    return <>
        
        <div className="selected-candidate-screen-container">
            
            <ApplicantIntro hrPageActive={hrPageActive} applicant={selectedCandidateData ? selectedCandidateData : {}} jobTitle={jobTitle} />

            <ApplicantDetails hrPageActive={hrPageActive} applicantData={selectedCandidateData} showApplicationDetails={showApplicationDetails} handleViewApplicationBtnClick={() => handleViewApplicationBtnClick ? handleViewApplicationBtnClick() : () => {}} />

            {!hrPageActive && <CustomHr />}

            {!hrPageActive && <AssignedProjectDetails />}

            {initialMeet && hrPageActive && <AssignedProjectDetails availableProjects={availableProjects} />}

            {hrPageActive && <CustomHr className={'relative-hr'} />}

            {
                hireTabActive ? <>
                    <div className="comments-container hire-comment">
                        <h2>Remarks <span>&#x00028;by Hr&#x00029;</span></h2>
                        <textarea placeholder={"Add remarks"} value={selectedCandidateData[mutableNewApplicationStateNames.hr_remarks]} readOnly={true}></textarea>
                    </div>
                </> : 
                
                <></>
            }

            {

                showOnboarding ? 
                <></> :

                hrPageActive ? <>
                    <div className="comments-container hr__Comments__Container">
                        <h2>{initialMeet ? <>Remarks {<span>&#x00028;by Hr&#x00029;</span>}</> : <>Add Remarks</>}</h2>
                        <textarea placeholder={`${initialMeet ? "Remarks given": "Add remarks"}`} readOnly={initialMeet ? true : false} value={initialMeet ? selectedCandidateData[mutableNewApplicationStateNames.hr_remarks] : remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
                    </div>
                </> :

                <>

                {
                    teamleadPageActive && <div className="comments-container">
                        <h2>Remarks by Hr</h2>
                        <textarea placeholder="Remarks by Hr" value={selectedCandidateData[mutableNewApplicationStateNames.hr_remarks]} readOnly={true}></textarea>
                    </div>
                }

                <div className="comments-container">
                    <h2>{hireTabActive ? '' : 'Add'} Remarks {hireTabActive ? <span>&#x00028;by Team Lead&#x00029;</span> : <></>}</h2>
                    <textarea placeholder={accountPage ? "Reason to Rehire" : "Add remarks"} value={hireTabActive ? selectedCandidateData.others[mutableNewApplicationStateNames.others_team_lead_remarks] : remarks} readOnly={hireTabActive ? true : false} onChange={(e) => setRemarks(e.target.value)}></textarea>
                </div>

                </>

            }

            {
                initialMeet && <>
                    <div className="comments-container hr__Comments__Container">
                        <h2>Discord Link</h2>
                        <input className=' white__Bg__Color' placeholder='Add Discord Link' value={hrDiscordLink} onChange={(e) => setHrDiscordLink(e.target.value)}></input>
                    </div>
                </>
            }
            
            {
                hireTabActive ? <PaymentDetails
                    candidatePlatform={changeToTitleCase(selectedCandidateData[mutableNewApplicationStateNames.freelancePlatform])}
                    handlePlatformSelectionClick={(selection) => setCandidatePlatform(selection)}
                /> : <></>
            }

            <div className={`candidate-status-container ${showOnboarding ? 'onboarding-active' : ''}`}>
                <h2>Status {accountPage && rehireTabActive ? <span>&#x00028;by Team Lead&#x00029;</span> : ''}</h2>
                <div className={`status-options-container ${rehireTabActive ? 'rehire': ''}`}>
                    {
                        rehireTabActive ?
                        <button className={`status-option green-color ${accountPage ? 'active' : ''}`} ref={ref3} onClick={() => handleClick(ref3, false)} disabled={accountPage ? true :  disabled}>
                            <CheckCircleIcon className='status-icon' />
                            <br /><br/>
                            <div className='textt'>Pay</div>
                        </button> 
                        : 
                        
                        <></>
                    }
                    
                    {
                        hrPageActive ? <>

                        <button className={`status-option ${initialMeet ? 'green-color' : 'orange-color'} ${initialMeet ? '' : selectedCandidateData.status === candidateStatuses.SHORTLISTED ? 'active' : ''}`} ref={ref7} onClick={() => handleClick(ref7, true, initialMeet ? hrPageActions.MOVE_TO_SELECTED : hrPageActions.MOVE_TO_SHORTLISTED)} disabled={initialMeet ? disabled : selectedCandidateData.status === candidateStatuses.SHORTLISTED ? true : disabled}>
                            <BsStopCircle className='status-icon' />
                            <br /><br/>
                            <div className='textt'>{`${initialMeet ? 'Selected' : 'Shortlisted'}`}</div>
                        </button>

                        </> : <button className={`status-option green-color ${accountPage && rehireTabActive ? 'active' : ''}`} ref={ref1} onClick={() => handleClick(ref1, true, hireTabActive ? accountPageActions.MOVE_TO_ONBOARDING : showOnboarding ? teamleadPageActive ? teamLeadActions.MOVE_TO_REHIRE : accountPageActions.MOVE_TO_REHIRE : teamLeadActions.MOVE_TO_HIRED)} disabled={accountPage && rehireTabActive ? true : disabled}>
                            <BsStopCircle className='status-icon' />
                            <br /><br/>
                            <div className='textt'>{rehireTabActive ? 'ReHire' : hireTabActive ? 'Onboarding' : showOnboarding ? 'ReHire' : 'Hire'}</div>
                        </button>
                    }

                    {
                        showOnboarding ? 
                        
                        <></> :

                        hrPageActive ? <>
                            <button className="status-option red-color" ref={ref6} onClick={() => handleClick(ref6, true, hrPageActions.MOVE_TO_REJECTED)} disabled={disabled}>
                                <BsStopCircle className='status-icon' />
                                <br /><br/>
                                
                                <div className='textt'>{'Rejected'}</div>
                            </button>
                        </> :

                        <button className="status-option red-color" ref={ref2} onClick={() => handleClick(ref2, true, accountPageActions.MOVE_TO_REJECTED)} disabled={disabled}>
                            {accountPage && rehireTabActive ? <AiOutlineCloseCircle className='status-icon' /> : <BsStopCircle className='status-icon' />}
                            <br /><br/>
                        
                            <div className='textt'>{hireTabActive ? 'Reject' : 'Rejected'}</div>
                        </button>

                    }

                </div>

                {
                    accountPage && rehireTabActive ? <>
                        <CustomHr className="rehire-hr" />
                        <h2 className='top-m'>Status</h2>
                        <div className="status-options-container">
                            <button className="status-option green-color" ref={ref4} onClick={() => handleClick(ref4, true, accountPageActions.MOVE_TO_ONBOARDING)} disabled={disabled}>
                                <BsStopCircle className='status-icon' />
                                <br /><br/>
                                <div className='textt'>Onboarding</div>
                            </button>
                            <button className="status-option red-color" ref={ref5} onClick={() => handleClick(ref5, true, accountPageActions.MOVE_TO_REJECTED)} disabled={disabled}>
                                <BsStopCircle className='status-icon' />
                                <br /><br/>
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
