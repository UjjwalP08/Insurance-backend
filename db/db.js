const mongoose = require("mongoose");
require("dotenv").config().parsed

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;


db.on('connected', () => {
    console.log('Database connection successful');
});

module.exports = {
    mongoose
}