import FriendList from '../components/Home/FriendList';
import Chat from '../components/Home/Chat';
import Key from '../components/Home/Key';
import LogOutButton from '../components/Home/LogOutButton';

function Home() {
	return (
		<div className='pt-10 bg-bg flex w-full justify-center overflow-y-hidden relative'>
			<Key />
			<FriendList />
			<Chat />
			<LogOutButton />
		</div>
	);
}

export default Home;
