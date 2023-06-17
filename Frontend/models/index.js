const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize")

const sequelize = new Sequelize('postgresql://postgres:db1rowWzK6WxIFjJYf3G@containers-us-west-115.railway.app:6212/railway') // Example for postgres


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize

db.blogs = require("./blogs.model.js")(sequelize, Sequelize)
db.projects = require("./projecs.model.js")(sequelize, Sequelize)
db.users = require("./users.model.js")(sequelize, Sequelize)
db.messages = require('./messages.model.js')(sequelize, Sequelize)
db.users.hasMany(db.blogs, { as: "blogs" });
db.blogs.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
});


db.users.hasMany(db.projects, { as: "projects" });
db.projects.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
});
db.users.hasMany(db.messages, {
    foreignKey: 'senderId',
    as: 'sentMessages'
});
db.users.hasMany(db.messages, {
    foreignKey: 'receiverId',
    as: 'receivedMessages'
});

db.messages.belongsTo(db.users, { as: 'sender', foreignKey: 'senderId' });


db.messages.belongsTo(db.users, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = db
