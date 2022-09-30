import { createContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [activeChatUserName, setActiveChatUserName] = useState(null);
	const [activeChatPublicKey, setActiveChatPublicKey] = useState('');
	const [chatHistory, setChatHistory] = useState([]);

	return (
		<ChatContext.Provider
			value={{
				activeChatUserName,
				setActiveChatUserName,
				chatHistory,
				setChatHistory,
				activeChatPublicKey,
				setActiveChatPublicKey,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
