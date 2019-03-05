const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {


    const config = require('./config.json');

    if (env === 'development') { // development env
        process.env.PORT = config.development.PORT;
        process.env.MONGODB_URI = config.development.MONGODB_URI;
        process.env.MONGODB_URI_CLOUD = config.development.MONGODB_CLOUD;
        process.env.JWT_SECRET = config.development.JWT_SECRET;
        process.env.ENV = config.development.ENV;
        process.env.FRONTEND_URL = config.development.FRONTEND_URL;



    } else { // testing env
        process.env.PORT = config.test.PORT;
        process.env.MONGODB_URI = config.test.MONGODB_URI;
        process.env.JWT_SECRET = config.test.JWT_SECRET;
        process.env.ENV = config.test.ENV;
    }

}