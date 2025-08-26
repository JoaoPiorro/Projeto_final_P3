const sequelize = require('../config/dbconfig');
const Post = require('./post.model');

const db = {
    sequelize,
    Sequelize: require("sequelize"),
    Post: Post(sequelize)
};

module.exports = db;