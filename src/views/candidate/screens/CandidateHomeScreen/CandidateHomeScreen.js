import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import { dowellLoginUrl, myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar/Navbar';
import { candidateStatuses } from '../../utils/candidateStatuses';
import { availableJobCategories } from '../../utils/jobCategories';
import * as assets from '../../../../assets/assetsIndex';
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

  const handleLinkClick = (e, category) => {
    e.preventDefault();
    if (category === "Research Associate") return navigate("/jobs/research-associate", { state: { appliedJobs: appliedJobs, currentUser: user }});
    navigate("/jobs", { state: { jobCategory: category, appliedJobs: appliedJobs }});
  }

  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    window.location = dowellLoginUrl
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
      <nav>
        <div className='candidate__Homepage__Nav__Container'>
          {!user && <Link className='login__Link' to={dowellLoginUrl} onClick={handleLoginLinkClick}>Login</Link>}
        </div>
      </nav>
      <main className='candidate__Homepage__Container'>
        <section className='main__Content'>
          <div className='logo__Img__Container'>
            <img src={assets.logo_img} alt='dowell logo' />
          </div>
          <h1>Join DoWell team</h1>
          <div className='content__Wrappper'>
            <div className='content__Item'>
              <img src={assets.users_img_1} alt='job category' />
              <div className='bottom__Content'>
                {
                  React.Children.toArray(availableJobCategories.slice(0, 2).map(category => {
                    return <Link className='job__Link__Item' to={`/jobs/${category.toLocaleLowerCase().replaceAll(' ', '-')}`} onClick={(e) => handleLinkClick(e, category)}>
                      <>
                      Apply for
                      {
                        category === "Employee" ? " Full time Employment" :
                        ` Full time/Part time ${category} ${category === "Freelancer" ? 'jobs' : ''}`
                      }
                      </>
                    </Link>
                  }))
                }
                  
              </div>
            </div>
            <div className='content__Item'>
              <img src={assets.users_img_2} alt='job category' />
              <div className='bottom__Content'>
                {
                  React.Children.toArray(availableJobCategories.slice(2).map(category => {
                    return <Link className='job__Link__Item' to={`/jobs/${category.toLocaleLowerCase().replaceAll(' ', '-')}`} onClick={(e) => handleLinkClick(e, category)}>
                      <>
                      Apply for
                      {
                        category === "Employee" ? " Full time Employment" :
                        ` Full time/Part time ${category} ${category === "Freelancer" ? 'jobs' : ''}`
                      }
                      </>
                    </Link>
                  }))
                }
                  
              </div>
            </div>
          </div>
        </section>
        <aside>
          <div className='side__Content'>
            <img src={assets.map_img} alt='dowell on the map' />
            <video width={'100%'} controls>
              <source src={assets.dowell_video}></source>
            </video>
            <p>DoWell is the right place to "fail", if you are innovating !!</p>
          </div>
        </aside>
      </main>
      {/* <div className='container-wrapper candidate__Home__Page'>
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
                      <button className='apply-button' >View</button>                     
                    </div>
                  </div>
                </div>
              </>
            }))
          }
        </div>
      </div> */}
    </>
  )
}

export default Home