import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RSA from '../utils/keygenerator';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const userStorage = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		user: userStorage || null,
		result: '',
		message: '',
	});

	const register = (userCredential) => {
		let keys = generateKey();
		axios.post(process.env.REACT_APP_API_URL + '/users', {
			...userCredential,
			public_key: keys.public_key.toString(),
			private_key: keys.private_key.toString(),
			public_exponent: keys.public_exponent.toString(),
		})
			.then((res) => {
				console.log(res);
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					localStorage.setItem('user', JSON.stringify({ ...user }));
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				console.log(err?.response?.data?.stack);
			});
	};

	const login = async (loginCredential) => {
		axios.post(process.env.REACT_APP_API_URL + '/users/login', loginCredential)
			.then((res) => {
				console.log(res?.data);
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					localStorage.setItem('user', JSON.stringify(user));
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				console.log(err?.response?.data?.stack);
			});
	};

	const logOut = () => {
		localStorage.removeItem('user');
		navigate('/login');
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
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
