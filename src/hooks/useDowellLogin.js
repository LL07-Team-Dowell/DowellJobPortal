import { useEffect } from "react";
import { authAxiosInstance } from "../lib/axios";
import { routes } from "../lib/request";
import { useSearchParams } from "react-router-dom";

export default function useDowellLogin ( updateState , updatePageWhenDone ) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        
        const session_id = searchParams.get("session_id");

        const savedUser = localStorage.getItem("user");

        if ((!session_id) && (!savedUser)) return updatePageWhenDone(false);
        
        if ((savedUser) && (!session_id)) {
            updateState(JSON.parse(savedUser));
            return updatePageWhenDone(false);
        }

        authAxiosInstance.post(routes.User_Profile, { key: session_id }).then(res => {

            updateState(res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
            updatePageWhenDone(false);

        }).catch(err => {

            localStorage.clear("user")
            updatePageWhenDone(false);
            return Promise.reject(err);

        })

    }, [])

}
