const http = require('http');
const dotenv = require('dotenv');
const HttpStatus = require('http-status-codes');


dotenv.config();

let id = 0;
function incrementId() {
	return ++id;
}

const errors = {
	notFound: wrapError(404, 'url not found'),
	missingParam: (...params) => wrapError(400, `missing ${params.join(' ')}`),
};

function wrapError(status, message) {
	return {status, message}
}

function createResponse({data, success, error = {}} = {}) {
	const {status, message} = error;

	let resStatus = status || 200;

	const resData = JSON.stringify({
			success: success || false,
			error:  message || '',
			data:  data || null,
		});

	return {
		resData, resStatus
	}
}



const server = http.createServer((req, res)=>{

	req.on('data', ()=>{

	}).on('end', ()=>{

		let status = 200;
		let data = createResponse();

		switch (req.url) {
			case '/users':{
				const {resData, resStatus} = createResponse({data: users, success:true});
				status = resStatus;
				data = resData;
			}
				break;
			case '/':{
				const {resData, resStatus} = createResponse({error: errors.notFound});
				status = resStatus;
				data = resData;
				}
				break;
			default:
				const {resData, resStatus} = createResponse({error: errors.missingParam('id', 'name')});
				status = resStatus;
				data = resData;
		}

		res.writeHead(status,{'content-type': 'application/json'});
		res.end(data);
	});
});

server.listen(process.env.PORT, ()=>{
	console.info(`listening http://localhost:${process.env.PORT}`)
});

HttpStatus.getStatusText()