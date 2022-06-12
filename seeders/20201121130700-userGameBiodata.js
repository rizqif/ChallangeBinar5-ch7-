module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userGameBiodata', [
      {
        userId: 'd423b106-806d-44d6-8a6b-eb07ab9629a5',
        name: 'Admin Game',
        dob: new Date(1970, 1, 1),
        status: 'Admin',
      },
      {
        userId: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        name: 'Alpha Gamer',
        gender: 'm',
        dob: new Date(1980, 6, 20),
        status: 'Noob',
      }, {
        userId: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        name: 'Beta Gamer',
        gender: 'f',
        dob: new Date(1990, 3, 10),
        status: 'Pro girl',
      }, {
        userId: '95cf7a67-7738-45af-b207-3a0542aa3f3f',
        name: 'Charlie Gamer',
        gender: 'null',
        dob: new Date(2000, 9, 30),
        status: 'RPG Player',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userGameBiodata', null, {});
  },
};
