import { FiHome, FiUser } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import {CgFileDocument} from "react-icons/cg";


export const hrNavigationLinks = [
    {
        address: "home",
        icon: <FiHome />,
    },
    {
        address: "applied",
        icon: <RiSendPlaneLine />
    },
    {
        address: "after initial meet",
        icon: <CgFileDocument />
    },
    {
        address: "user",
        icon: <FiUser />
    }
]