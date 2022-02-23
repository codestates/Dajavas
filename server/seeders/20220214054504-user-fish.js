"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_fishes",
      [
        {
          user_id: 1,
          fish_id: 1,
        },
        {
          user_id: 1,
          fish_id: 2,
        },
        {
          user_id: 2,
          fish_id: 3,
        },
        {
          user_id: 2,
          fish_id: 4,
        },
        {
          user_id: 2,
          fish_id: 5,
        },
        {
          user_id: 2,
          fish_id: 6,
        },
        {
          user_id: 2,
          fish_id: 7,
        },
        {
          user_id: 2,
          fish_id: 8,
        },
        {
          user_id: 2,
          fish_id: 9,
        },
        {
          user_id: 2,
          fish_id: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
