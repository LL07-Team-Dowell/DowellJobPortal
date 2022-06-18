export const appliedJobsReducerActions = {
    UPDATE_APPLIED_JOBS: "update_applied_jobs",
}

export const appliedJobsReducer = (currentState, action) => {
    switch (action.type) {
        case appliedJobsReducerActions.UPDATE_APPLIED_JOBS:
            
            if ( action.payload.updateExisting ) return {
                ...currentState,
                [ action.payload.stateToChange ]: [
                    ...currentState[`${action.payload.stateToChange}`], 
                    action.payload.value
                ]
            }

            if ( action.payload.removeFromExisting ) return {
                ...currentState,
                [ action.payload.stateToChange ]: [...currentState[`${action.payload.stateToChange}`].filter(appliedJob => appliedJob.id !== action.payload.value.id)]
            }

            break;
    
        default:
            break;
    }
}
