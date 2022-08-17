import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar/Navbar';
import { candidateStatuses } from '../../utils/candidateStatuses';
import { availableJobCategories } from '../../utils/jobCategories';
import "./style.css";

function Home({ user, setHired, setAssignedProject }) {

  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {

    async function fetchApplications(){
        
      try{
      
        const response = await myAxiosInstance.get(routes.Applications);
        const currentUserAppliedJobs = response.data.filter(application => application.applicant === user.username);
        const userSelectedJobs = currentUserAppliedJobs.filter(application => application.status === candidateStatuses.ONBOARDING);
        
        if (userSelectedJobs.length  >= 1) {
          setAssignedProject(userSelectedJobs[0].others[mutableNewApplicationStateNames.assigned_project])
          setHired(true);
          setLoading(false);
          return;
        }

        setAppliedJobs(currentUserAppliedJobs);
        setLoading(false);
        return;
          
      }catch(err) {
        console.log(err)
        return
      }

    }

    if (!user) return setLoading(false);

    fetchApplications();

  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <Navbar title={"Home"} disableSideBar={user ? false : true} />
      <div className='container-wrapper'>
        <h1 className='home__Title__Text'>Welcome to dowell job portal!</h1>
        <div className='row'>
          {
            React.Children.toArray(availableJobCategories.map(category => {
              return <>
                <div className='card'>
                  <div className='container'>
                    <div className='row-text'>
                      <h4><b>{category} Jobs</b></h4>
                      <p className='detail dowell'>Dowell Ux living lab</p>
                      <p className='detail skill full-width'>{category} jobs on dowell</p>  
                      <button className='apply-button' onClick={() => navigate("/jobs", { state: { jobCategory: category, appliedJobs: appliedJobs }})}>View</button>                     
                    </div>
                  </div>
                </div>
              </>
            }))
          }
        </div>
      </div>
    </>
  )
}

export default Home