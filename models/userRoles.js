import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {
    static associate(models) {
      const { userGames } = models;
    }
  }
  userRoles.init({
    rank: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.INTEGER,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'userRoles',
    timestamps: false,
  });
  return userRoles;
};
