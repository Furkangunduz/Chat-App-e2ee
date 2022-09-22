import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(false)

    const { user } = useContext(UserContext);

    console.log(user)
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