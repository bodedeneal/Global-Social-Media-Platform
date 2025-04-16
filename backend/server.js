const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const posts = [];

app.use(bodyParser.json());
app.use(express.static('frontend'));

// API to fetch all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// API to create a post
app.post('/api/posts', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    posts.push({ content, timestamp: new Date() });
    res.status(201).json({ message: 'Post created' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
