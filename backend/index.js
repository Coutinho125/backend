
const express = require("express")

const app = express()
const database = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/rentals', rentalRoutes);

database.on('connected', () => {
    console.log('Connected to MongoDB');
});

database.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen("8000");