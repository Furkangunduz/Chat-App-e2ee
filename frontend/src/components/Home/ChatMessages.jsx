import ChatMessagesItem from './ChatMessagesItem';
import { useContext, useRef, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function ChatMessages() {
	const { chatHistory } = useContext(ChatContext);
	const messagesRef = useRef(null);

	useEffect(() => {
		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
	}, [chatHistory]);

	return (
		<div
			ref={messagesRef}
			className='max-h-[70%] w-[90%] ml-10 pt-5 overflow-y-auto overflow-x-hidden backdrop-blur-xl'>
			{chatHistory.map((message, indx) => (
				<ChatMessagesItem key={indx} message={message} />
			))}
		</div>
	);
}

export default ChatMessages;
