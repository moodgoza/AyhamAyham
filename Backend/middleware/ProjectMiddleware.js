const express = require('express');

function validateProjectFields(req, res, next) {
  const { title,clientName , content, thumbNail, projectImages } = req.body;

  if (!title || !clientName || !content || !thumbNail || !projectImages) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  next();
}

module.exports = validateProjectFields;
