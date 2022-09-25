import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function LogOutButton() {
	const { logOut } = useContext(UserContext);
	return (
		<div
			onClick={logOut}
			className='grid place-content-center absolute right-[1%] top-[6%] border-2 border-black/30 p-2 rounded-full bg-white hover:bg-white/90 hover:-translate-y-2 hover:scale-[1.1] cursor-pointer transition-all'>
			<FiLogOut className='w-10 h-10' />
		</div>
	);
}

export default LogOutButton;
