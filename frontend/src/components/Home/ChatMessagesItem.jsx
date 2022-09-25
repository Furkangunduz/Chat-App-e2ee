import React from 'react';

function ChatItem({ message }) {
	let { text, sender } = message;
	return (
		<div
			className={`flex flex-shrink-0 w-full my-1 px-2  ${
				sender == 'me' ? 'justify-end' : 'justify-start'
			}`}>
			<p
				className={`text-left px-3 py-2 max-w-[40%]
                    ${
					sender == 'me'
						? 'bg-dark-blue text-white '
						: 'bg-friend-text-bg text-black  pr-3'
				}`}>
				{text}
			</p>
		</div>
	);
}

export default ChatItem;
