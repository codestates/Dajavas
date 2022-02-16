"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "locations",
      [
        {
          location_name: "kimcoding",
          lat: "35.15010524567394",
          long: "129.03656585559872",
          user_id: 1,
        },
        {
          location_name: "parkhacker",
          lat: "35.16821823289449",
          long: "129.17705164296208",
          user_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
