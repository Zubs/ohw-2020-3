// Import packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');

// Load config
dotenv.config({
	path: './config/config.env'
})

connectDB();

// Initiate the app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// Listen to requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Set Up static files
app.use(express.static('public'));

// Using morgan to log instead
app.use(morgan('dev'));

// Respond to /
app.get('/', (req, res) => {
	res.render('index', { title: 'Home', style: 'index-style'});
});

// Respond to /
app.get('/about', (req, res) => {
	res.render('about', { title: 'About', style: "about-style"});
});

// Respond to /contact
app.get('/contact', (req, res) => {
	res.render('contact', { title: 'Contact Us', style: "contact-style"});
});

app.use(express.urlencoded());
app.use(express.json());

app.post('/contact-form', (req, res) => {
	console.log(req.body.contact.message);
	console.log(req.body.contact.name);
	console.log(req.body.contact.email);
});

app.use((req, res) => {
	res.status(404).render('404', { title: 'Page Not Found'});
});