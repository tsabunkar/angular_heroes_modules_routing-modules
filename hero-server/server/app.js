const express = require('express');

const app = express();
const http = require('http');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

const {
    heroesRoute
} = require('./routes/hero.route');

// !*NOTE: Instead of installing spearate middleare for parsing req and resp, we can use express itself :)
app.use(express.json()); // !middleware which parses incoming request in JSON format, this body-parser middleware must be
// !registered with express so wrote inside app.use();

app.use(express.urlencoded({ // to parse
    extended: false
}));


// !Using Morgan middleware for logging purposes
app.use(logger('dev'));

// console.log(process.env);

app.all('*', function (req, res, next) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});


// !Swagger-UI
// http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));



// !filter routes with '/api/heroes' -> redirect to heroesRoute
// http://localhost:3000/api/heroes
app.use('/api/heroes', heroesRoute);





// !Creating a global level middleware for Error handling
/* app.use((req, resp, next) => {
    const error = new Error('Not Found');
    error.message = 'Invalid Route';
    error.status = 404;
    next(error);
}); */

// !Creating a error handling miidleware
app.use((error, req, resp, next) => { // eslint-disable-line
    resp.status(error.status || 500); // if end-user provides the status then use - error.status else 500
    return resp.json({
        message: error.message
    });
});

// validating the PORT
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};


const PORT = normalizePort(process.env.PORT || '3000');
// const PORT = 4200;

app.set('port', PORT); // setting port

const server = http.createServer(app); // create node server which uses express

server.listen(PORT); // start the server