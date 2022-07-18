import { useEffect } from "react";
import { authAxiosInstance } from "../lib/axios";
import { routes } from "../lib/request";

export default function useLocalStorage ( updateState , updatePageWhenDone ) {
    
    useEffect(() => {

        const savedUser = localStorage.getItem("user");
    
        if (!savedUser) return updatePageWhenDone(false);

        authAxiosInstance.get(routes.User).then(res => {

            updatePageWhenDone(false);
            updateState(JSON.parse(savedUser));

        }).catch(err => {

            if (err.response.status === 401) {
                localStorage.clear("user");
            }
            updatePageWhenDone(false);
            return Promise.reject(err);

        })

    }, [])

}
