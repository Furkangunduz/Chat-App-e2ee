import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RSA from '../utils/keygenerator';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	//TODO Hide private key
	const userStorage = JSON.parse(sessionStorage.getItem('user'));
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		user: userStorage || null,
		result: '',
		message: '',
	});

	const register = (userCredential, socket) => {
		let keys = generateKey();
		axios.post(process.env.REACT_APP_API_URL + '/users', {
			...userCredential,
			public_key: keys.public_key.toString(),
			private_key: keys.private_key.toString(),
			public_exponent: keys.public_exponent.toString(),
		})
			.then((res) => {
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					sessionStorage.setItem('user', JSON.stringify({ ...user }));
					socket.emit('save-user', { name: user.name, public_key: user.public_key });
					navigate('/');
				}
			})
			.catch((err) => {
				toast(err?.response?.data?.message, { toastId: err?.response?.data?.message });
				console.log(err?.response?.data?.stack);
			});
	};

	const login = async (loginCredential, socket) => {
		axios.post(process.env.REACT_APP_API_URL + '/users/login', loginCredential)
			.then((res) => {
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					sessionStorage.setItem('user', JSON.stringify(user));
					socket.emit('save-user', { name: user.name, public_key: user.public_key });
					navigate('/');
				}
			})
			.catch((err) => {
				toast(err?.response?.data?.message, { toastId: err?.response?.data?.message });
				console.log(err?.response?.data?.stack);
			});
	};

	const logOut = (socket) => {
		sessionStorage.removeItem('user');
		socket.emit('user-left');
		navigate('/login');
	};

	const AddFriend = (public_key) => {
		if (!public_key) {
			toast('must provide public key.', { toastId: ' must provide public key.' });
			return;
		}
		axios.post(
			process.env.REACT_APP_API_URL + '/users/add-friend',
			{ public_key },
			{
				headers: {
					'Authorization': 'Bearer ' + userInfo.user.token,
				},
			}
		)
			.then((res) => {
				let user = res?.data?.user || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					sessionStorage.setItem('user', JSON.stringify(user));
				}
			})
			.catch((err) => {
				toast(err?.response?.data?.message, { toastId: err?.response?.data?.message });
				console.log(err?.response?.data?.stack);
			});
		navigate('/');
	};

	const generateKey = () => {
		const keys = RSA.generate(200);
		let public_key = keys.n;
		let public_exponent = keys.e;
		let private_key = keys.d;
		return { public_key, public_exponent, private_key };
	};

	return (
		<UserContext.Provider
			value={{
				user: userInfo['user'],
				setUserInfo,
				register,
				login,
				logOut,
				AddFriend,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
