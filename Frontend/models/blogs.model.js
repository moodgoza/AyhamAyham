module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blogs", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        thumbNail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expert:{
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            get() {
                // Get the stored value of createdAt
                const storedValue = this.getDataValue('createdAt');
                // Convert the stored value to a normal date
                const normalDate = new Date(storedValue);
                return normalDate;
            },
            set(value) {
                // Set the value to a normal date before saving
                const normalDate = value instanceof Date ? value : new Date(value);
                this.setDataValue('createdAt', normalDate);
            }
        }
    })
    return Blog
}
