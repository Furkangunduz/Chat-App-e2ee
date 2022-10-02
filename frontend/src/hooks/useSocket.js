import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from 'socket.io-client';

import Usercontext from "../context/UserContext"
import ChatContext from "../context/ChatContext";
import RSA from "../utils/keygenerator";

export default function useSocket() {
    const [socket, setSocket] = useState(null)
    const [askUserChatRequest, setAskUserChatRequest] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(Usercontext)
    const { setActiveChatUserName, activeChatUserName, setChatHistory,
        setActiveChatPublicKey } = useContext(ChatContext)

    function showWindowConfirm() {

        if (window.confirm("Getting request for chat from " + activeChatUserName + ".Wanna accept ?")) {
            socket.emit("chat-request-accepted")
            return
        }
        setActiveChatUserName(null)
        socket.emit("chat-request-declined")

    }

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
            setActiveChatUserName(user[0])
            setActiveChatPublicKey(user[1])
            setAskUserChatRequest(true)
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
        socket.on("new-message", (messages) => {
            console.log("message received")
            if (!messages) return
            let decryptedMessage = ""
            messages.forEach(
                (msg) => {
                    decryptedMessage += RSA.decrypt(msg, user.private_key, user.public_key)
                }
            )
            setChatHistory((prev) => ([...prev, { sender: "friend", text: decryptedMessage }]))
        })
        socket.on("friend-disconnected", () => {
            toast("friend disconnected")
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        socket.on("user-left", () => {
            toast("friend disconnected")
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        socket.on('connect', () => {
            if (user)
                socket.emit("save-user", { name: user.name, public_key: user.public_key })
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off("user-not-online")
            socket.off('waiting-response');
            socket.off("start-chat-request")
            socket.off("chat-request-accepted")
            socket.off("chat-request-declined")
            socket.off("new-message")
            socket.off("friend-disconnected")
        }
    }, [socket])


    if (askUserChatRequest) {
        showWindowConfirm()
        setAskUserChatRequest(false)
    }

    return socket
}
