import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

function StartChatButton() {
	return (
		<Link to='/start-chat'>
			<Button>Add Friend</Button>
		</Link>
	);
}

export default StartChatButton;
