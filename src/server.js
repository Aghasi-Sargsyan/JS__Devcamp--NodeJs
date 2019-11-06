require('colors');
const express = require('express');
const dotenv = require('dotenv');
const withStatus = require('./middlewares/withStatus');
const routerBootcamps = require('./routes/bootcampsRoutes');
const morgan = require('morgan');
const connectMongo = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

//Load env vars form .env file
dotenv.config({path: '.env' });

const PORT = process.env.PORT || 5000;
const app = express();

//Connect to MongoDB
connectMongo();

//Body parser
app.use(express.json());

//Mount logger
if (process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

//Added a function on res object for sending data with json and status code
app.use(withStatus);

//Mount routers
app.use('/api/v1/bootcamps', routerBootcamps);

//Mount an error handler, always should be in the bottom of middlewares
app.use(errorHandler);

//Create server and listen to it
const server = app.listen(PORT, ()=>{
	console.info(`server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.cyan);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err)=>{
	console.warn(`'ERROR: ${err.message}`.red);
	server.close(()=> process.exit(1))
});