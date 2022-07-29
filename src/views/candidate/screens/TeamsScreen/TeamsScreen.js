import BottomNavigationBar from "../../../Hr/component/BottomNavigation/BottomNavigation"
import { PageUnderConstruction } from "../../../under_construction/ConstructionPage"
import Navbar from "../../components/Navbar/Navbar"
import { afterSelectionLinks } from "../../utils/afterSelectionLinks"

const TeamsScreen = () => {
    return <>
        
        <Navbar title={"Teams"} />
        <PageUnderConstruction />
        <BottomNavigationBar links={afterSelectionLinks} />

    </>
}

export default TeamsScreen;
