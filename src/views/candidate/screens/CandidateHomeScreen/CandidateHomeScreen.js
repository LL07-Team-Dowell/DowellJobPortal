import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Job from '../../components/Job/Job';


function Home({ user }) {
  return (
    <div>

      <Navbar title='Jobs' disableSideBar={user ? false : true} />
      <Job currentUser={user} />
      {user && <Footer/>}

    </div>
  )
}

export default Home