import React, {useState, useEffect} from 'react';
import './Job.css';
import { FaToolbox } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import ErrorPage from '../../../error/ErrorPage';
import Search from '../../../Hr/component/Search/Search';
import { BsCashStack, BsShare } from 'react-icons/bs';
import { handleShareBtnClick } from '../../utils/helperFunctions';
import { candidateStatuses } from '../../utils/candidateStatuses';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import { jobKeys } from '../../../admin/utils/jobKeys';


function JobScreen({ currentUser, hired, setHired }) {
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const navigate = useNavigate();
    const { section } = useNavigationContext();
    const [ isLoading, setLoading ] = useState(true);
    const [allRequestsDone, setAllRequestsDone] = useState(false);

    useEffect(() => {

        async function fetchApplications(){
            
            try{
            
                const response = await myAxiosInstance.get(routes.Applications);
                const currentUserAppliedJobs = response.data.filter(application => application.applicant === currentUser.username);
                if (currentUserAppliedJobs.filter(application => application.status === candidateStatuses.ONBOARDING).length  >= 1) {
                    return setHired(true);
                }
                setAppliedJobs(currentUserAppliedJobs);
                return;
                
            }catch(err) {
                console.log(err)
                return
            }

        }

        if (!currentUser) return setLoading(false);

        fetchApplications();

    }, [])
    
    useEffect(() => {

        async function fetchData(){
            
            try {
                
                const request = await myAxiosInstance.get(routes.Jobs);
                setJobs(request.data);
                setJobsLoading(false);
                return;

            } catch (error) {
                console.log(error);
                return
            }
            
        }
        fetchData();
        setAllRequestsDone(true);

    }, []);

    useEffect(() => {

        if (!allRequestsDone) return;

        setLoading(false);

    }, [allRequestsDone])

    const handleApplyButtonClick = (currentJob) => {
        navigate(`/apply/job/${currentJob.id}`, { state: { currentUser: currentUser } })
    }
    
    return <>
        
        {
            isLoading ? <></> :

            <>
              <Navbar title='Jobs' disableSideBar={currentUser ? false : true} />
            
              <div className='container-wrapper'>

                <Search />

                <div className="row">
                    {
                        section == undefined || section === "home" ? <>
                            {
                                jobsLoading ? <LoadingSpinner /> :

                                React.Children.toArray(jobs.map(job => {
                                
                                if (!job.is_active) return <></>

                                return <>
                                    <div className="card" key={job.id}>

                                        <div className="container">

                                            <Link to={'#'} onClick={() => handleShareBtnClick("Dowell Job Portal", "Check out jobs on Dowell!", window.location)}>
                                                <BsShare className='share__Job__Btn' />
                                            </Link>

                                            <div className='row-text'>
                                                <h4><b>{job.title}</b></h4>
                                                <p className='detail dowell'>Dowell Ux living lab</p>
                                                <p className='detail skill'>Skills: {job.skills.length > 20 ? job.skills.slice(0, 20) + "..." : job.skills}</p>
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
                                                        <FaToolbox/>
                                                        {job.time_period}
                                                    </li>
                                                    {
                                                        job.others[jobKeys.paymentForJob] &&
                                                        <li>
                                                            <BsCashStack />
                                                            {job.others[jobKeys.paymentForJob]}
                                                        </li>
                                                    }
                                                    <li>
                                                        <span className='free'>{job.typeof}</span>
                                                    </li>
                                                </ul>
                                                </IconContext.Provider>
                                            </div>

                                        </div>
                                    </div>
                                </>
                                }))
                            }
                        </>: 

                        <>
                            <ErrorPage disableNav={true} />
                        </>

                    }

                    
                {currentUser && <Footer />}
                    
                </div>
                </div>
            </>
        }
 
    </>
}

export default JobScreen