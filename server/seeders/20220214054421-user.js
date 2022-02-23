"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nickname: "kimcoding",
          email: "kimcoding@gmail.com",
          password: "abc1234",
          login_method: 0,
        },
        {
          nickname: "parkhacker",
          email: "parkhacker@gmail.com",
          password: "1234",
          login_method: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
