import { createContext, useContext, useReducer } from "react";
import { newJobTermsReducer } from "../reducers/NewJobTermsReducer";

const NewJobTermsContext = createContext({});

export const useNewJobTermsContext = () => useContext(NewJobTermsContext);

export const initialNewJobStateData = {
    generalTerms: [],
    workflowTerms: [],
    paymentTerms: [],
    technicalTerms: [],
    otherTerms: [],
}

export const newJobStateDataNames = {
    generalTerms: "generalTerms",
    workflowTerms: "workflowTerms",
    paymentTerms: "paymentTerms",
    technicalTerms: "technicalTerms",
    otherTerms: "otherTerms",
}

export const NewJobTermsContextProvider = ({ children }) => {
    
    const [ newJobTerms, dispatchToNewJobTerms ] = useReducer(newJobTermsReducer, initialNewJobStateData);

    return (
        <NewJobTermsContext.Provider value={{ newJobTerms, dispatchToNewJobTerms }} >
            { children }
        </NewJobTermsContext.Provider>
    )
}