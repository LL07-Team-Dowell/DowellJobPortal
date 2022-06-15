import FilterIcon from "../FilterIcon/FilterIcon";
import "./style.css";


const SelectedCandidates = ({ showTasks, candidatesCount, tasksCount }) => {
    return <>
        <section className="selected-candidates-container">
            <div className="selected-candidates-count-container">
                <h2>{ showTasks ? "Task" : "Selected Candidates" }</h2>
                <p>{ showTasks ? `Task given to ${tasksCount ? tasksCount : '0'} candidates`: `${candidatesCount ? candidatesCount : '0'} candidates are selected for the roles` }</p>    
            </div>
            <div className="sort-candidates-container">
                <FilterIcon />
                <p>Sort</p>
            </div>
        </section>
    </>
}

export default SelectedCandidates;
