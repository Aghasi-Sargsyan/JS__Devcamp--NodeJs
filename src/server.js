const express = require('express');
const dotenv = require('dotenv');
const routerBootcamps = require('./routes/bootcamps');
const {rootJoin} = require('./helpers/general');

dotenv.config({path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/v1/bootcamps', routerBootcamps);

app.listen(PORT, ()=>{
	console.info(`server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});