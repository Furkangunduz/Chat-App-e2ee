import { createContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [activeChat, setActiveChat] = useState('123123');

	return (
		<ChatContext.Provider value={{ activeChat, setActiveChat }}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
