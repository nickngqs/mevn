const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

fs.readdirSync('./controllers').forEach(file => {
	if (file.substr(-3) == '.js') {
		route = require('./controllers/' + file);
        route.controller(app);
	}
});

mongoose.connect('mongodb://localhost:27017/mevn');

app.listen(3001, () => {
	console.log('Server is running and listening on port 3001');
});