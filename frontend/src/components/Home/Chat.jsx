import React from 'react';
import MessageInput from './MessageInput';
import FriendInfo from './FriendInfo';
import ChatMessages from './ChatMessages';

function Chat() {
	return (
		<div className='relative min-w-[550px] h-[570px] bg-white my-10  rounded-lg drop-shadow-lg '>
			<FriendInfo />
			<ChatMessages />
			<MessageInput />
		</div>
	);
}

export default Chat;
