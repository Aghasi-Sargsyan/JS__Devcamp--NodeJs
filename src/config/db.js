const mongoose = require('mongoose');

async function connectMongo() {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});
	console.info(`MongoDB Connected: ${conn.connection.host}`.bgWhite.black)
}

module.exports = connectMongo;