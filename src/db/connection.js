var Mongoose = require('mongoose');
require('dotenv').config();

Mongoose.Promise = global.Promise;
const uri=process.env.MONGOOS_URI

const connectDB = () => {
  Mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true } );
}
const db = Mongoose.connection;

db.on('error', (error) => {
  throw error;
});

db.once('open', () => {
  console.log('Connection with database succeeded.');
});

// export default db;
module.exports = {
    db,
    connectDB
}
