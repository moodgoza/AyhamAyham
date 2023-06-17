module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        clientName: {
            type: Sequelize.STRING
        },
        thumbNail: {
            type: Sequelize.STRING,
        },
        projectImages: {
            type:Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: []
        },
        image360: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Project

};
