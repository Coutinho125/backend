
const express = require("express")

const app = express()
const database = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your web application's origin
    credentials: true // This is required to handle cookie-based authentication
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: 'mongodb+srv://subhamkarn125:password125@cluster0.h675w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' }),
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

app.use('/api/user', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/rentals', rentalRoutes);

database.on('connected', () => {
    console.log('Connected to MongoDB');
});

database.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen("8000");

//673094b7ec9cc032b6a445cf landlord