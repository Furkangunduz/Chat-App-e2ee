// eslint-disable-next-line
import FriendList from '../components/Home/FriendList';
import Chat from '../components/Home/Chat';
import Key from '../components/Home/Key';
import LogOutButton from '../components/Home/LogOutButton';
import StartChatButton from '../components/Home/StartChatButton';

function Home({ socket }) {
	// eslint-disable-next-line
	return (
		<div className='bg-bg flex flex-col w-full h-full'>
			<div className=' w-full flex gap-10  justify-center items-center bg-white py-2 rounded-b-lg'>
				<Key />
				<StartChatButton />
				<LogOutButton />
			</div>
			<div className='flex justify-center'>
				{/* <FriendList /> */}
				<Chat socket={socket} />
			</div>
		</div>
	);
}

export default Home;
