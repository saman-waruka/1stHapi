var Mongoose = require('mongoose');
require('dotenv').config();

Mongoose.Promise = global.Promise;
const uri=process.env.MONGOOS_URI
Mongoose.connect(uri,{ useNewUrlParser: true } );

const db = Mongoose.connection;

db.on('error', (error) => {
  throw error;
});

db.once('open', () => {
  console.log('Connection with database succeeded.');
});

// export default db;
module.exports = {
    db: db
}
