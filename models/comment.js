'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    creator: {
      allowNull: false,
      type: DataTypes.STRING(20)
    }
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      as: 'creatorData',
      foreignKey: 'creator',
      sourceKey: 'username'
    });
    Comment.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'postId',
      sourceKey: 'id'
    });
  };
  return Comment;
};