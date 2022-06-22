import React, { useState } from 'react';
import Navbar from '../component/Hr_Navbar';
import Footer from '../component/Hr_footer/Hr_Footer';
import * as BsIcons from 'react-icons/bs';

import './css/Hr_AppliedScreen.css';
import NavigationList from '../component/NavigationList/NavigationList';
import Active from '../component/Active/Active';
import Shorlisted from '../component/Active/Shortlisted/Shorlisted';
import Selected from '../component/Active/Selected/Selected';
import Interview from '../component/Active/Interview/Interview';
import JobTile from '../../teamlead/components/JobTile/JobTile';
import { myAxiosInstance } from '../../../axios';
import SelectedCandidates from '../../teamlead/components/SelectedCandidates/SelectedCandidates';
import { appliedCandidates } from '../candidatesData';

function Hr_AppliedScreen() {

  return (
    <div className='Applied__wrapper'>
      <div className='Applied__container'>
        <SelectedCandidates title={'Applied Candidates'} candidatesCount={appliedCandidates.length} hrPageActive={true} />
        {
          React.Children.toArray(appliedCandidates.map(candidate => {
            return <JobTile hrPageActive={true} candidateData={candidate} setShowCandidate={() => {}} handleJobTileClick={() => {}} />
          }))
        }
      </div>
    </div>
  )
}

export default Hr_AppliedScreen