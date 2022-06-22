import { createContext, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const NavigationContext = createContext({

});

export const useNavigationContext = () => {
    return useContext(NavigationContext);
}

export const NavigationContextProvider = ({ children }) => {

    const { section, sub_section, path } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ isNotificationEnabled, setNotificationStatus ] = useState(false);
    
    return (
        <NavigationContext.Provider value={{ section, sub_section, path, searchParams, isNotificationEnabled, setNotificationStatus }} >
            { children }
        </NavigationContext.Provider>
    )
}
