const express = require('express');
const  validateBlogFields = (req, res, next) => {
    const { title, expert, content, thumbNail } = req.body;

    if (!title || !expert || !content || !thumbNail) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    next();
}

module.exports = {
    validateBlogFields
};
