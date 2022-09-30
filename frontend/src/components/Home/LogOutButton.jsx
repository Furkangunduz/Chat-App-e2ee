import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function LogOutButton() {
	const { logOut } = useContext(UserContext);
	return (
		<div
			onClick={logOut}
			className='grid place-content-center  border-2 border-black/30 p-2 rounded-full bg-white hover:bg-white/90 hover:-translate-y-2 hover:scale-[1.1] cursor-pointer transition-all'>
			<FiLogOut className='w-6 h-6' />
		</div>
	);
}

export default LogOutButton;
