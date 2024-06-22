const { PayoutRepo } = require("../repositories/payoutRepo");
const { Validator } = require("node-input-validator");

const PayoutController = {
  createPayout: async (req, res) => {
    try {
      const validator = new Validator(req.body, {
        merchantId: "required",
      });

      const matched = await validator.check();
      if (!matched) {
        return res.status(422).json({
          status: "Failed",
          message: "Validation Failed",
          data: validator.errors,
        });
      }
      const { merchantId } = req.body;
      const payout = await PayoutRepo.createMerchantPayout(merchantId);

      return res.status(200).json({
        status: "Successful",
        message: "Payout Successful",
        data: payout,
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

module.exports = { PayoutController };
