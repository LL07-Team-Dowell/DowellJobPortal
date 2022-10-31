import React, {useState, useEffect} from 'react';
import './Job.css';
import { FaToolbox } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import ErrorPage from '../../../error/ErrorPage';
import Search from '../../../Hr/component/Search/Search';
import { BsCashStack, BsShare } from 'react-icons/bs';
import { handleShareBtnClick } from '../../utils/helperFunctions';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import { jobKeys } from '../../../admin/utils/jobKeys';
import { changeToTitleCase } from '../../../../helpers/helpers';


function JobScreen({ currentUser }) {
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const navigate = useNavigate();
    const { section } = useNavigationContext();
    const [ isLoading, setLoading ] = useState(true);
    const [allRequestsDone, setAllRequestsDone] = useState(false);
    const location = useLocation();
    const [ jobsMatchingCategory, setJobsMatchingCategory ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState("all");
    const [ params, setParams ] = useSearchParams();
    const [ jobSelectionHasCategory, setJobSelectionHasCategory ] = useState(false);
    const [ jobSelectionCategories, setJobSelectionCategories ] = useState(null);
    const [ currentJobCategory, setCurrentJobCategory ] = useState(null);

    useEffect(() => {

        const findJobsMatchingCategory = (category) => jobs.filter(job => job.typeof.toLocaleLowerCase().includes(category.toLocaleLowerCase()) || category.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase()));

        const jobCategoryParam = params.get('jobCategory');

        if (jobCategoryParam) {
            setCurrentCategory(jobCategoryParam);

            if (jobCategoryParam === "all") return setJobsMatchingCategory(jobs);

            setJobSelectionHasCategory(true);

            if (jobCategoryParam === "Intern") setJobSelectionCategories(["Full time", "Part time"])
            if (jobCategoryParam === "Employee") setJobSelectionCategories(["Full time"])
            if (jobCategoryParam === "Research Associate") setJobSelectionCategories(["Full time", "Part time"])
            if (jobCategoryParam === "Freelancer") setJobSelectionCategories(["Task based", "Time based"])

            const matchedJobs = findJobsMatchingCategory(jobCategoryParam);
            setJobsMatchingCategory(matchedJobs)
            return
        }

        if ((!location.state) || (!location.state.jobCategory)) return setJobsMatchingCategory(jobs);

        setCurrentCategory(location.state.jobCategory);
        
        if (location.state.jobCategory === "all") return setJobsMatchingCategory(jobs);

        setJobSelectionHasCategory(true);

        if (location.state.jobCategory === "Intern") setJobSelectionCategories(["Full time", "Part time"])
        if (location.state.jobCategory === "Employee") setJobSelectionCategories(["Full time"])
        if (location.state.jobCategory === "Research Associate") setJobSelectionCategories(["Full time", "Part time"])
        if (location.state.jobCategory === "Freelancer") setJobSelectionCategories(["Task based", "Time based"])

        const matchedJobs = findJobsMatchingCategory(location.state.jobCategory);
        setJobsMatchingCategory(matchedJobs);

        if (!location.state.appliedJobs) return

        setAppliedJobs(location.state.appliedJobs);
        
    }, [jobs, location, params])

    useEffect(() => {
        
        if (!jobSelectionCategories) return
        setCurrentJobCategory(jobSelectionCategories[0]);

    }, [jobSelectionCategories])

    useEffect(() => {

        if (!currentJobCategory) return

        if (currentCategory === "Intern") {

            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersInternJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsMatchingCategory(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsMatchingCategory(matchedJobs);

        }

        if (location.state.jobCategory === "Employee") return

        if (location.state.jobCategory === "Research Associate") {

            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersResearchAssociateJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsMatchingCategory(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsMatchingCategory(matchedJobs);

        }

        if (location.state.jobCategory === "Freelancer") {
            
            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersFreelancerJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsMatchingCategory(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsMatchingCategory(matchedJobs);

        }

    }, [currentJobCategory])
    
    useEffect(() => {

        async function fetchData(){
            
            try {
                
                const request = await myAxiosInstance.get(routes.Jobs);
                setJobs(request.data.sort((a, b) => a.title.localeCompare(b.title)));
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
              <Navbar title={`${changeToTitleCase(currentCategory)} Jobs`} disableSideBar={currentUser ? false : true} />
            
              <div className='container-wrapper'>

                {/* <Search searchValue={jobSearchInput} updateSearchValue={setSearchInput} /> */}

                <div className='job__Categories__Container'>
                    {
                        jobsLoading || !jobSelectionHasCategory ? <></> :
                        React.Children.toArray(jobSelectionCategories.map(category => {
                            return <span className={`${category === currentJobCategory ? 'active' : ''}`} onClick={() => setCurrentJobCategory(category)}>{category}</span>
                        }))
                    }
                </div>

                <div className="row">
                    {
                        section == undefined || section === "home" ? <>
                            {
                                jobsLoading ? <LoadingSpinner /> :

                                jobsMatchingCategory.length === 0 ? <>No '{currentCategory}' jobs currently available</> :

                                jobsMatchingCategory.length >= 1 && currentCategory !== "all" && jobsMatchingCategory.every(job => !job.is_active) ? <>No '{currentCategory}' jobs currently available</> :

                                React.Children.toArray(jobsMatchingCategory.map(job => {
                                
                                if (!job.is_active) return <></>

                                return <>
                                    <div className="card" key={job.id}>

                                        <div className="container">

                                            <Link to={'#'} onClick={(e) => { e.preventDefault(); handleShareBtnClick(job.title, `Apply for ${job.title} on Dowell!`, `${process.env.PUBLIC_URL}/#/jobs/${job.title.slice(-1) === " " ? job.title.slice(0, -1).toLocaleLowerCase().replaceAll("/", "-").replaceAll(" ", "-") : job.title.toLocaleLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`)} }>
                                                <BsShare className='share__Job__Btn' />
                                            </Link>

                                            <div className='row-text'>
                                                <h4><b>{job.title.length > 25 ? job.title.slice(0, 25) + "..." : job.title}</b></h4>
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

                    
                {currentUser && <Footer currentCategory={currentCategory} />}
                    
                </div>
                </div>
            </>
        }
 
    </>
}

export default JobScreen