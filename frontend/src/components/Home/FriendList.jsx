import { Link } from 'react-router-dom';
import Button from '../Button';
import FriendListItem from './FriendListItem';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';

function FriendList() {
	const { user } = useContext(UserContext);

	return (
		<div className='flex flex-col gap-10 min-w-[450px] h-screen pt-10 pl-10'>
			<div className='relative'>
				<input
					type='text'
					placeholder='Search'
					className='w-full px-10 py-4 rounded-lg focus:outline-dark-blue drop-shadow-md'
				/>
			</div>
			<div className=' bg-white rounded-lg px-4 py-6  max-h-[510px] overflow-hidden drop-shadow-md mb-4'>
				<div className='flex justify-between items-center mr-3 border-b-2 border-black/20 pb-8 '>
					<h3 className='text-dark-blue font-bold text-2xl ml-4'>Friends</h3>
					<Link to='/add-friend'>
						<Button>Add Friend</Button>
					</Link>
				</div>

				<div className='flex flex-col h-full gap-6 bg-white pt-6 overflow-auto  '>
					{user.friends.map((user, index) => (
						<FriendListItem user={user} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}

export default FriendList;
