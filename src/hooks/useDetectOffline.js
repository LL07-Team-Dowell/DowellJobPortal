import { useEffect } from "react";
import { toast } from "react-toastify";

export function useDetectOffline () {
    useEffect(() => {

        if (navigator.onLine) return;

        toast.info("You are currently offline");
        
    }, [])
}