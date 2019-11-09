const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const content = require('./routes/content.route');

//Database connection
const mongoDB = process.env.MONGO_URL || 'mongodb://localhost/fTable';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/api/contents', content);

const port = 9000;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
