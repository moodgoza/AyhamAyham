module.exports = {
  HOST: "containers-us-west-115.railway.app",
  USER: "postgres",
  PASSWORD: "db1rowWzK6WxIFjJYf3G",
  DB: "railway",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
