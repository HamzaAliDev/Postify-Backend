const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
            .then(() => console.log('Database is Connected!'));
    } catch (err) {
        console.log('Error in connecting to the database');
        console.log(err);
    }
}

module.exports = dbConnection;