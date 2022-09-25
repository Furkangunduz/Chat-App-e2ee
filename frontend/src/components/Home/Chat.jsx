import React from 'react';
import MessageInput from './MessageInput';
import FriendInfo from './FriendInfo';

function Chat() {
	return (
		<div className='relative min-w-[550px] max-h-[600px] bg-white w-[50%] mx-10 ml-40 my-10 pr-5 rounded-lg drop-shadow-lg overflow-hidden'>
			<FriendInfo userName={'kral Dragon'} />

			<MessageInput />
		</div>
	);
}

export default Chat;
