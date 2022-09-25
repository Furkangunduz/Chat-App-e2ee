import FriendList from '../components/Home/FriendList';
import Chat from '../components/Home/Chat';

function Home() {
	return (
		<div className='bg-bg flex w-full justify-center absolute overflow-y-hidden'>
			<FriendList />
			<Chat />
		</div>
	);
}

export default Home;
