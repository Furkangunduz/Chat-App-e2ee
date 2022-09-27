import { useEffect, useState, useContext } from "react";
import Usercontext from "../context/UserContext"
import io from 'socket.io-client';


export default function useSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useContext(Usercontext)

    useEffect(() => {
        const socket = io('http://localhost:3002')
        socket.emit("save-user", { name: user.name, public_key: user.public_key })

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [])

    return [isConnected]
}
