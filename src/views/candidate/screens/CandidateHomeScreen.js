import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Job from '../Job';


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