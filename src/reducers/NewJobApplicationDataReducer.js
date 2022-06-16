export const newJobApplicationDataReducerActions = {
    UPDATE_COUNTRY: "update_country",
    UPDATE_FREELANCE_PLATFORM: "update_freelance_platform",
    UPDATE_FREELANCE_PLATFORM_URL: "update_freelance_platform_url",
    UPDATE_JOB_DESCRIPTION: "update_job_description",
    UPDATE_AGREE_TO_ALL: "update_agree_to_all",
    UPDATE_QUALIFICATIONS: "update_qualifications",
    UPDATE_DISCORD_ID: "update_discord_id",
    UPDATE_COMMENTS: "update_comments",
    UPDATE_GITHUB_ID: "update_github_id",
    UPDATE_CANVA_ID: "update_canva_id",
}

export const newJobApplicationDataReducer = (currentState, action) => {
    switch (action.type) {

        case newJobApplicationDataReducerActions.UPDATE_JOB_DESCRIPTION:
        case newJobApplicationDataReducerActions.UPDATE_AGREE_TO_ALL:
        case newJobApplicationDataReducerActions.UPDATE_QUALIFICATIONS:
        case newJobApplicationDataReducerActions.UPDATE_DISCORD_ID:
        case newJobApplicationDataReducerActions.UPDATE_GITHUB_ID:
        case newJobApplicationDataReducerActions.UPDATE_CANVA_ID:
        case newJobApplicationDataReducerActions.UPDATE_COMMENTS:

            if (!action.payload.stateToChange) return currentState;

            return { 
                ...currentState, others : {
                    ...currentState.others,
                    [ action.payload.stateToChange ]: action.payload.value
                }
            }

        case newJobApplicationDataReducerActions.UPDATE_COUNTRY:
        case newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM:
        case newJobApplicationDataReducerActions.UPDATE_FREELANCE_PLATFORM_URL:

            if (!action.payload.stateToChange) return currentState;

            return { ...currentState, [ action.payload.stateToChange ]: action.payload.value }
    
        default:
            return currentState;
    }
}
