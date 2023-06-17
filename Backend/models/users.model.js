const { match } = require("assert");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Client'
        },
        major: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        profilePic: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        officeAddress: {
            type: Sequelize.STRING,
            allowNull: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        }
        
    }, { timestamps: true },)

    return User

};
