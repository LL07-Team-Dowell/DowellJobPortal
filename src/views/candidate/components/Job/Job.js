import React, {useState, useEffect} from 'react';
import './Job.css';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import ErrorPage from '../../../error/ErrorPage';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import { jobKeys } from '../../../admin/utils/jobKeys';
import TogglerNavMenuBar from '../../../../components/TogglerNavMenuBar/TogglerNavMenuBar';
import JobCard from '../../../../components/JobCard/JobCard';
import TitleNavigationBar from '../../../../components/TitleNavigationBar/TitleNavigationBar';
import { changeToTitleCase } from '../../../../helpers/helpers';
import { useCandidateJobsContext } from '../../../../contexts/CandidateJobsContext';


function JobScreen({ currentUser }) {
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const { candidateJobs } = useCandidateJobsContext();
    const navigate = useNavigate();
    const { section } = useNavigationContext();
    const [ isLoading, setLoading ] = useState(true);
    const [allRequestsDone, setAllRequestsDone] = useState(false);
    const [ jobsMatchingCategory, setJobsMatchingCategory ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState("all");
    const [ params, setParams ] = useSearchParams();
    const [ jobSelectionHasCategory, setJobSelectionHasCategory ] = useState(false);
    const [ jobSelectionCategories, setJobSelectionCategories ] = useState(null);
    const [ currentJobCategory, setCurrentJobCategory ] = useState(null);
    const [ jobsToDisplay, setJobsToDisplay ] = useState([]);

    useEffect(() => {

        const findJobsMatchingCategory = (category) => jobs.filter(job => job.typeof.toLocaleLowerCase().includes(category.toLocaleLowerCase()) || category.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase()));

        const jobCategoryParam = params.get('jobCategory');
        const currentJobStream = params.get('stream');

        if (jobCategoryParam) {
            setCurrentCategory(jobCategoryParam);

            if (jobCategoryParam === "all") return setJobsMatchingCategory(jobs);

            setJobSelectionHasCategory(true);

            const matchedJobs = findJobsMatchingCategory(jobCategoryParam);
            setJobsMatchingCategory(matchedJobs)
            
            if (jobCategoryParam === "Intern") {
                setJobSelectionCategories(["Full time", "Part time"])
                const jobsToDisplayForCurrentCategory = matchedJobs.filter(job => job.others[jobKeys.othersInternJobType] === currentJobCategory);
                if (jobsToDisplayForCurrentCategory.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
                setJobsToDisplay(jobsToDisplayForCurrentCategory);
            }
            if (jobCategoryParam === "Employee") {
                setJobSelectionCategories(["Full time"])
                setJobsToDisplay(matchedJobs);
            }
            if (jobCategoryParam === "Research Associate") {
                setJobSelectionCategories(["Full time", "Part time"])
                const jobsToDisplayForCurrentCategory = matchedJobs.filter(job => job.others[jobKeys.othersResearchAssociateJobType] === currentJobCategory);
                if (jobsToDisplayForCurrentCategory.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
                setJobsToDisplay(jobsToDisplayForCurrentCategory);
            }
            if (jobCategoryParam === "Freelancer") {
                setJobSelectionCategories(["Task based", "Time based"]) 
                const jobsToDisplayForCurrentCategory = matchedJobs.filter(job => job.others[jobKeys.othersFreelancerJobType] === currentJobCategory);
                if (jobsToDisplayForCurrentCategory.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
                setJobsToDisplay(jobsToDisplayForCurrentCategory);
            }

            return
        }

    }, [jobs, params])

    useEffect(() => {
        
        if (!jobSelectionCategories) return
        setCurrentJobCategory(jobSelectionCategories[0]);

    }, [jobSelectionCategories])

    useEffect(() => {

        if (!currentJobCategory) return

        if (currentCategory === "Intern") {

            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersInternJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsToDisplay(matchedJobs);

        }

        if (currentCategory === "Employee") return

        if (currentCategory === "Research Associate") {

            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersResearchAssociateJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsToDisplay(matchedJobs);

        }

        if (currentCategory === "Freelancer") {
            
            const matchedJobs = jobsMatchingCategory.filter(job => job.others[jobKeys.othersFreelancerJobType] === currentJobCategory);
            if (matchedJobs.length === 0) return setJobsToDisplay(jobs.filter(job => job.typeof.toLocaleLowerCase().includes(currentCategory.toLocaleLowerCase()) || currentCategory.toLocaleLowerCase().includes(job.typeof.toLocaleLowerCase())))
            setJobsToDisplay(matchedJobs);

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
    
    return <div className='candidate__Jobs__Wrapper'>
        
        {
            isLoading ? <></> :

            <>
                <TitleNavigationBar title={`${changeToTitleCase(currentCategory)} Jobs`} showSearchBar={true} handleBackBtnClick={() => currentCategory ? navigate(-1) : navigate("/home")} />

                <div className='candidate__Jobs__Container'>
                    {
                        jobsLoading || !jobSelectionHasCategory ? <></> :
                        <TogglerNavMenuBar className={`candidate__Job__Selections__Toggler ${currentCategory.toLocaleLowerCase() === "employee" ? "single__Item" : ""}`} menuItems={jobSelectionCategories} currentActiveItem={currentJobCategory} handleMenuItemClick={(item) => setCurrentJobCategory(item)} />
                    }
                    
                    <div className='all__Current__Jobs__Container'>
                        {
                            section == undefined || section === "home" ? <>
                                {
                                    jobsLoading ? <LoadingSpinner /> :
    
                                    jobsToDisplay.length === 0 ? <>No '{currentCategory}' jobs currently available</> :
    
                                    jobsToDisplay.length >= 1 && currentCategory !== "all" && jobsToDisplay.every(job => !job.is_active) ? <>No '{currentCategory}' jobs currently available</> :
        
                                    React.Children.toArray(jobsToDisplay.map(job => {
                                            
                                        if (!job.is_active) return <></>

                                        return <JobCard 
                                            job={job} 
                                            candidateViewJob={true}
                                            subtitle={currentCategory} 
                                            disableActionBtn={currentUser ? candidateJobs.appliedJobs.find(appliedJob => appliedJob.job === job.id ) == undefined ? false : true : false} 
                                            buttonText={currentUser ? candidateJobs.appliedJobs.find(appliedJob => appliedJob.job === job.id ) == undefined ? "Apply" : "Applied": "Apply"} 
                                            handleBtnClick={(job) => handleApplyButtonClick(job)}
                                        /> 
                                    }))
                            }
                            </> :
                            <>
                                <ErrorPage disableNav={true} />
                            </>
                        }
                    </div>
                </div>
            </>
        }
 
    </div>
}

export default JobScreen