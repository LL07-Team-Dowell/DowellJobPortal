import { createContext, useContext, useReducer } from "react";
import { appliedJobsReducer } from "../reducers/AppliedJobsReducer";

const AppliedJobsContext = createContext({});

export const useAppliedJobsContext = () => useContext(AppliedJobsContext);

export const initialAppliedJobs = {
    appliedJobs: [],
    jobsToInterviewFor: [],
}

export const initialAppliedJobsStateNames = {
    appliedJobs: "appliedJobs",
    jobsToInterviewFor: "jobsToInterviewFor",
}

export const AppliedJobsContextProvider = ({ children }) => {

    const [appliedJobsState, dispatchToAppliedJobsState] = useReducer(appliedJobsReducer, initialAppliedJobs);

    return (
        <AppliedJobsContext.Provider value={{ appliedJobsState, dispatchToAppliedJobsState }}>
            { children }
        </AppliedJobsContext.Provider>
    )

}
