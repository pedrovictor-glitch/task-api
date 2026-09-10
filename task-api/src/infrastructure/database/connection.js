const { Sequelize } = require('sequelize');
const path = require('path');

const storagePath =
  process.env.NODE_ENV === 'test'
    ? ':memory:'
    : path.resolve(__dirname, '..', '..', '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});

module.exports = sequelize;
