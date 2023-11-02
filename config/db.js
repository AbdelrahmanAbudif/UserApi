const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// a connectDB method is created so that we can connect to the mongodb
const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log('Mongo database connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;