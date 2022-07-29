import Job from '../../components/Job/Job';


function Home({ user, setHired }) {
  
  return (
    <div>
      <Job currentUser={user} setHired={setHired} />
    </div>
  )
}

export default Home