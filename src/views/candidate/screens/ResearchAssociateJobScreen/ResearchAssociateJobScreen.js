import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineCloudUpload, AiOutlineLogout } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as assets from '../../../../assets/assetsIndex';
import { validateEmail } from '../../../../helpers/helpers';
import { communityAxiosInstance, locationAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';
import { continentsData } from '../../utils/continentsData';
import "./style.css";


const ResearchAssociateJobScreen = () => {
    const navigate = useNavigate();
    const [ researchJobs, setResearchJobs ] = useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchItemSelected, setSearchSearchSelected ] = useState({
        country: false,
        city: false,
    });
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ continents, setContinents ] = useState([]);
    const [ continentsSearchResult, setContinentsSearchResult ] = useState(null);
    const [ continentsLoading, setContinentsLoading ] = useState(true);
    const [ continentSelected, setContinentSelected ] = useState(null);
    const [ countrySelected, setCountrySelected ] = useState(null);
    const [ countriesLoading, setCountriesLoading ] = useState(false);
    const [ regionsLoading, setRegionsLoading ] = useState(false);
    const [ countriesResult, setCountries ] = useState([]);
    const [ regionsResult, setRegions ] = useState([]);
    const [ regionsLoaded, setRegionsLoaded ] = useState(false);
    const [ regionSelected, setRegionSelected ] = useState(null);
    const [ jobsForCurrentRegion, setJobsForCurrentRegion ] = useState([]);
    const [ showJobModal, setShowJobModal ] = useState(false);
    const [ showJobForm, setShowJobForm ] = useState(false);
    const [ selectedJob, setSelectedJob ] = useState(null);
    const [ candidateDetails, setCandidateDetails ] = useState({
        email: "",
        Individual_name: "",
        Individual_address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    });
    const [ disableSubmitBtn, setDisableSubmitBtn ] = useState(false);
    const [ submitLoading, setSubmitLoading ] = useState(true);
    const location = useLocation();
    const testSessionId = "haikalsb1234";
    const locationProjectCode = "100074";
    const testUsername = "johnDoe123";

    const fetchResearchJobs = async () => {
        try {
            const response = await communityAxiosInstance.get(routes.Get_Research_Jobs);
            setResearchJobs(response.data.filter(job => job.typeof === "Research Associate" && job.is_active));
            return    
        } catch (error) {
            console.log(error)
        }
        
    }
    const fetchAllContinents = async () => {
        if (!currentUser) {
            try {
                const response = await locationAxiosInstance.get("/continents/" + testUsername + "/" + testSessionId + "/" + locationProjectCode);
                setContinents(response.data);
                setContinentsLoading(false);
                return
            } catch (error) {
                console.log(error);
                setContinentsLoading(false);
            }
            
        }

        try {
            const response = await locationAxiosInstance.get("/continents/" + currentUser.username + "/" + testSessionId + "/" + locationProjectCode);
            setContinents(response.data);
            setContinentsLoading(false);
            return
        } catch (error) {
            console.log(error)
            setContinentsLoading(false);
        }
        
    }

    const fetchAllRegionsInCountry = async (country) => {
        if (!country) return setRegionsLoading(false)
        
        if (!currentUser) {
            try {
                const response = await locationAxiosInstance.get("/region/name/" + country + "/" + testUsername + "/" + testSessionId + "/" + locationProjectCode);
                setRegions(response.data);
                setRegionsLoading(false);
                setRegionsLoaded(true);
                return
            } catch (error) {
                console.log(error);
                setRegions([]);
                setRegionsLoading(false);
                setRegionsLoaded(true);
            }
            
        } 
        try {
            const response = await locationAxiosInstance.get("/region/name/" + country + "/" + currentUser.username + "/" + testSessionId + "/" + locationProjectCode);
            setRegions(response.data);
            setRegionsLoading(false);
            setRegionsLoaded(true);
            return
        } catch (error) {
            console.log(error);
            setRegions([]);
            setRegionsLoading(false);
            setRegionsLoaded(true);
        }
        
    }

    const updateCandidateDetails = (key, value) => {
        if (!key || !value) return
        setCandidateDetails(prevValue => { return { ...prevValue, [key]: value }})
    }

    useEffect(() => {

        if (!location.state || !location.state.currentUser) return
        setCurrentUser(location.state.currentUser);

        if (continents.length > 1) return
        fetchAllContinents();

    }, [location])

    useEffect(() => {
        
        fetchResearchJobs();
        fetchAllContinents();

    }, [])

    useEffect(() => {

        if (regionsLoaded) return
        if (!countrySelected || regionsLoading) return

        setRegionsLoading(true);
        fetchAllRegionsInCountry(countrySelected);

    }, [countrySelected, regionsLoading, regionsLoaded])

    useEffect(() => {

        if (searchInput.length < 1) {
            setContinentsSearchResult(null);
            return
        }
        
        if (searchItemSelected.country) {
            const allContinentsDataKeys = Object.keys(continentsData || {});
            const results = [];
            allContinentsDataKeys.forEach(key => {
                let foundContinentsWithCountry = continentsData[key].filter(country => country.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()));
                if (foundContinentsWithCountry.length > 0) {
                    const matchingContinent = continents.find(continent => continent.name === key);
                    
                    if (!matchingContinent) return
                    results.push(matchingContinent)
                }
            })
            return setContinentsSearchResult(results);
        }

        if (searchItemSelected.city) {
            return setContinentsSearchResult(null)
        }

    }, [searchInput, searchItemSelected, countrySelected])

    const handleBackBtnClick = () => navigate("/");

    const handleSearchRadioChange = (selection) => {
        if (selection === "country") return setSearchSearchSelected({ country: true, city: false })
        if (selection === "city") return setSearchSearchSelected({ country: false, city: true })
        setSearchSearchSelected({ country: false, city: false })
    }

    const handleContinentClick = (continentSelected) => {
        if (!continentSelected || countriesLoading || regionsLoading) return

        setCountriesLoading(true);
        setContinentSelected(continentSelected);

        const foundContinentData = continentsData[continentSelected.name];
        if (!foundContinentData) {
            setCountries([]);
            return setCountriesLoading(false);
        }

        setCountries(foundContinentData);
        setCountriesLoading(false);
    }

    const handleCountryClick = (countrySelected) => {
        if (!countrySelected || regionsLoading) return
        setCountrySelected(null);
        setCountrySelected(countrySelected);
        setRegionsLoaded(false);
    }

    const handleRegionClick = (regionSelected) => {
        if (!regionSelected) return
        setRegionSelected(null);
        setRegionSelected(regionSelected);
    }

    const handleApplyBtnClick = () => {
        if (!countrySelected) return toast.info("Please select a country");
        if (!regionSelected) return toast.info("Please select a city");
        
        const jobsExistingForRegionAndCountry = researchJobs.filter(job => job.location === countrySelected && job.others && others["city"] === regionSelected);
        if (jobsExistingForRegionAndCountry.length < 1) return toast.info("Sorry there are currently no jobs available in " + regionSelected.name + ", " + countrySelected);
        setJobsForCurrentRegion(jobsExistingForRegionAndCountry);
        setShowJobModal(true);
    }

    const handleJobItemClick = (job) => {
        setShowJobForm(true);
        setSelectedJob(job);
    }

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        
        if (candidateDetails.email.length < 1 || candidateDetails.Individual_name.length < 1 || candidateDetails.Individual_address.length < 1 ||candidateDetails.city.length < 1 ||candidateDetails.state.length < 1 ||candidateDetails.country.length < 1 || candidateDetails.phone.length < 1) return toast.info("Please fill in all fields!");
        if (!validateEmail(candidateDetails.email)) return toast.info("Please enter a valid email");

        setDisableSubmitBtn(true);
        setSubmitLoading(true);

        try {
            await communityAxiosInstance.post(routes.Submit_Research_Job_Application, candidateDetails);
            setDisableSubmitBtn(false);
            setSubmitLoading(false);
            setShowJobForm(false);
            setShowJobModal(false);
            toast.success("Successfully subbmitted your application!");
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
            setDisableSubmitBtn(false);
            setSubmitLoading(false);
        }
    }

    return <>
        <nav>
            <div className='candidate__Homepage__Nav__Container research'>
                <h1 className='nav__Title__Abs'>Join DoWell Team as a Research Associate</h1>
            </div>
        </nav>
        <main className='candidate__Homepage__Container'>
            <section className='research__Content__Container'>
                <div className='research__Location__SideBar'>
                    <div className='logo__Img__Container'>
                        <img src={assets.logo_img} alt='dowell logo' />
                    </div>
                    <div className='research__Location__SideBar__Outline'>
                        <p>Select your location</p>
                        <div className='selections__Container'>
                            <label>
                                <input type={"radio"} name={"country__Radio"} checked={searchItemSelected.country ? true : false} onChange={() => handleSearchRadioChange("country")} />
                                Country
                            </label>
                            <label>
                                <input type={"radio"} name={"city__Radio"} checked={searchItemSelected.city ? true : false} onChange={() => handleSearchRadioChange("city")} />
                                City
                            </label>
                        </div>
                        <div className='research__City__Search__Container'>
                            <input type={"text"} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        </div>
                        <div className='research__Search__Results'>
                            {
                                continentsLoading ? <LoadingSpinner /> : <>
                                    {
                                        continentsSearchResult ?

                                        continentsSearchResult.length === 0 ? <div className='continent__Item'>No countries found matching {searchInput}</div> :

                                        React.Children.toArray(continentsSearchResult.map(continent => {
                                            return <div className='continent__Item'>
                                                <p onClick={() => handleContinentClick(continent)} style={continentSelected && continentSelected.name === continent.name ? { color: "#008037" } : {}}>{continent.name}</p>
                                                {
                                                    continentSelected && continent.name === continentSelected.name ? <>
                                                        {
                                                            countriesLoading ? <LoadingSpinner /> : 
                                                            countriesResult.length === 0 ? <p className='country__Item'>No countries found in {continentSelected.name}</p> : <>
                                                            {
                                                                React.Children.toArray(countriesResult.map(country => {
                                                                    return <div className='country__Item'>
                                                                        <p onClick={() => handleCountryClick(country)} style={countrySelected && countrySelected === country ? { color: "#008037" } : {}}>{country}</p>
                                                                        {
                                                                            countrySelected && country === countrySelected ? <>
                                                                                {
                                                                                    regionsLoading ? <LoadingSpinner /> : 
                                                                                    regionsResult.length === 0 ? <div className='country__Item'>No cities found in {countrySelected}</div> :
                                                                                    <>
                                                                                        {
                                                                                            React.Children.toArray(regionsResult.map(region => {
                                                                                                return <div className='region__Item'>
                                                                                                    <p onClick={() => handleRegionClick(region)} style={regionSelected && regionSelected.name === region.name ? { color: "#008037" } : {}}>{region.name}</p>
                                                                                                </div>
                                                                                            }))
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </> : <></>
                                                                        }
                                                                    </div>
                                                                }))
                                                            }
                                                            </>
                                                        }
                                                    </> : <></>
                                                }
                                            </div>
                                        })) :

                                        React.Children.toArray(continents.map(continent => {
                                            return <div className='continent__Item'>
                                                <p onClick={() => handleContinentClick(continent)} style={continentSelected && continentSelected.name === continent.name ? { color: "#008037" } : {}}>{continent.name}</p>
                                                {
                                                    continentSelected && continent.name === continentSelected.name ? <>
                                                        {
                                                            countriesLoading ? <LoadingSpinner /> : 
                                                            countriesResult.length === 0 ? <p className='country__Item'>No countries found in {continentSelected.name}</p> : <>
                                                            {
                                                                React.Children.toArray(countriesResult.map(country => {
                                                                    return <div className='country__Item'>
                                                                        <p onClick={() => handleCountryClick(country)} style={countrySelected && countrySelected === country ? { color: "#008037" } : {}}>{country}</p>
                                                                        {
                                                                            countrySelected && country === countrySelected ? <>
                                                                                {
                                                                                    regionsLoading ? <LoadingSpinner /> : 
                                                                                    regionsResult.length === 0 ? <div className='country__Item'>No cities found in {countrySelected}</div> :
                                                                                    <>
                                                                                        {
                                                                                            React.Children.toArray(regionsResult.map(region => {
                                                                                                return <div className='region__Item'>
                                                                                                    <p onClick={() => handleRegionClick(region)} style={regionSelected && regionSelected.name === region.name ? { color: "#008037" } : {}}>{region.name}</p>
                                                                                                </div>
                                                                                            }))
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </> : <></>
                                                                        }
                                                                    </div>
                                                                }))
                                                            }
                                                            </>
                                                        }
                                                    </> : <></>
                                                }
                                            </div>
                                        }))
                                    }
                                </>
                            }
                        </div>
                        <div className='research__Apply__Container'>
                            <BsInfoCircle className='info__Icon' />
                            <div className='research__Apply__Btn grey__Bg' onClick={handleBackBtnClick}>
                                <AiOutlineLogout />
                                <p>Back</p>
                            </div>
                            <div className='research__Apply__Btn green__Bg' onClick={handleApplyBtnClick}>
                                <AiOutlineCloudUpload />
                                <p>Apply</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='research__Location__Map'>
                    
                </div>
            </section>
            {
                showJobModal && <div className='research__Job__Modal__Overlay'>
                    <div className='research__Job__Modal'>
                        {
                            showJobForm ? <>
                                <IoIosArrowBack className='close__Icon back__Icon' onClick={() => setShowJobForm(false)}  />
                                <h2 className='job__Title'>{selectedJob.title}</h2>
                                <form>
                                    <label>
                                        <p>Email</p>
                                        <input type={"email"} value={candidateDetails.email} onChange={(e) => updateCandidateDetails("email", e.target.value)} />
                                    </label>
                                    <label>
                                        <p>Full Name</p>
                                        <input type={"text"} value={candidateDetails.Individual_name} onChange={(e) => updateCandidateDetails("Individual_name", e.target.value)}  />
                                    </label>
                                    <label>
                                        <p>Address</p>
                                        <input type={"text"} value={candidateDetails.Individual_address} onChange={(e) => updateCandidateDetails("Individual_address", e.target.value)} />
                                    </label>
                                    <label>
                                        <p>City</p>
                                        <input type={"text"} value={candidateDetails.city} onChange={(e) => updateCandidateDetails("city", e.target.value)} />
                                    </label>
                                    <label>
                                        <p>State</p>
                                        <input type={"text"} value={candidateDetails.state} onChange={(e) => updateCandidateDetails("state", e.target.value)} />
                                    </label>
                                    <label>
                                        <p>Country</p>
                                        <input type={"text"} value={candidateDetails.country} onChange={(e) => updateCandidateDetails("country", e.target.value)} />
                                    </label>
                                    <label>
                                        <p>Phone number</p>
                                        <input type={"number"} value={candidateDetails.phone} onChange={(e) => updateCandidateDetails("phone", e.target.value)} />
                                    </label>
                                    <button className='submit__Btn' disabled={disableSubmitBtn} onClick={handleSubmitApplication}>{submitLoading ? <LoadingSpinner width={"1rem"} height={"1rem"} color={"#fff"} /> : "Apply"}</button>
                                </form>
                            </> : <>
                                <AiOutlineClose className='close__Icon' onClick={() => setShowJobModal(false)} />
                                {
                                    React.Children.toArray(jobsForCurrentRegion.map(job => {
                                        return <p className='job__Item' onClick={() => handleJobItemClick(job)}>{job.title}</p>
                                    }))
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </main>
    </>
}

export default ResearchAssociateJobScreen;
