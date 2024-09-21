const express = require('express');
const { verifyDl } = require('../controllers/dl');

const router = express.Router();

router.post('/verify-dl', verifyDl);

module.exports = router;