const express = require('express');
const app = express();
const axios = require('axios');

const users = [];

app.use(express.json());

app.get('/users', (req,res) => {
	axios.get('https://randomuser.me/api')
		.then( response => {
			// push NEW data into the users array
			users.push(response.data);
	})
	.catch( error => {
		console.log(error);
	}
	res.status(200).json(users);
});

app.get('/users/firstname/:firstname', (req, res) => {
	const user = users.find(u => u.firstname === req.params.firstname);
	
	if (!user) res.status(404).json({ message: 'User not found! '});

	res.status(200).json(user);
});

app.post('/users', (req, res) => {
	// add user to the users in-memory
	users.push(req.body);
	res.status(201).json({ message: 'User successfully created!' });
});


app.listen(8080, () => console.log('Listening on port 8080'));
