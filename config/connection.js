const mongoose = require('mongoose');
const variables = require('./variables');

const initDB = () => {
	mongoose.connect(variables.mongoDbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on('error', (err) => {
		console.log(`Connection error: ${err}`);
	});
	db.once('open', () => {
		console.log('Connected to MongoDB');
	});
};

module.exports = initDB;