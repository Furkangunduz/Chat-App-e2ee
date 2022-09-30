import { useState, useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import RSA from '../../utils/keygenerator';
import ChatContext from '../../context/ChatContext';

function MeesageInput({ socket }) {
	const [message, setMessage] = useState('');
	const { activeChatPublicKey, setChatHistory } = useContext(ChatContext);

	const sendMessage = () => {
		if (activeChatPublicKey) {
			socket.emit('newMessage', RSA.encrypt(RSA.encode(message), activeChatPublicKey));
			setChatHistory((prev) => [...prev, { sender: 'me', text: message }]);
			setMessage('');
		} else {
			console.log('not set public key');
		}
	};
	return (
		<div className='w-full absolute bottom-0 flex justify-center items-center gap-6 mb-4 pt-4 border-t-2 border-black/10'>
			<input
				onChange={(e) => {
					setMessage(e.target.value);
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
