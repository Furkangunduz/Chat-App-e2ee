import React from 'react';

function ChatItem({ message }) {
	let { text, sender } = message;
	return (
		<div
			className={`flex flex-shrink-0  my-1 overflow-hidden w-full ${
				sender == 'me' ? 'justify-end' : 'justify-start'
			}`}
			style={{ wordWrap: 'break-word' }}>
			<p
				className={`max-w-[50%]  px-3 py-2 text-ellipsis whitespace-normal ${
					sender == 'me'
						? ' bg-dark-blue text-white'
						: ' bg-friend-text-bg text-black pr-3'
				}`}>
				{text}
			</p>
		</div>
	);
}

export default ChatItem;
