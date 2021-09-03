var Sequelize = require('sequelize');
var connection = require('../database/connection');
var Post = require('./Post');

var Evaluation = connection.define('evaluations', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'posts', key: 'id' },
    onUpdate: 'CASCADE',
    ondelete: 'CASCADE',
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    ondelete: 'CASCADE',
  },
  review: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rate: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
});

Post.hasMany(Evaluation);
Evaluation.sync({ force: true });

module.exports = Evaluation;
