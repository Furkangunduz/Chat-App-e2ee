import FriendList from '../components/Home/FriendList';
import Chat from '../components/Home/Chat';
import LogOutButton from '../components/Home/LogOutButton';

function Home() {
	return (
		<div className='bg-bg flex w-full justify-center overflow-y-hidden relative'>
			<FriendList />
			<Chat />
			<LogOutButton />
		</div>
	);
}

export default Home;
