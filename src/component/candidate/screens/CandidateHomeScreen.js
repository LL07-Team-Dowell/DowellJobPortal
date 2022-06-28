import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Job from '../Job';



function Home({ user }) {
  return (
    <div>
      <Navbar title='Jobs'/>
      <Job currentUser={user} />
      <Footer/>

      

    </div>
  )
}

export default Home