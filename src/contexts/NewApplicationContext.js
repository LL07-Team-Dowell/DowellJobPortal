import { createContext, useContext, useReducer } from "react";
import { newJobApplicationDataReducer } from "../reducers/NewJobApplicationDataReducer";

const NewApplicationContext = createContext({});

export const newApplicationState = {
    country: "",
    freelancePlatform: "",
    freelancePlatformUrl: "",
    feedBack: "Waiting for verification of documents",
    hr_remarks: "Currently receiving applications",
    status: "Pending",
    others: {
        jobDescription: "",
        agreeToAllTerms: false,
        academic_qualification_type: "",
        academic_qualification: "",
        comments: "",
        date_applied: "",
        team_lead_remarks: ""
    },
    applicant: "",
    job: "",
}

export const excludedApplicantInfo = [
    "feedBack",
    "hr_remarks",
    "status",
    "job",
    "id",
    "team_lead_remarks",
    "date_applied",
    "jobDescription",
    "agreeToAllTerms",
    "created",
    "updated",
]

export const mutableNewApplicationStateNames = {
    job: "job",
    applicant: "applicant",
    country: "country",
    freelancePlatform: "freelancePlatform",
    freelancePlatformUrl: "freelancePlatformUrl",
    others_property_jobDescription: "jobDescription",
    others_property_agreeToAll: "agreeToAllTerms",
    others_property_qualification_type: "academic_qualification_type",
    others_property_qualification: "academic_qualification",
    others_comments: "comments",
    others_date_applied: "date_applied",
    others_team_lead_remarks: "team_lead_remarks",
    hr_remarks: "hr_remarks",
}

export const useNewApplicationContext = () => useContext(NewApplicationContext);

export const NewApplicationContextProvider = ({ children }) => {

    const [newApplicationData, dispatchToNewApplicationData] = useReducer(newJobApplicationDataReducer, newApplicationState);
    
    const newApplicationContextData = {
        newApplicationData: newApplicationData,
        dispatchToNewApplicationData: dispatchToNewApplicationData,
    }

    return (
        <NewApplicationContext.Provider value={newApplicationContextData} >
            { children }
        </NewApplicationContext.Provider>
    )
}