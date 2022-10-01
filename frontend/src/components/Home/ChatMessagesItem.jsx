import React from 'react';

function ChatItem({ message }) {
	let { text, sender } = message;
	return (
		<div
			className={`flex  w-full o my-1   ${
				sender == 'me' ? 'justify-end' : 'justify-start'
			}`}>
			<div
				className={`px-3 py-2 text-ellipsis
                    ${
					sender == 'me'
						? 'bg-dark-blue text-white '
						: 'bg-friend-text-bg text-black pr-3'
				}`}>
				{text}
			</div>
		</div>
	);
}

export default ChatItem;
