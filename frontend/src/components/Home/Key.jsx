import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { toast } from 'react-toastify';

function Key() {
	const { user } = useContext(UserContext);

	const copyPublicKey = () => {
		navigator.clipboard.writeText(user.public_key);
		toast('Public Key Coppied!', { toastId: 'public_key' });
	};

	return (
		<div
			onClick={copyPublicKey}
			className='absolute top-4 left-24 border-2 border-black/20 bg-white px-6 py-2 rounded-lg cursor-pointer hover:-translate-y-[1px] hover:scale-[1.05] transition-all'>
			<p>
				<span style={{ userSelect: 'none' }} className='text-dark-blue font-bold mr-3'>
					Your Public id
				</span>
				{user.public_key}
			</p>
		</div>
	);
}

export default Key;
