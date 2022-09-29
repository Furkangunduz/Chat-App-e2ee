import { createContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [activeChatUserName, setActiveChatUserName] = useState(null);

	return (
		<ChatContext.Provider value={{ activeChatUserName, setActiveChatUserName }}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
