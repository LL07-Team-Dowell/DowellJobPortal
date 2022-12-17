import { useNavigate } from "react-router-dom"
import JobLandingLayout from "../../../../layouts/CandidateJobLandingLayout/LandingLayout";
import { PageUnderConstruction } from "../../../under_construction/ConstructionPage"

const TeamsScreen = ({ currentUser }) => {
    const navigate = useNavigate();
    return <>
        <JobLandingLayout user={currentUser} afterSelection={true}>
            <PageUnderConstruction />
        </JobLandingLayout>
    </>
}

export default TeamsScreen;
