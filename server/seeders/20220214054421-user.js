"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nickname: "kimcoding",
          email: "kimcoding@gmail.com",
          password: "1234",
          login_method: 0,
        },
        {
          nickname: "parkhacker",
          email: "parkhacker@gmailcom",
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
