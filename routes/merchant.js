const express = require('express');
const router = express.Router();

const { MerchantController  } = require('../controllers/merchantController')


router.get("/all", MerchantController.allMerchants);
router.get("/get-balance", MerchantController.getBalance);
router.get("/:merchantId", MerchantController.getMerchant);
router.post('/create', MerchantController.addMerchant);




module.exports = router;