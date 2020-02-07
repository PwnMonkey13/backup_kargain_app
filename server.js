const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./src/config/config');
const server = express();

server.use(helmet());
server.use(cors());
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));

if(!config.isDev){
    server.use( session({
            secret : 's3Cur3',
            name : 'sessionId',
        })
    );
}

module.exports = server;
