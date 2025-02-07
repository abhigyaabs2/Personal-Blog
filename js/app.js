const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies if needed
}));

app.use(express.json());

// Example route
app.post('/api/blogs', (req, res) => {
    res.json({ message: 'Blog created successfully!' });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
