const { TransactionRepo} = require("../repositories/transactionRepo");
const { Validator } = require("node-input-validator");

const TransactionController = {
  addTransaction: async (req, res) => {
    try {
      let validator = "";

      if (req.body.type.toLowerCase() === "virtual account") {
        validator = new Validator(req.body, {
          merchantID: "required",
          type: "required",
          amount: "required|numeric",
          accountName: "required",
          accountNumber: "required|numeric",
          bankCode: "required|numeric",
          currencyCode: "required",
        });
      }

      if (req.body.type.toLowerCase() === "card") {
        validator = new Validator(req.body, {
          merchantID: "required",
          type: "required",
          amount: "required",
          cardNumber: "required|numeric",
          cardHolder: "required",
          CVV: "required|numeric",
          expirationDate: "required",
          currencyCode: "required",
        });
      }

      const matched = await validator.check();
      if (!matched) {
        return res.status(422).json({
          status: "Failed",
          message: "Validation Failed",
          data: validator.errors,
        });
      }
      const transaction = await TransactionRepo.createTransaction(req.body);

      return res.status(201).json({
        status: "Successful",
        message: "Transaction successful",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },
  allTransactions: async (req, res) => {
    try {
      const transactions = await TransactionRepo.getTransactions();

      return res.status(200).json({
        status: "Successful",
        message: "All Transactions",
        data: transactions,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },

  fetchTransaction: async (req, res) => {
    try {
      const { reference } = req.params;
      const transaction = await TransactionRepo.getTransaction(reference);

      if (!transaction) {
        return res.status(404).json({
          status: "Failed",
          message: "Transaction not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Successful",
        message: "Transaction Info",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },

  cardPaymentSettlement: async (req, res) => {
    try {
      const validator = new Validator(req.body, {
        transactionReference: "required",
      });

      const matched = await validator.check();
      if (!matched) {
        return res.status(422).json({
          status: "Failed",
          message: "Validation Failed",
          data: validator.errors,
        });
      }
      const { transactionReference } = req.body;
      const transaction = await TransactionRepo.getTransaction(
        transactionReference
      );

      if (transaction.transaction === null) {
        return res.status(404).json({
          status: "Failed",
          message: "Transaction not found",
          data: null,
        });
      }

      if (transaction.transaction.type !== "card") {
        return res.status(400).json({
          status: "Failed",
          message:
            "Transaction is not a card transaction, please seek admin for advice",
          data: null,
        });
      }

      await TransactionRepo.settleTransaction(transactionReference);

      return res.status(200).json({
        status: "Successful",
        message: "Settlement successful",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },

  merchantTransactions: async (req, res) => {
    try {
      const { merchantId } = req.params;
      console.log(merchantId);
      const merchantTransactions = await TransactionRepo.getMerchantTransactions(merchantId);

      if (!merchantTransactions) {
        return res.status(404).json({
          status: "Failed",
          message: "Transaction not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Successful",
        message: "Transactions",
        data: merchantTransactions,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },
};

module.exports = { TransactionController };