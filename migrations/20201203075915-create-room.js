module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      roomId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6),
      },
      username1: {
        type: Sequelize.STRING,
        references: {
          model: 'userGames',
          key: 'username',
        },
        onDelete: 'set null',
      },
      username2: {
        type: Sequelize.STRING,
        references: {
          model: 'userGames',
          key: 'username',
        },
        onDelete: 'set null',
      },
      playerOne_status: {
        type: Sequelize.STRING,
      },
      playerTwo_status: {
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('room');
  },
};
