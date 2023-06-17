const express = require('express')
const db = require('../models')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
const User = db.users;
const bcrypt = require('bcrypt')


const saveUser = async (req, res, next) => {
    const { userName, email } = req.body;
    try {
        // Check if username or email already exists in the database
        const existingUser = await User.findOne({ where: { [Op.or]: [{ userName }, { email }] } });

        // If a user with the same username or email is found, return an error response
        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already taken.' });
        }

        // If username and email are unique, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ error: 'Internal server error.' });
    }

}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;

        next();
    });
};
async function checkLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        // Find the user by username in the database
        const user = await User.findOne({ where: { email } });

        // If no user is found, return an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords do not match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // If login info is correct, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ error: 'Internal server error.' });
    }
}


module.exports = {
    saveUser,
    verifyToken,
    checkLogin
};

