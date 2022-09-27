import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { PageUnderConstruction } from '../../../under_construction/ConstructionPage';
import { useSearchParams } from 'react-router-dom';

function AlertScreen() {
  const [ params, setParams ] = useSearchParams();
  const [ passedCategory, setPassedCategory ] = useState(null);

  useEffect(() => {
    const jobCategoryParam = params.get("jobCategory");

    if (!jobCategoryParam) return;

    setPassedCategory(jobCategoryParam);

  }, [params])

  return (
    <div>
        <Navbar title="Alerts"/>
        <PageUnderConstruction />
        <Footer currentCategory={passedCategory && passedCategory}/>
    </div>
  )
}

export default AlertScreen