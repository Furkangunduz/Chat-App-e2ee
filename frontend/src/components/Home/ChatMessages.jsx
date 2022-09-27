import ChatMessagesItem from './ChatMessagesItem';

function ChatMessages() {
	return (
		<div className='max-h-[70%] w-[90%] ml-10 pt-5 overflow-y-auto overflow-x-hidden backdrop-blur-xl'>
			{[
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'me' },
				{
					text: 'Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world',
					sender: 'friend',
				},
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'me' },
				{ text: 'Hello world', sender: 'me' },
				{
					text: 'Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world ',
					sender: 'me',
				},
				{
					text: 'Hello world Hello world Hello world Hello world Hello world Hello world Hello world ',
					sender: 'friend',
				},
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'me' },
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'me' },
				{ text: 'Hello world', sender: 'me' },
				{ text: 'Hello world', sender: 'me' },
				{ text: 'Hello world', sender: 'friend' },
				{ text: 'Hello world', sender: 'friend' },
			].map((message, indx) => (
				<ChatMessagesItem key={indx} message={message} />
			))}
		</div>
	);
}

export default ChatMessages;
