'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      merchantID: {
        allowNull: false,
        type: Sequelize.STRING
      },
       accountName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      accountNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      feePercentage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subTotal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalAmount: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bankCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cardNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cardHolder: {
        allowNull: true,
        type: Sequelize.STRING
      },
      expirationDate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CVV: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionDetails');
  }
};