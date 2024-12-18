const mongoose = require('mongoose');

const url = process.env.MONGO_URI || 'mongodb+srv://habbazahubbal:admin@mahad-tahfidz.nmzc1.mongodb.net/mahad?retryWrites=true&w=majority&appName=mahad-tahfidz'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB