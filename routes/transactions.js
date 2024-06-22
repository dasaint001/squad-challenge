const express = require('express');
const router = express.Router();
const { TransactionController } = require('../controllers/transactionController');
const { PayoutController } = require("../controllers/payoutController");

router.post('/create', TransactionController.addTransaction);
router.get('/all', TransactionController.allTransactions);
router.get('/:merchantId/all', TransactionController.merchantTransactions);
router.get('/:reference', TransactionController.fetchTransaction);
router.post('/settlement', TransactionController.cardPaymentSettlement);
router.post("/merchant/payout", PayoutController.createPayout);


module.exports = router;