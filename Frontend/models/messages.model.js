const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Message
};
