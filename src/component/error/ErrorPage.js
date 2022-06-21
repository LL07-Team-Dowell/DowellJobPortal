import Navbar from "../candidate/Navbar";
import { Link } from "react-router-dom";

import "./style.css";


const ErrorPage = () => {
    return <>
        <Navbar />
            
        <div className="error__Page__Container">
            <img src={process.env.PUBLIC_URL + "/404-page-not-found.svg"} alt="404 page not found" />
        </div>

        <Link to={'home'}>
            Go Home
        </Link>

    </>
}

export default ErrorPage;
