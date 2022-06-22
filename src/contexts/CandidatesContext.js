import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance, { myAxiosInstance } from "../axios";
import { candidateDataReducer, candidateDataReducerActions } from "../reducers/CandidateDataReducer";

export const initialCandidatesData = {
    candidatesToHire: [],
    onboardingCandidates: [],
    candidatesToRehire: [],
    selectedCandidates: [],
    rejectedCandidates: [],
}

export const initialCandidatesDataStateNames = {
    candidatesToHire: "candidatesToHire",
    onboardingCandidates: "onboardingCandidates",
    candidatesToRehire: "candidatesToRehire",
    selectedCandidates: "selectedCandidates",
    rejectedCandidates: "rejectedCandidates",
}

const CandidateContext = createContext({});

export const useCandidateContext = () => {
    return useContext(CandidateContext);
}

export const CandidateContextProvider = ({ children }) => {

    const [ candidatesData, dispatchToCandidatesData ] = useReducer(candidateDataReducer, initialCandidatesData);

    useEffect(() => {

        async function getData () {
            const response = await myAxiosInstance.get("/tasks/view_tasks/")
            console.log(response.data)
        }
        
        getData()
        // async function loginUser () {
        //     const request = await myAxiosInstance.post("/accounts/login_user/", {
        //         email: "abc@gmail.com",
        //         password: "abc"
        //     })
    
        //     localStorage.setItem('access_token', request.data.jwt)
        // }

        // loginUser()

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_CANDIDATES_TO_HIRE, payload: {
            stateToChange: initialCandidatesDataStateNames.candidatesToHire,
            value: [
                {
                    id: "1",
                    name: "Faizan",
                    jobApplied: "Python",
                    dateOfApplication: "10th April",
                    time_period: "0-1 Yr",
                },
                {
                    id: "2",
                    name: "Ramu",
                    jobApplied: "React",
                    dateOfApplication: "9th April",
                    time_period: "0-1 Yr",
                }
            ]
        }})

        // dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_INTERVIEWING_CANDIDATES, payload: {
        //     stateToChange: initialCandidatesDataStateNames.candidatesToInterview,
        //     value: [
        //         {
        //             id: "3",
        //             name: "John",
        //             jobApplied: "Python",
        //             dateOfApplication: "10th April",
        //         },
        //         {
        //             id: "4",
        //             name: "Titan",
        //             jobApplied: "React",
        //             dateOfApplication: "9th April",
        //         }
        //     ]
        // }})

        dispatchToCandidatesData({ type: candidateDataReducerActions.UPDATE_REHIRED_CANDIDATES, payload: {
            stateToChange: initialCandidatesDataStateNames.candidatesToRehire,
            value: [
                {
                    id: "5",
                    name: "Fowler",
                    jobApplied: "Python",
                    dateOfApplication: "10th April",
                },
                {
                    id: "6",
                    name: "Ryan",
                    jobApplied: "React",
                    dateOfApplication: "9th April",
                }
            ]
        }})

    }, [])

    return (
        <CandidateContext.Provider value={{ candidatesData, dispatchToCandidatesData }}>
            {children}
        </CandidateContext.Provider>
    )
}

