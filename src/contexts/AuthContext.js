import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null)

    useEffect(() => {

        setAccessToken(localStorage.getItem("access_token"));
        setRefreshToken(localStorage.getItem("refresh_token"));
    
    }, [])

    
    const authContext = {
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        refreshToken: refreshToken,
        setRefreshToken: setRefreshToken,
    }

    return (
        <AuthContext.Provider value={{ authContext }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
