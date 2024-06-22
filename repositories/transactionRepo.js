const db = require("../models/index");
const { MerchantRepo } = require("../repositories/merchantRepo");
const { STATUS, generateUniqueReference, feePercentage, calculateSubTotalAmount, toFloat, secureCradNumber } = require("../Helpers/helpers");

const reference = generateUniqueReference(13);


const TransactionRepo = {
  createTransaction: async (transactionObj) => {
    const transactionPayload = {
      merchantID: transactionObj.merchantID,
      type: transactionObj.type.toLowerCase(),
      amount: transactionObj.amount,
      description: transactionObj.description,
      status: STATUS(transactionObj.type.toLowerCase()),
      reference: reference,
      createdAt: transactionObj.createdAt,
      updatedAt: transactionObj.updatedAt,
    };

    const transaction = await db.Transactions.create(transactionPayload);

    const detailsPayload = {
      merchantID: transaction.merchantID,
      transactionID: transaction.reference,
      accountName: transactionObj.accountName,
      accountNumber: transactionObj.accountNumber,
      feePercentage: feePercentage(transaction.type),
      subTotal: calculateSubTotalAmount(feePercentage(transaction.type),transaction.amount),
      bankCode: transactionObj.bankCode,
      totalAmount: transaction.amount,
      currency: transactionObj.currencyCode,
    };

    if (transaction.type === "card") {
      detailsPayload.cardNumber = secureCradNumber(transactionObj.cardNumber.toString());
      detailsPayload.cardHolder = transactionObj.cardHolder;
      detailsPayload.CVV = transactionObj.CVV;
      detailsPayload.expirationDate = transactionObj.expirationDate;
    }

    const transactionDetails = await db.TransactionDetails.create(detailsPayload);

    const merchant = await MerchantRepo.getMerchant(transaction.merchantID);
    const newBalance = +merchant.walletBalance + +transaction.amount;
  
    await MerchantRepo.updateMerchantBalance(
      transaction.merchantID,
      newBalance
    );

    return {
      Transaction: transaction,
      Details: transactionDetails,
    };
  },

  getTransactions: async () => {
    const transactions = await db.Transactions.findAll();
    return transactions;
  },

  getTransaction: async (transactionID) => {
    const transaction = await db.Transactions.findOne({
      where: {
        reference: transactionID,
      },
    });
    const transactionDetails = await db.TransactionDetails.findOne({
      where: {
        transactionID: transactionID,
      },
    });

    return {
        transaction: transaction,
        details: transactionDetails
    }
  },
  
  settleTransaction: async (reference) => {
      const settle = await db.Transactions.update(
          { status: 'SUCCESS' },
          {
              where: {
              reference: reference,
              },
          }
      );
      return settle;
  },

  getMerchantTransactions: async (merchantId) => {
    const transactions = await db.Transactions.findAll({
      where: {
        merchantID: merchantId
      },
    });
    return transactions
  }
};

module.exports = { TransactionRepo }