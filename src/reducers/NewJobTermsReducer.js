import { newJobStateDataNames } from "../contexts/NewJobTermsContext";
import { jobKeys } from "../views/admin/utils/jobKeys";

export const newJobTermsReducerActions = {
    UPDATE_KEY: "update_key",
    UPDATE_VALUE: "update_value",
    ADD_NEW_TERM: "add_new_term",
    REMOVE_TERM: "remove_added_term",
    RESET_STATE: "reset_state",
    UPDATE_STATE: "update_current_state",
}

export const newJobTermsReducer = (currentState, action) => {

    if (action.type === newJobTermsReducerActions.UPDATE_STATE) return action.payload.newState;

    if (action.type === newJobTermsReducerActions.ADD_NEW_TERM) {
        if (!action.payload.stateToChange) return currentState;
        
        return { ...currentState, [action.payload.stateToChange]: [...currentState[action.payload.stateToChange], {} ] }
    }

    if (action.type === newJobTermsReducerActions.REMOVE_TERM) {
        if (!action.payload.stateToChange) return currentState;
        if (!action.payload.currentKeyIndex) return currentState;

        const newTerms = currentState[newJobStateDataNames[action.payload.stateToChange]];

        newTerms.splice(action.payload.currentKeyIndex, 1);

        return { ...currentState, [action.payload.stateToChange]: newTerms };
    }

    if (action.type === newJobTermsReducerActions.RESET_STATE) {
        return {
            generalTerms: [{}],
            workflowTerms: [{}],
            paymentTerms: [{}],
            technicalTerms: [{}],
            otherTerms: [{}],
        }
    };

    if (action.type === newJobTermsReducerActions.UPDATE_KEY) {
        let keyToUpdate = action.payload.value;
        let arrayIndexToUpdate = action.payload.currentKeyIndex;

        if (!arrayIndexToUpdate) return currentState;

        switch (action.payload.stateToChange) {
            case jobKeys.generalTerms:
                const currentGeneralTerms = currentState[newJobStateDataNames.generalTerms].slice();
                
                if (Object.entries(currentGeneralTerms[arrayIndexToUpdate]).length === 0) {
                    let newKeyValue = {}
                    newKeyValue[keyToUpdate] = "";
                    currentGeneralTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.generalTerms]: currentGeneralTerms };
                }

                let updatedGenKeyValue = {};
                let currentGenKey = Object.keys(currentGeneralTerms[arrayIndexToUpdate])[0];
                let currentValueForGenKey = currentGeneralTerms[arrayIndexToUpdate][currentGenKey];

                updatedGenKeyValue[keyToUpdate] = currentValueForGenKey;
                currentGeneralTerms[arrayIndexToUpdate] = updatedGenKeyValue;
                delete currentGeneralTerms[arrayIndexToUpdate][currentGenKey];
                return { ...currentState, [newJobStateDataNames.generalTerms]: currentGeneralTerms};
        
            case jobKeys.technicalSpecifications:
                const currentTechnicalTerms = currentState[newJobStateDataNames.technicalTerms].slice();
                
                if (Object.entries(currentTechnicalTerms[arrayIndexToUpdate]).length === 0) {
                    let newKeyValue = {}
                    newKeyValue[keyToUpdate] = "";
                    currentTechnicalTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.technicalTerms]: currentTechnicalTerms };
                }

                let updatedTechnKeyValue = {};
                let currentTechnKey = Object.keys(currentTechnicalTerms[arrayIndexToUpdate])[0];
                let currentValueForTechnKey = currentTechnicalTerms[arrayIndexToUpdate][currentTechnKey];

                updatedTechnKeyValue[keyToUpdate] = currentValueForTechnKey;
                currentTechnicalTerms[arrayIndexToUpdate] = updatedTechnKeyValue;
                delete currentTechnicalTerms[arrayIndexToUpdate][currentTechnKey];
                return { ...currentState, [newJobStateDataNames.technicalTerms]: currentTechnicalTerms};
        
            case jobKeys.paymentTerms:
                const currentPaymentTerms = currentState[newJobStateDataNames.paymentTerms].slice();
                
                if (Object.entries(currentPaymentTerms[arrayIndexToUpdate]).length === 0) {
                    let newKeyValue = {};
                    newKeyValue[keyToUpdate] = "";
                    currentPaymentTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.paymentTerms]: currentPaymentTerms };
                }

                let updatedPayKeyValue = {};
                let currentPayKey = Object.keys(currentPaymentTerms[arrayIndexToUpdate])[0];
                let currentValueForPayKey = currentPaymentTerms[arrayIndexToUpdate][currentPayKey];

                updatedPayKeyValue[keyToUpdate] = currentValueForPayKey;
                currentPaymentTerms[arrayIndexToUpdate] = updatedPayKeyValue;
                delete currentPaymentTerms[arrayIndexToUpdate][currentPayKey];
                return { ...currentState, [newJobStateDataNames.paymentTerms]: currentPaymentTerms};
        
            case jobKeys.workflowOfJob:
                const currentWorkflowTerms = currentState[newJobStateDataNames.workflowTerms].slice();
                
                if (Object.entries(currentWorkflowTerms[arrayIndexToUpdate]).length === 0) {
                    let newKeyValue = {};
                    newKeyValue[keyToUpdate] = "";
                    currentWorkflowTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.workflowTerms]: currentWorkflowTerms };
                }

                let updatedWorkKeyValue = {};
                let currentWorkKey = Object.keys(currentWorkflowTerms[arrayIndexToUpdate])[0];
                let currentValueForWorkKey = currentWorkflowTerms[arrayIndexToUpdate][currentWorkKey];

                updatedWorkKeyValue[keyToUpdate] = currentValueForWorkKey;
                currentWorkflowTerms[arrayIndexToUpdate] = updatedWorkKeyValue;
                delete currentWorkflowTerms[arrayIndexToUpdate][currentWorkKey];
                return { ...currentState, [newJobStateDataNames.workflowTerms]: currentWorkflowTerms};
    
            case jobKeys.others:
                const currentOtherTerms = currentState[newJobStateDataNames.otherTerms].slice();
                
                if (Object.entries(currentOtherTerms[arrayIndexToUpdate]).length === 0) {
                    let newKeyValue = {};
                    newKeyValue[keyToUpdate] = "";
                    currentOtherTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.otherTerms]: currentOtherTerms };
                }

                let updatedOtherKeyValue = {};
                let currentOtherKey = Object.keys(currentOtherTerms[arrayIndexToUpdate])[0];
                let currentValueForOtherKey = currentOtherTerms[arrayIndexToUpdate][currentOtherKey];

                updatedOtherKeyValue[keyToUpdate] = currentValueForOtherKey;
                currentOtherTerms[arrayIndexToUpdate] = updatedOtherKeyValue;
                delete currentOtherTerms[arrayIndexToUpdate][currentOtherKey];
                return { ...currentState, [newJobStateDataNames.otherTerms]: currentOtherTerms};
                        
            default:
                return currentState;
        }
    }

    if (action.type === newJobTermsReducerActions.UPDATE_VALUE) {
        let newValueInput = action.payload.value;
        let arrayIndexToUpdate = action.payload.currentKeyIndex;

        if (!arrayIndexToUpdate) return currentState;

        switch (action.payload.stateToChange) {
            case jobKeys.generalTerms:
                let updatedGeneralTerms = currentState[newJobStateDataNames.generalTerms].slice();
                let currentGenKey = Object.keys(updatedGeneralTerms[arrayIndexToUpdate])[0];

                if (currentGenKey === undefined) {
                    let newKeyValue = {};
                    newKeyValue[""] = newValueInput;
                    updatedGeneralTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.generalTerms]: updatedGeneralTerms };   
                }

                let updatedGenKeyValue = {};
                updatedGenKeyValue[currentGenKey] = newValueInput;
                updatedGeneralTerms[arrayIndexToUpdate] = updatedGenKeyValue;
                return { ...currentState, [newJobStateDataNames.generalTerms]: updatedGeneralTerms};

            case jobKeys.technicalSpecifications:
                let updatedTechnicalTerms = currentState[newJobStateDataNames.technicalTerms].slice();
                let currentTechnKey = Object.keys(updatedTechnicalTerms[arrayIndexToUpdate])[0];

                if (currentTechnKey === undefined) {
                    let newKeyValue = {};
                    newKeyValue[""] = newValueInput;
                    updatedTechnicalTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.technicalTerms]: updatedTechnicalTerms };   
                }

                let updatedTechnKeyValue = {};
                updatedTechnKeyValue[currentTechnKey] = newValueInput;
                updatedTechnicalTerms[arrayIndexToUpdate] = updatedTechnKeyValue;
                return { ...currentState, [newJobStateDataNames.technicalTerms]: updatedTechnicalTerms};

            case jobKeys.paymentTerms:
                let updatedPaymentTerms = currentState[newJobStateDataNames.paymentTerms].slice();
                let currentPayKey = Object.keys(updatedPaymentTerms[arrayIndexToUpdate])[0];

                if (currentPayKey === undefined) {
                    let newKeyValue = {};
                    newKeyValue[""] = newValueInput;
                    updatedPaymentTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.paymentTerms]: updatedPaymentTerms };   
                }

                let updatedPayKeyValue = {};
                updatedPayKeyValue[currentPayKey] = newValueInput;
                updatedPaymentTerms[arrayIndexToUpdate] = updatedPayKeyValue;
                return { ...currentState, [newJobStateDataNames.paymentTerms]: updatedPaymentTerms};

            case jobKeys.workflowOfJob:
                let updatedWorkflowTerms = currentState[newJobStateDataNames.workflowTerms].slice();
                let currentWorkKey = Object.keys(updatedWorkflowTerms[arrayIndexToUpdate])[0];

                if (currentWorkKey === undefined) {
                    let newKeyValue = {};
                    newKeyValue[""] = newValueInput;
                    updatedWorkflowTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.workflowTerms]: updatedWorkflowTerms };   
                }

                let updatedWorkKeyValue = {};
                updatedWorkKeyValue[currentWorkKey] = newValueInput;
                updatedWorkflowTerms[arrayIndexToUpdate] = updatedWorkKeyValue;
                return { ...currentState, [newJobStateDataNames.workflowTerms]: updatedWorkflowTerms};

            case jobKeys.others:
                let updatedOtherTerms = currentState[newJobStateDataNames.otherTerms].slice();
                let currentOtherKey = Object.keys(updatedOtherTerms[arrayIndexToUpdate])[0];

                if (currentOtherKey === undefined) {
                    let newKeyValue = {};
                    newKeyValue[""] = newValueInput;
                    updatedOtherTerms[arrayIndexToUpdate] = newKeyValue;
                    return { ...currentState, [newJobStateDataNames.otherTerms]: updatedOtherTerms };   
                }

                let updatedOtherKeyValue = {};
                updatedOtherKeyValue[currentOtherKey] = newValueInput;
                updatedOtherTerms[arrayIndexToUpdate] = updatedOtherKeyValue;
                return { ...currentState, [newJobStateDataNames.otherTerms]: updatedOtherTerms};

            default:
                return currentState;
        }
    }

    return currentState;

}