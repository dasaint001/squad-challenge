const db = require("../models/index");
const { generateID, SUCCESS_STATUS, VIRTUAL, CARD, PENDING_STATUS  } = require("../Helpers/helpers");

const MerchantRepo = {
  createMerchant: async (merchantObj) => {
    const merchant = await db.Merchants.create({
      id: merchantObj.id,
      fullName: merchantObj.fullName,
      merchantID: generateID(5),
      walletBalance: "0",
    });
    return merchant;
  },

  getMerchant: async (merchantId) => {
    const merchant = await db.Merchants.findOne({
      where: {
        merchantID: merchantId,
      },
    });

    return merchant;
  },

  getMerchants: async () => {
    const merchants = await db.Merchants.findAll();
    return merchants;
  },

  updateMerchantBalance: async (merchantId, newBalance) => {
    const updatedMerchant = await db.Merchants.update(
      { walletBalance: newBalance },
      {
        where: {
          merchantID: merchantId,
        },
      }
    );

    return updatedMerchant;
  },

  getMerchantBalance: async (merchantId) => {
    const merchant = await MerchantRepo.getMerchant(merchantId);

    const whereVirtual = {
      status: SUCCESS_STATUS,
      type: VIRTUAL,
      merchantID: merchantId,
    };

    const whereCard = {
      status: SUCCESS_STATUS,
      type: CARD,
      merchantID: merchantId,
    };

    const wherePending = {
      status: PENDING_STATUS,
    };

    const virtualSumPayout = await db.Transactions.findAll({
      attributes: [[db.sequelize.fn("SUM",db.sequelize.cast(db.sequelize.col("Transactions.amount"),"decimal(10,2)")),"amountSum"]],
      where: whereVirtual,
      raw: true,
    });

    const cardSumPayout = await db.Transactions.findAll({
      attributes: [[ db.sequelize.fn("SUM",db.sequelize.cast(db.sequelize.col("Transactions.amount"),"decimal(10,2)")),"amountSum"]],
      where: whereCard,
      raw: true,
    });

    const pendingTotal = await db.Transactions.findAll({
      attributes: [[db.sequelize.fn("SUM",db.sequelize.cast(db.sequelize.col("Transactions.amount"), "decimal(10,2)")),"amountSum"]],
      where: wherePending,
      raw: true,
    });

    const totalCardPayout =+cardSumPayout[0]["amountSum"] -(3 / 100) * +cardSumPayout[0]["amountSum"];
    const totalVirtualPayout = +virtualSumPayout[0]["amountSum"] - (5 / 100) * +virtualSumPayout[0]["amountSum"];
    const totalPayouts = totalCardPayout + totalVirtualPayout;
    const totalProcessingFee = (3 / 100) * +cardSumPayout[0]["amountSum"] + (5 / 100) * +virtualSumPayout[0]["amountSum"];
    const payouts = totalPayouts + totalProcessingFee;

    const balance = {
      availableBalance: +merchant.walletBalance - payouts,
      pendingSettlementBalance: +pendingTotal[0]["amountSum"],
    };

    return balance;
  },
};

module.exports = { MerchantRepo }