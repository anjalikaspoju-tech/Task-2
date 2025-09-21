const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'feedback.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle form submission
app.post('/submit-feedback', (req, res) => {
    const feedback = req.body;

    // Read existing data
    let feedbackArray = [];
    if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE);
        feedbackArray = JSON.parse(fileData);
    }

    // Add new feedback
    feedbackArray.push(feedback);

    // Write back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(feedbackArray, null, 2));

    res.send('Thank you for your feedback!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
