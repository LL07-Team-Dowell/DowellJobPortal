import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import { PageUnderConstruction } from '../../../under_construction/ConstructionPage';
import { useSearchParams, useNavigate } from 'react-router-dom';
import "./style.css";
import TitleNavigationBar from '../../../../components/TitleNavigationBar/TitleNavigationBar';

function AlertScreen() {
  const [ params, setParams ] = useSearchParams();
  const [ passedCategory, setPassedCategory ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobCategoryParam = params.get("jobCategory");

    if (!jobCategoryParam) return;

    setPassedCategory(jobCategoryParam);

  }, [params])

  return (
    <div className='candidate__Alerts__Page'>
      <TitleNavigationBar title={"Alerts"} handleBackBtnClick={() => navigate(-1)} />
      <PageUnderConstruction />
      <Footer currentCategory={passedCategory && passedCategory}/>
    </div>
  )
}

export default AlertScreen