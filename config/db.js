const blue = require('colors');
const mongoose = require('mongoose');

const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB