import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const { user } = useContext(UserContext);

    useEffect(() => {
        setCheckingStatus(true)
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])

    return { loggedIn, checkingStatus }

}