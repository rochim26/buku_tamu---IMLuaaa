const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const roomRoutes = require('./routes/roomRoutes');
const guestBookRoutes = require('./routes/guestBookRoutes');

// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/rooms', roomRoutes);
app.use('/guests', guestBookRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/rooms');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});