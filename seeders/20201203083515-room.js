module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('room', [
      {
        roomId: 'OZpVji',
        username1: 'betagamer1',
        username2: 'deltagamer1',
        playerOne_status: 'waiting',
        playerTwo_status: 'waiting',
        status: 'full',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'EVlNOh',
        status: 'empty',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'PUBgZS',
        username2: 'betagamer1',
        playerTwo_status: 'waiting',
        status: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'l7jdxj',
        username1: 'echogamer1',
        playerOne_status: 'waiting',
        status: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room', null, {});
  },
};
