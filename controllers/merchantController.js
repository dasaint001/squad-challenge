const { MerchantRepo } = require("../repositories/merchantRepo")

const MerchantController = {
  addMerchant: async (req, res) => {
    try {
      const merchant = await MerchantRepo.createMerchant(req.body);

      return res.status(201).json({
        status: "Successful",
        message: "Merchant created successfully",
        data: merchant,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },
  getMerchant: async (req, res) => {
    try {
      const { merchantId } = req.params;
      const merchant = await MerchantRepo.getMerchant(merchantId);

      if (!merchant) {
        return res.status(404).json({
          status: "Failed",
          message: "Merchant not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Successful",
        message: "Merchant Info",
        data: merchant,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },

  allMerchants: async (req, res) => {
    try {
      const merchants = await MerchantRepo.getMerchants();

      return res.status(200).json({
        status: "Successful",
        message: "All Merchants",
        data: merchants,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  },
  getBalance: async (req, res) => {
    try {
      const { merchantId } = req.body;
      const merchant = await MerchantRepo.getMerchant(merchantId);
      if (!merchant) {
        return res.status(404).json({
          status: "Failed",
          message: "Merchant not found",
          data: null,
        });
      }

      const merchantBalance = await MerchantRepo.getMerchantBalance(merchantId);

      return res.status(200).json({
        status: "Successful",
        message: "Merchant Info",
        data: merchantBalance,
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

module.exports = { MerchantController };