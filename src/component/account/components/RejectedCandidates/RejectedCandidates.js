import FilterIcon from "../../../teamlead/components/FilterIcon/FilterIcon";
import "./style.css";


const RejectedCandidates = () => {
    return <>
        <section className="rejected-candidates-container">
            <div className="rejected-candidates-count-container">
                <h2>{"Rejected Candidates"}</h2>
                <p>List of rejected candidates (8)</p>    
            </div>
            <div className="sort-candidates-container">
                <FilterIcon />
                <p>Sort</p>
            </div>
        </section>
    </>
}

export default RejectedCandidates;
