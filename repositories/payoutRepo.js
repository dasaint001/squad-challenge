const db = require("../models/index");
const { SUCCESS_STATUS, VIRTUAL, CARD } = require("../Helpers/helpers");
const { MerchantRepo } = require("../repositories/merchantRepo");


const PayoutRepo = {
  createMerchantPayout: async (merchantId) => {
    const merchant = await MerchantRepo.getMerchant(merchantId);
    if (!merchant) {
      throw new Error("Merchant not found");
    }

    const whereVirtual = {
      status: SUCCESS_STATUS,
      type: VIRTUAL,
      merchantID: merchantId,
    };

    const whereCard = {
      status: SUCCESS_STATUS,
      type: CARD,
      merchantID: merchantId
    };

    const virtualSumPayout = await db.Transactions.findAll({
      attributes: [[db.sequelize.fn("SUM",db.sequelize.cast(db.sequelize.col("Transactions.amount"),"decimal(10,2)")),"amountSum"]],
      where: whereVirtual,
      raw: true,
    });

    const cardSumPayout = await db.Transactions.findAll({
      attributes: [[db.sequelize.fn("SUM",db.sequelize.cast(db.sequelize.col("Transactions.amount"),"decimal(10,2)")),"amountSum"]],
      where: whereCard,
      raw: true,
    });

    const totalCardPayout = +cardSumPayout[0]["amountSum"] - (3 / 100) * +cardSumPayout[0]["amountSum"];
    const totalVirtualPayout = +virtualSumPayout[0]["amountSum"] - (5 / 100) * +virtualSumPayout[0]["amountSum"];
    const totalPayouts = totalCardPayout + totalVirtualPayout;
    const totalProcessingFee = (3 / 100) * +cardSumPayout[0]["amountSum"] + (5 / 100) * +virtualSumPayout[0]["amountSum"];

    const allPayouts = {
      cardPayout: totalCardPayout.toFixed(2),
      virtualPayout: totalVirtualPayout.toFixed(2),
      processFee: totalProcessingFee.toFixed(2),
      totalPayout: totalPayouts.toFixed(2),
    };

    const payout = await db.Payouts.create({
      merchantID: merchantId,
      cardTotal: allPayouts.cardPayout,
      virtualTotal: allPayouts.virtualPayout,
      sumTotal: allPayouts.totalPayout
    });

    const newBalance = +merchant.walletBalance - totalPayouts;
    await MerchantRepo.updateMerchantBalance(merchantId,newBalance);

    return allPayouts;
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
    const updatedMerchant = await db.Payouts.update(
      { walletBalance: newBalance },
      {
        where: {
          merchantID: merchantId,
        },
      }
    );

    return updatedMerchant;
  },
};

module.exports = { PayoutRepo };
