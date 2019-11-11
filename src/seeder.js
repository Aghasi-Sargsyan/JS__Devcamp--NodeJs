require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectMongo = require('./config/db');
const fs = require('fs');

dotenv.config({path: '.env'});

const BootcampModel = require('./models/BootcampModel');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/assets/_data/bootcamps.json`, 'utf-8'));

async function importData(){
	try{
		await BootcampModel.create(bootcamps);
		console.log('Data imported...'.green.inverse);
	}catch(e) {
		console.log(e.message)
	}finally {
		process.exit(0)
	}
}

async function deleteData() {
	try{
		await BootcampModel.deleteMany();
		console.log('Data destroyed...'.red.inverse);
	}catch(e) {
		console.log(e.message)
	}finally {
		process.exit(0)
	}}

const caller = {
	'-i': importData,
	'-d': deleteData,
};

caller[process.argv[2]]();