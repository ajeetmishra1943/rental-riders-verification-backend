const express = require('express');
const { generateOtp, verifyOtp } = require('../controllers/aadhar');

const router = express.Router();

router.post('/generate-otp', generateOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;