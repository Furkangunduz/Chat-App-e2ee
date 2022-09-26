function FriendListItem({ user }) {
	return (
		<div>
			<p className='border-b-2 pb-4'>{user.name}</p>
		</div>
	);
}

export default FriendListItem;
