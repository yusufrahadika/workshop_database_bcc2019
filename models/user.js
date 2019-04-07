'use strict';

let tomorrow = new Date(new Date().getTime() + 86400000);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      validate: {
        isLowercase: true,
        isAlphanumeric: true
      }
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isBefore: tomorrow.toISOString().slice(0, 10)
      }
    },
    gender: {
      type: DataTypes.BOOLEAN,
      get() {
        return this.getDataValue('gender') ? 'Laki-laki' : 'Perempuan';
      }
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'creator',
      targetKey: 'username'
    });
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'creator',
      targetKey: 'username'
    });
  };
  return User;
};