import React, {useState, useEffect} from 'react';
import './css/Job.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { myAxiosInstance } from '../../lib/axios';
import { routes } from '../../lib/request';
import { useNavigate } from 'react-router-dom';
import { useNavigationContext } from '../../contexts/NavigationContext';
import { tasksData } from '../teamlead/tasks';
import JobTile from '../teamlead/components/JobTile/JobTile';
import ErrorPage from '../error/ErrorPage';
import Search from '../Hr/component/Search/Search';



function JobScreen({ currentUser }) {
    const [jobs, setJobs]=useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const navigate = useNavigate();
    const { section } = useNavigationContext();

    useEffect(() => {

        async function fetchApplications(){
            
            try{
            
                const response = await myAxiosInstance.get(routes.Applications);
                const currentUserAppliedJobs = response.data.filter(application => application.applicant === currentUser.username);
                setAppliedJobs(currentUserAppliedJobs);
                return;
                
            }catch(err) {
                console.log(err)
                return
            }

        }

        if (!currentUser) return;

        fetchApplications();

    }, [])
    
    useEffect(() => {

        async function fetchData(){
            
            try {
                
                const request = await myAxiosInstance.get(routes.Jobs);
                setJobs(request.data);
                return;

            } catch (error) {
                console.log(error);
                return
            }
            
        }
        fetchData();

    }, []);

    const handleApplyButtonClick = (currentJob) => {
        console.log("click")
        navigate("/apply/job", { state: { jobToApplyTo: currentJob, currentUser: currentUser } })
    }
    
    return (
        <div className='container-wrapper'>

            <Search />

            <div className="row">
                {
                    section == undefined || section === "home" ? <>
                        {jobs.map(job=>(
                            <div className="card" key={job.id}>

                                <div className="container">
                                    <div className='row-text'>
                                        <h4><b>{job.title}</b></h4>
                                        <p className='detail dowell'>Dowell Ux living lab</p>
                                        <p className='detail skill'>Skills: {job.skills}</p>
                                        {
                                            appliedJobs.find(appliedJob => appliedJob.job === job.id ) == undefined ?
                                            <button className='apply-button' onClick={() => handleApplyButtonClick(job)}>Apply</button> :
                                            <button className='apply-button' disabled={true}>Applied</button>
                                        }
                                    
                                    </div>
                                

                                    <div className='row-bottom'>
                                    <IconContext.Provider value={{ color: '#838383', size:'14px' }}>
                                        <ul className='job__Detail__Span_Container'>
                                            <li>
                                                <FaIcons.FaToolbox/>
                                                {job.time_period}
                                            </li>
                                            <li>
                                                <span className='free'>{job.typeof}</span>
                                            </li>
                                        </ul>
                                        </IconContext.Provider>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </>: 

                    section == "task" ? <>
                        <div className="tasks-container">
                            {
                                React.Children.toArray(tasksData.map(dataitem => {
                                    return <JobTile showTask={true} taskData={dataitem} handleJobTileClick={() => {}} />
                                }))
                            }
                        </div>
                    </> : <>
                        <ErrorPage disableNav={true} />
                    </>

                }

                
                
            </div>
        </div>
    )
}

export default JobScreen