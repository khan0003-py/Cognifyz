const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    console.log(`Received form submission: Name - ${name}, Email - ${email}`);
    res.send('Form submitted successfully!');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
