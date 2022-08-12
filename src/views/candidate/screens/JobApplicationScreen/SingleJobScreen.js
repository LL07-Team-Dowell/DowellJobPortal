import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate, useParams } from "react-router-dom";
import { dowellLoginUrl, myAxiosInstance } from "../../../../lib/axios";
import { routes } from "../../../../lib/routes";
import LoadingSpinner from "../../../admin/components/LoadingSpinner/LoadingSpinner";
import CustomHr from "../../../teamlead/components/CustomHr/CustomHr";
import Navbar from "../../components/Navbar/Navbar";
import { handleShareBtnClick } from "../../utils/helperFunctions";
import { dowellInfo, dowellLinks } from "../../utils/jobFormApplicationData";
import { jobKeys } from "../../../admin/utils/jobKeys";

const SingleJobScreen = ({ user }) => {

    const { jobTitle } = useParams();
    const [ allJobs, setAllJobs ] = useState([]);
    const [ currentJob, setCurrentJob ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    const fetchAllJobs = async () => {
        const response = await myAxiosInstance.get(routes.Jobs);
        setAllJobs(response.data);
        setLoading(false);
        return
    }

    useEffect(() => {

        fetchAllJobs();

    }, [])

    useEffect(() => {

        const formattedAllJobs = allJobs.map(job => ({ id: job.id, title: job.title.slice(-1) === " " ? job.title.slice(0, -1).toLocaleLowerCase().replaceAll("/", "-").replaceAll(" ", "-") : job.title.toLocaleLowerCase().replaceAll("/", "-").replaceAll(" ", "-") }))
        
        const foundJob = formattedAllJobs.find(job => job.title === jobTitle);

        if (!foundJob) return setCurrentJob(null);

        const currentJobDetails = allJobs.find(job => job.id === foundJob.id);
        setCurrentJob(currentJobDetails);

    }, [jobTitle, allJobs])

    const handleApplyBtnClick = () => {

        if (!user) return window.location.href = dowellLoginUrl;

        navigate(`/apply/job/${currentJob.id}/form/`, { state: { currentUser: user } });

    }


    if (loading) return <LoadingSpinner />
    
    return <>
        <Navbar changeToBackButton={true} backButtonLink={"/home"} removeShareOptions={currentJob ? false : true} handleShareJobBtnClick={() => handleShareBtnClick(currentJob.title, `Apply for ${currentJob.title} on Dowell!`, window.location)} />
        <div className="container-wrapper candidate__Job__Application__Container">
            {
                !currentJob ? <>
                    <h1><b>Job posting not available</b></h1>

                    <div className='apply_Btn_Container'>
                        <button className="apply-btn" onClick={() => navigate("/home")}>Go To All Jobs</button>
                    </div>
                </> : 
                
                <>
                    <h1><b>{ currentJob.title }</b></h1>
                    <p>Dowell Ux living lab</p>
                    <CustomHr className={'relative-hr'} />
                    <div className="job__Skills__Info">
                        <span>
                            <AiOutlinePlayCircle />
                            Start Date: Immediately
                        </span>
                        <span>
                            <BusinessCenterIcon className="small-icon" />
                            Duration: { currentJob.time_period}
                        </span>
                        {
                            currentJob.others && currentJob.others[jobKeys.paymentForJob] &&
                            <span>
                                <BsCashStack />
                                Stipend: { currentJob.others[jobKeys.paymentForJob]}
                            </span>
                        }
                    </div>
                    <CustomHr className={'relative-hr hr-2'} />
                    <div className="job__Skills__Info">
                        <span>
                            Skills: { currentJob.skills }
                        </span>
                    </div>

                    <h2><b>Job Description</b></h2>

                    <p className="about__Dowell">{currentJob.description}</p>

                    <h2 className="about__Dowell__Title"><b>About D'Well Research</b></h2>
                    <p className="about__Dowell">{dowellInfo}</p>

                    <div className="social__Icons__Container">
                        {
                            React.Children.toArray(dowellLinks.map(dowellLink => {
                                return <a aria-label={dowellLink.title} href={dowellLink.link} rel="noopener" target="_blank" className="social__Icon__Item">
                                    {dowellLink.icon}
                                </a>
                            }))
                        }
                    </div>

                    <div className='apply_Btn_Container'>
                        <button className="apply-btn" onClick={handleApplyBtnClick}>Apply</button>
                    </div>
                </>
            }
        </div>
    </>

}

export default SingleJobScreen;
