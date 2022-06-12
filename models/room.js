import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      const { userGames } = models;

      room.belongsTo(userGames, { foreignKey: 'username1' });
      room.belongsTo(userGames, { foreignKey: 'username2' });
    }
  }

  room.init({
    roomId: {
      primaryKey: true,
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
        len: [6, 6],
      },
    },
    username1: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
    username2: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
    playerOne_status: {
      type: DataTypes.STRING,
    },
    playerTwo_status: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'empty',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'room',
    timestamps: true,
  });
  return room;
};
