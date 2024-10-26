"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin1@gmail.com",
          is_admin: true,
          name: "Amani",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin2@gmail.com",
          is_admin: true,
          name: "Amani2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin3@gmail.com",
          is_admin: true,
          name: "Amani3",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
