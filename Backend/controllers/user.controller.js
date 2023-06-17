const bycrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken');
const { off } = require('process');
const { Op } = require('sequelize');

const User = db.users;

const signup = async (req, res) => {

    try {
        console.log(req.body, 'cin')

        const { userName, email, password, role, major, phone, city, officeAddress } = req.body;
        const data = {
            userName,
            email,
            password: await bycrypt.hash(password, 10),
            role,
            major,
            phone,
            city,
            officeAddress

        };

        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id }, 'adsasdasd', {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            })

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token)

            res.status(201).json({ message: "login successful", user, token })
        } else {
            return res.status(409).send("Deatils are not correct!")
        }
    } catch (error) {
        console.log(error)
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }

        });

        if (user) {
            const isSame = await bycrypt.compare(password, user.password);


            if (isSame) {
                let token = jwt.sign({ id: user.id }, 'asdasdasd', {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);

                return res.status(201).json({ token, user })
            } else {
                return res.status(401).send("Email or Password are incorrect");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

const editUser = async (req, res) => {
    const { userId } = req.params;
    console.log(req.body)
    const { major, phone, city, bio, profilePic, officeAddress, firstName, lastName } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user information
        user.major = major;
        user.city = city;
        user.officeAddress = officeAddress;
        user.phone = phone;
        user.bio = bio;
        user.profilePic = profilePic;
        user.firstName = firstName;
        user.lastName = lastName

        // Update additional fields as needed

        // Save the changes
        await user.save();

        res.json({ message: 'User information updated successfully', user });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is passed as a parameter in the request URL

    try {
        // Find the user by ID
        const user = await User.findByPk(userId, {
            attributes: ['id','firstName', 'lastName', 'major', 'city', 'officeAddress', 'phone', 'bio', 'profilePic'],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user information:', error);
        res.status(500).json({ error: 'Failed to retrieve user information' });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'phone', 'city', 'officeAddress', 'major', 'bio', 'profilePic'],
            where: { role: 'Engineer' },
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
const getClients = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'Client' },
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


module.exports = {
    signup,
    login,
    getAllUsers,
    editUser,
    getUserById,
    getClients
}
