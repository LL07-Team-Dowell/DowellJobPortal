import React, {useState, useEffect} from 'react';
import './css/Applied.css';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { myAxiosInstance } from '../../axios';
import { loginUser } from './temporary/loginUser';
import { useAppliedJobsContext } from '../../contexts/AppliedJobsContext';






function Applied() {
  const [Applied, sethandleAppliedShow]=useState(true);
  const [Interview, sethandleInterviewShow]=useState(false);
  const { appliedJobsState } = useAppliedJobsContext();
  
  const getAppliedData = async () => {
    // const response = await myAxiosInstance.get("/jobs/get_jobs/")
    // console.log(response.data)
    console.log(appliedJobsState)
  }

  useEffect(() => {

    loginUser();
    // getAppliedData();

  }, [])

  useEffect(() => {
    getAppliedData();
  }, [])

  

  const show =() => sethandleAppliedShow(!Applied) || sethandleInterviewShow(!Interview);


  return (
    <div className='wrapper'>
      <div className='containers'>
      <div className="slide-controls">
               <input type="radio" name="slide" id="applied" defaultChecked={true} />
               <input type="radio" name="slide" id="interview"/>
               <label  htmlFor="applied" className="slide applied" onClick={show}>Applied ({appliedJobsState.appliedJobs.length})</label>
               <label  htmlFor="interview" className="slide interview" onClick={show}>Interview ({appliedJobsState.jobsToInterviewFor.length})</label>
               <div className="slider-tab"></div>
            </div>
      <div className='container__inner'>
        <div className={ Applied ? 'cards__switch applied__card': 'cards__switch'}>
          <div className='applied__row'>
            <div className='applied__column'>
              {
                React.Children.toArray(appliedJobsState.jobsToInterviewFor.map(job => {
                  return <>
                    <div className='card__cover'>
                      <div className='cards '>
                        <div className='card__container'>
                          <div className='text__row'>
                            <h3 className='applied__title'>{job.title} <span className='applied__time'>1 day ago</span></h3>
                          </div>
                          <div className='applied__status'>
                          <ul>
                            <li><BsIcons.BsExclamationCircle/> Application sent</li>
                            <IconContext.Provider value={{ color: '#000', size:'14px' }}>
                            <li><span>view <ImIcons.ImArrowRight2/></span> </li>
                            </IconContext.Provider>
                          </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }))
              }

            </div>
          </div>

        </div>
        <div className={ Interview ? 'cards__switch interview__card': 'cards__switch'}>
          <div className='applied__rows'>
            <div className='applied__columns'>
              {
                React.Children.toArray(appliedJobsState.appliedJobs.map(appliedJob => {
                  return <>
                    <div className='cards__body'>
                      <div className='cards__content'>
                        <div className='text__content'>
                          <h3> {appliedJob.title}</h3>
                          <p className='interview__sheduled'> Interview scheduled (date & time)</p>
                          <p className='view__detail'><span>View details</span></p>
                        </div>
                        <div className='bottom__side'>
                          <div className='interview__status'>
                            <ul>
                              <li><AiIcons.AiOutlineCheckCircle/> Interview with Hr</li>
                            </ul>
                          </div>
                          <div className='discord__link'>
                          <button className='discord__btn'>Discord</button>
                            <p> Join link to have interview <br/>with Hr</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </>
                }))
              }
            </div>  
          </div>

        </div>
      </div>
      </div>
    </div>
  )
}

export default Applied;
