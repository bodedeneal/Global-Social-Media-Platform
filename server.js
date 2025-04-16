const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = []; // In-memory storage (use a database in production)

// Fetch all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const { imageUrl } = req.body;
    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    const newPost = {
        id: uuidv4(),
        imageUrl,
        likes: 0,
        comments: [],
        shares: 0,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    post.likes += 1;
    res.json(post);
});

// Add a comment to a post
app.post('/api/posts/:id/comment', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    if (!comment) {
        return res.status(400).json({ error: 'Comment is required' });
    }
    post.comments.push(comment);
    res.json(post);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
