// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Temporary storage object
let submissions = [];

app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send('Passwords do not match!');
  } else {
    // Store validated data in temporary storage
    const submission = { username, email, password };
    submissions.push(submission);

    // For demonstration, log the submissions
    console.log('Submissions:', submissions);

    res.send('Form submitted successfully!');
  }
});

// Endpoint to retrieve stored submissions
app.get('/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
