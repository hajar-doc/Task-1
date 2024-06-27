const express = require('express');
const app = express();
const port = 3000;

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid data types' });
    }
    next();
});

// Middleware to parse JSON
app.use(express.json());

// POST endpoint to calculate sum
app.post('/sum', (req, res) => {
    const { num1, num2 } = req.body;

    // Convert the inputs to numbers
    const num1Converted = Number(num1);
    const num2Converted = Number(num2);

    // Check if the conversion resulted in valid numbers
    if (isNaN(num1Converted) || isNaN(num2Converted)) {
        return res.status(400).json({ error: 'Invalid input: Both num1 and num2 should be valid numbers.' });
    }
    
    // Return the result as JSON
    const sum = num1Converted + num2Converted;
    res.json({ sum });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
