'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      merchantID: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardTotal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      virtualTotal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sumTotal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payouts');
  }
};