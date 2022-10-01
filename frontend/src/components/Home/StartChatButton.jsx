import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import ChatContext from '../../context/ChatContext';
import SocketContext from '../../context/SocketContext';

function StartChatButton() {
	const { activeChatPublicKey, setActiveChatUserName, setActiveChatPublicKey } =
		useContext(ChatContext);
	const socket = useContext(SocketContext);

	const handleClick = () => {
		if (activeChatPublicKey) {
			setActiveChatUserName('');
			setActiveChatPublicKey('');
			socket.emit('user-left');
		}
	};

	return (
		<Link onClick={handleClick} to='/start-chat'>
			<Button>Start Chat</Button>
		</Link>
	);
}

export default StartChatButton;
