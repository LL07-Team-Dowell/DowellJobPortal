import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Job from '../Job';



function Home() {
  return (
    <div>
      <Navbar title='Jobs'/>
      <Job />
      <Footer/>

      

    </div>
  )
}

export default Home