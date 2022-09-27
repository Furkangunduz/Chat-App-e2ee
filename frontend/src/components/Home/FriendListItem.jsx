import { useContext } from 'react';
import ChatContext from '../../context/ChatContext';

function FriendListItem({ user }) {
	const { setActiveChat } = useContext(ChatContext);

	return (
		<div
			className='bg-black/20 flex justify-start items-center rounded-xl cursor-pointer hover:bg-black/10 hover:-translate-y-1 transition-transform'
			onClick={() => {
				setActiveChat(user.name);
			}}>
			<p className='border-b-2 py-3 px-4 font-semibold text-lg '>{user.name}</p>
		</div>
	);
}

export default FriendListItem;
