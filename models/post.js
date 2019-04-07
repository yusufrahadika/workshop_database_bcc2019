'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      as: 'creatorData',
      foreignKey: 'creator',
      sourceKey: 'username'
    });
    Post.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'id',
      targetKey: 'postId'
    });
  };
  return Post;
};