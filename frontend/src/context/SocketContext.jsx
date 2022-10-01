import { createContext, useState } from 'react';
import useSocket from '../hooks/useSocket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const socket = useSocket();

	return (
		<SocketContext.Provider
			value={{
				socket,
			}}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
