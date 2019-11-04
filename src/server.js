const express = require('express');
const dotenv = require('dotenv');
const withStatus = require('./middlewares/withStatus');
const routerBootcamps = require('./routes/bootcamps');
const morgan = require('morgan');

dotenv.config({path: '.env' });

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

app.use(withStatus);

//Mount router
app.use('/api/v1/bootcamps', routerBootcamps);

app.listen(PORT, ()=>{
	console.info(`server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});