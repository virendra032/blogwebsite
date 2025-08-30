const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a new blog post
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newBlog = new Blog({ title, content, userId: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Approve a blog post
router.put('/:id/approve', authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.status = 'approved';
        await blog.save();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Reject a blog post
router.put('/:id/reject', authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.status = 'rejected';
        await blog.save();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
