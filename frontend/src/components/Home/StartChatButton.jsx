import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

function StartChatButton() {
	return (
		<Link to='/start-chat'>
			<Button>Start Chat</Button>
		</Link>
	);
}

export default StartChatButton;
