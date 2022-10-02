import { useState, useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

import RSA from '../../utils/keygenerator';
import { divideStringByLength } from '../../utils/utils';

import ChatContext from '../../context/ChatContext';
import SocketContext from '../../context/SocketContext';

function MeesageInput() {
	const [message, setMessage] = useState('');
	const { activeChatPublicKey, setChatHistory } = useContext(ChatContext);
	const { socket } = useContext(SocketContext);

	const sendMessage = () => {
		if (!activeChatPublicKey) return;
		if (!message || message.trim().length === 0) return;
		let msg = message.replaceAll('ş', 's').trim();

		setChatHistory((prev) => [...prev, { sender: 'me', text: msg }]);

		if (msg.length < 20) {
			socket.emit('new-message', [RSA.encrypt(msg, activeChatPublicKey)]);
			setMessage('');
			return;
		}

		let messagesArray = divideStringByLength(msg, 17);
		let encryptedMessagesArray = [];
		messagesArray.forEach((message) => {
			encryptedMessagesArray.push(RSA.encrypt(message, activeChatPublicKey));
		});
		socket.emit('new-message', encryptedMessagesArray);
		setMessage('');
	};

	return (
		<div className='w-full absolute bottom-0 flex justify-center items-center gap-6 mb-4 pt-4 border-t-2 border-black/10'>
			<input
				onChange={(e) => {
					setMessage(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key == 'Enter') {
						sendMessage(message);
					}
				}}
				value={message}
				type='text'
				className='w-[70%] px-4 py-2  bg-input-bg   rounded-lg '
			/>
			<button
				onClick={() => {
					sendMessage(message);
				}}>
				<FiSend className=' w-6 h-6 hover:scale-[1.2] cursor-pointer ' />
			</button>
		</div>
	);
}

export default MeesageInput;
