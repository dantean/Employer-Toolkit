const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SuperETK');
dotenv.config();

module.exports = mongoose.connection;