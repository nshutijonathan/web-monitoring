"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    //  * await queryInterface.bulkInsert('People', [{
    //  *   name: 'John Doe',
    //  *   isBetaMember: false
    //  * }], {});
    */
    await queryInterface.bulkInsert(
      "Websites",
      [
        {
          name: "Youtube",
          url: "https://www.youtube.com",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chatgpt",
          url: "https://chatgpt.com",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DevTo",
          url: "https://dev.to/",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Websites", null, {});
  },
};
