import { createContext, useContext, useState } from "react";

const NewCandidateContext = createContext();

export const useNewCandidateContext = () => {
    return useContext(NewCandidateContext);
}

export const NewCandidateContextProvider = ( { children }) => {
    const [candidateData, setCandidateData] = useState([]);

    return (
        <NewCandidateContext.Provider value={{ candidateData, setCandidateData }}>
            {children}
        </NewCandidateContext.Provider>
    )
}
