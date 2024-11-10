const mongoose = require("mongoose")

const connectionString = 'mongodb+srv://subhamkarn125:password125@cluster0.h675w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString)
    .then(() => console.log('Connected to Remote MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

module.exports = mongoose.connection;