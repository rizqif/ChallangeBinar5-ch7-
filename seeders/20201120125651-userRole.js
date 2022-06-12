module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userRoles', [
      {
        rank: 1,
        role: 'superadmin',
      },
      {
        rank: 2,
        role: 'admin',
      },
      {
        rank: 3,
        role: 'professional gamer',
      },
      {
        rank: 4,
        role: 'hardcore gamer',
      },
      {
        rank: 5,
        role: 'casual gamer',
      },
      {
        rank: 6,
        role: 'newcomer',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userRoles', null, {});
  },
};
