'use strict';
const Hapi = require('@hapi/hapi');
const {db } = require('./db/connection');
const routes = require('./routes/user.routes');
require('dotenv').config();

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.SERVER_HOST
    });



    await routes(server);

    await server.start();
 
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();