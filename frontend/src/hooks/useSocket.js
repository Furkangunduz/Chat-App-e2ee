import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from 'socket.io-client';

import Usercontext from "../context/UserContext"
import ChatContext from "../context/ChatContext";
import RSA, { decode } from "../utils/keygenerator";

export default function useSocket() {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false);
    const [chatRequestedUserName, setChatRequestedUserName] = useState("")
    const [askUserChatRequest, setAskUserChatRequest] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(Usercontext)
    const { setActiveChatUserName, setChatHistory,
        setActiveChatPublicKey } = useContext(ChatContext)

    useEffect(() => {
        if (!socket) {
            setSocket(io(process.env.REACT_APP_SOCKET_URL))
        }
    }, []);

    useEffect(() => {
        if (!socket) return
        socket.on('waiting-response', () => {
            toast("User is active waiting for the response.")
        });
        socket.on("user-not-online", () => {
            toast("User not online.")
        })
        socket.on("start-chat-request", (user) => {
            console.log("getting request for chat")
            setAskUserChatRequest(true)
            setChatRequestedUserName(user[0])
            setActiveChatUserName(user[0])
            setActiveChatPublicKey(user[1])
        })
        socket.on("chat-request-accepted", (friend) => {
            setActiveChatUserName(friend[0])

            navigate("/")
            toast("Chat request accepted.", { toastId: "Chat request accepted." })
        })
        socket.on("chat-request-declined", () => {
            console.log("declined")
            setActiveChatUserName(null)
            setActiveChatPublicKey("")
            toast("Chat request declined.", { toastId: "Chat request declined." })
        })
        socket.on("newMessage", (message) => {
            console.log("new message received")
            let decodedMessage = RSA.decode(RSA.decrypt(message, user.private_key, user.public_key))
            setChatHistory((prev) => ([...prev, { sender: "friend", text: decodedMessage }]))
        })
        socket.on('connect', () => {
            setIsConnected(true);
            if (user)
                socket.emit("save-user", { name: user.name, public_key: user.public_key })
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off("user-not-online")
            socket.off('waiting-response');
            socket.off("start-chat-request")
            socket.off("chat-request-accepted")
            socket.off("chat-request-declined")
        }
    }, [socket])

    function showWindowConfirm() {
        if (window.confirm("Getting request for chat from " + chatRequestedUserName + ".Wanna accept ?")) {
            socket.emit("chat-request-accepted")
        } else {
            socket.emit("chat-request-declined")

        }
    }
    if (askUserChatRequest) {
        showWindowConfirm()
        setChatRequestedUserName(null)
        setAskUserChatRequest(false)
    }

    return [socket, isConnected]
}
