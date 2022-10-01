import { useState, useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import RSA from '../../utils/keygenerator';
import ChatContext from '../../context/ChatContext';
import SocketContext from '../../context/SocketContext';

function MeesageInput() {
	const [message, setMessage] = useState('');
	const { activeChatPublicKey, setChatHistory } = useContext(ChatContext);
	const { socket } = useContext(SocketContext);

	const sendMessage = () => {
		if (activeChatPublicKey) {
			let msg = message;
			msg = msg.replaceAll('ş', 's');
			if (msg.trim().length == 0) {
				return;
			} else if (msg.trim().length < 20) {
				socket.emit('newMessage', RSA.encrypt(RSA.encode(msg), activeChatPublicKey));
				setChatHistory((prev) => [...prev, { sender: 'me', text: msg }]);
				setMessage('');
			} else {
				let messagesArray = [];
				let encryptedMessagesArray = [];
				while (true) {
					if (msg.length <= 17) {
						messagesArray.push(msg.substring(0, msg.length));
						break;
					}
					messagesArray.push(msg.substring(0, 17));
					msg = msg.substring(17);
				}
				messagesArray.forEach((message) => {
					encryptedMessagesArray.push(
						RSA.encrypt(RSA.encode(message), activeChatPublicKey)
					);
				});
				socket.emit('newMessage', encryptedMessagesArray);
			}
		} else {
			toast.error('Cant send messaages.');
		}
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
