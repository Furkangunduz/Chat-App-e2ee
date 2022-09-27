// eslint-disable-next-line
import FriendList from '../components/Home/FriendList';
import Chat from '../components/Home/Chat';
import Key from '../components/Home/Key';
import LogOutButton from '../components/Home/LogOutButton';
import StartChatButton from '../components/Home/StartChatButton';
import useSocket from '../hooks/useSocket';

function Home() {
	// eslint-disable-next-line
	const [isConnected] = useSocket();
	return (
		<div className='bg-bg flex flex-col w-full h-full'>
			<div className='mt-2 flex gap-10 mx-10 justify-center items-center bg-white py-2 rounded-lg'>
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
