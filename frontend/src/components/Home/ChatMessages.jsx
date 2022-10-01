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
			className='flex flex-col gap-1 max-h-[70%] w-[100%] overflow-y-auto overflow-x-hidden backdrop-blur-xl px-10'>
			{chatHistory.length !== 0 ? (
				chatHistory.map((message, indx) => (
					<ChatMessagesItem key={indx} message={message} />
				))
			) : (
				<p className='text-bg font-semibold text-2xl'>
					You can start chat with the 'Start chat' button.
				</p>
			)}
		</div>
	);
}

export default ChatMessages;
