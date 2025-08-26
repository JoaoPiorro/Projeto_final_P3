const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const DB_NAME = process.env.DB_NAME || 'proj_especial';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
host: DB_HOST,
dialect: 'mysql',
logging: false,
define: {
timestamps: false
}
});

module.exports = sequelize;