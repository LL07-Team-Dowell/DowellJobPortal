import React from 'react';

import './css/Hr_AppliedScreen.css';
import NavigationList from '../component/NavigationList/NavigationList';
import Active from '../component/Active/Active';
import Shorlisted from '../component/Active/Shortlisted/Shorlisted';
import Selected from '../component/Active/Selected/Selected';
import Interview from '../component/Active/Interview/Interview';
import SelectedCandidates from '../../teamlead/components/SelectedCandidates/SelectedCandidates';
import JobTile from '../../teamlead/components/JobTile/JobTile';
import { useNavigate } from 'react-router-dom';
import { appliedCandidates } from '../candidatesData';

function ShortlistedScreen() {
  const navigate = useNavigate();

  const handleClick = (data) => navigate(`/job/after_initial_meet/${data.name}`, { state: { candidate: data } });

  return (
    <div className='Applied__wrapper'>
      <div className='Applied__container'>
        <SelectedCandidates title={'Shortlisted Candidates'} candidatesCount={appliedCandidates.length} hrPageActive={true} />
        {
          React.Children.toArray(appliedCandidates.map(candidate => {
            return <JobTile hrPageActive={true} candidateData={candidate} setShowCandidate={() => {}} handleJobTileClick={handleClick} />
          }))
        }
      </div>
    </div>
  )
}

export default ShortlistedScreen