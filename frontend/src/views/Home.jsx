import Chat from '../components/Home/Chat';
import Key from '../components/Home/Key';
import LogOutButton from '../components/Home/LogOutButton';
import StartChatButton from '../components/Home/StartChatButton';
import Toast from '../components/Toast';
import { useContext } from 'react';
import ChatContext from '../context/ChatContext';
import SocketContext from '../context/SocketContext';

function Home() {
	const {
		askUserChatRequest,
		activeChatUserName,
		setActiveChatUserName,
		setAskUserChatRequest,
	} = useContext(ChatContext);
	const { socket } = useContext(SocketContext);

	const accepted = () => {
		socket.emit('chat-request-accepted');
		setAskUserChatRequest(false);
	};
	const declined = () => {
		setAskUserChatRequest(false);
		setActiveChatUserName('');
		socket.emit('chat-request-declined');
	};

	return (
		<div className='bg-bg flex flex-col w-full h-full'>
			{askUserChatRequest && (
				<Toast username={activeChatUserName} accepted={accepted} declined={declined} />
			)}
			<div className=' w-full flex gap-10  justify-center items-center bg-white py-2 rounded-b-lg'>
				<Key />
				<StartChatButton />
				<LogOutButton />
			</div>
			<div className='flex justify-center'>
				{/* <FriendList /> */}
				<Chat />
			</div>
		</div>
	);
}

export default Home;
