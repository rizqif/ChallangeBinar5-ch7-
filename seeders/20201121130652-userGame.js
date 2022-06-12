const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userGames', [
      {
        userId: 'd423b106-806d-44d6-8a6b-eb07ab9629a5',
        email: 'superadmin@game.com',
        username: 'superadmin',
        password: bcrypt.hashSync('password', salt),
        roleRank: 1,
      },
      {
        userId: '316b96d4-a24a-452f-bba5-2f4bf8e01457',
        email: 'admingame1@game.com',
        username: 'admingame1',
        password: bcrypt.hashSync('password', salt),
        roleRank: 2,
      },
      {
        userId: 'a4a871e4-0037-447b-8b7e-0be5a8e74eaf',
        email: 'admingame2@game.com',
        username: 'admingame2',
        password: bcrypt.hashSync('password', salt),
        roleRank: 2,
      },
      {
        userId: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        email: 'alphagamer@gmail.com',
        username: 'alphagamer1',
        password: bcrypt.hashSync('alphagamer1', salt),
        roleRank: 4,
      },
      {
        userId: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        email: 'betagamer@ymail.com',
        username: 'betagamer1',
        password: bcrypt.hashSync('betagamer1', salt),
        roleRank: 3,
      },
      {
        userId: '95cf7a67-7738-45af-b207-3a0542aa3f3f',
        email: 'charliegamer@live.com',
        username: 'charliegamer1',
        password: bcrypt.hashSync('charliegamer1', salt),
        roleRank: 5,
      },
      {
        userId: '210d8446-08ec-4b0d-809e-0f6a7275840a',
        email: 'deltagamer@domain.com',
        username: 'deltagamer1',
        password: bcrypt.hashSync('deltagamer1', salt),
        roleRank: 6,
      },
      {
        userId: '97b50d73-f95d-4aa7-8c09-3855d971b87e',
        email: 'echogamer@gmail.com',
        username: 'echogamer1',
        password: bcrypt.hashSync('echogamer1', salt),
        roleRank: 6,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userGames', null, {});
  },
};
