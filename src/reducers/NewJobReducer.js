export const initialNewJobState = {
    feedback: "",
    freelancePlatform : "",
    freelancePlatformUrl: "",
    country: "",
    feedback: "Waiting for verifcation of documents",
    hr_remarks: "Currently receiving applications",
    status: "Pending",
    others: {},
    applicant: "",
    job: "",
    jobTitle: "",
    applicantEmail: "",
    jobDescription: "",
}

export const initialNewJobStateNames = {
    feedback: "feedback",
    freelancePlatform : "freelancePlatform",
    freelancePlatformUrl: "freelancePlatformUrl",
    country: "country",
    feedback: "feedback",
    hr_remarks: "hr_remarks",
    status: "status",
    others: "others",
    applicantEmail: "applicantEmail",
    jobTitle: "jobTitle",
    jobDescription: "jobDescription",
}

export const newJobStateReducerActions = {
    UPDATE_FREELANCE_PLATFORM: "update_freelance_platform",
    UPDATE_FREELANCER_URL: "update_freelance_platform_url",
    UPDATE_COUNTRY: "update_country",
    UPDATE_OTHERS: "update_others",
    UPDATE_APPLICANT: "update_applicant_email",
    UPDATE_JOB_TITLE: "update_job",
    UPDATE_JOB_DESCRIPTION: "update_job_description",
}

export const initialNewJobDataReducer = (currentNewJobState, action) => {
    
    switch (action.type) {
        case newJobStateReducerActions.UPDATE_APPLICANT:
        case newJobStateReducerActions.UPDATE_COUNTRY:
        case newJobStateReducerActions.UPDATE_FREELANCER_URL:
        case newJobStateReducerActions.UPDATE_FREELANCE_PLATFORM:
        case newJobStateReducerActions.UPDATE_JOB_TITLE:
        case newJobStateReducerActions.UPDATE_JOB_DESCRIPTION:

            return { ...currentNewJobState, [ action.payload.stateToChange ]: action.payload.value }

        case newJobStateReducerActions.UPDATE_OTHERS:

            return { 
                ...currentNewJobState, 
                [ action.payload.stateToChange ]: [...action.payload.stateToChange, action.payload.value]
            }
    
        default:
            return currentNewJobState
    }
}
