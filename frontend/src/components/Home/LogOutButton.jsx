import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';

import UserContext from '../../context/UserContext';
import SocketContext from '../../context/SocketContext';

function LogOutButton() {
	const { logOut } = useContext(UserContext);
	const { socket } = useContext(SocketContext);

	return (
		<div
			onClick={() => {
				logOut(socket);
			}}
			className='grid place-content-center  border-2 border-black/30 p-2 rounded-full bg-white hover:bg-white/90 hover:-translate-y-2 hover:scale-[1.1] cursor-pointer transition-all'>
			<FiLogOut className='w-6 h-6' />
		</div>
	);
}

export default LogOutButton;
