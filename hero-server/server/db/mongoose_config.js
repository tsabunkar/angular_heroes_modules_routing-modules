// first mongoose file, which will get executed
require('../config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// !By default mongoose uses callback, but if
// !we want to use async-await or promises then this code will specifiy it

const url = process.env.MONGODB_URI;
// const url = process.env.MONGODB_URI_CLOUD;

// !remove deprication warning
// console.log(url);
// console.log(typeof (url));
mongoose.connect(url, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to db !'); // eslint-disable-line
    })
    .catch(() => {
        console.log('failed to connect to db!'); // eslint-disable-line
    });
//for production env, we are using the mongodb uri as -> process.env.MONGODB_URI



module.exports = {
    mongoose
};
// !exporting this mongoose, where some operations r perfomed,
//! (now whole application wil be using this mongoose only, rather than importing directly
// !from mongoose libr)