const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, slug, content, image, author } = req.body;

    const blog = new Blog({
        title,
        slug,
        content,
        image,
        author,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    const { title, slug, content, image, author } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title || blog.title;
        blog.slug = slug || blog.slug;
        blog.content = content || blog.content;
        blog.image = image || blog.image;
        blog.author = author || blog.author;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.remove();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
