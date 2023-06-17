const express = require('express')
const blogCont = require('../controllers/blog.controller.js')
const {getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog }  = blogCont;
const router  = express.Router()
const { validateBlogFields } = require('../middleware/BlogsMiddleware.js') 
router.get('/blogs', blogCont.getAllBlogs);

router.post('/blogs',validateBlogFields,  createBlog);

router.get('/blogs/:id', blogCont.getBlogById);

router.get('/blogs/by/:userId', blogCont.getBlogsByUser);

router.put('/blogs/:id', blogCont.updateBlog);

router.delete('/blogs/:id', blogCont.deleteBlog);


module.exports = router

