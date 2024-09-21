const axios = require('axios');
const { CASHFREE_BASE_URL, CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = require('../config');

const headers = {
  'x-client-id': CASHFREE_CLIENT_ID,
  'x-client-secret': CASHFREE_CLIENT_SECRET,
  'accept': 'application/json',
  'content-type': 'application/json',
};

exports.generateOtp = async (req, res) => {
  try {
    const { aadhaar_number } = req.body;

    if (!aadhaar_number) {
      return res.status(400).json({ error: 'Aadhar number is required' });
    }

    console.log(`${CASHFREE_BASE_URL}/verification/offline-aadhaar/otp`,headers)

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/verification/offline-aadhaar/otp`,
      { aadhaar_number },
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    console.log({error})
    res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, ref_id } = req.body;

    if (!otp || !ref_id) {
      return res.status(400).json({ error: 'OTP and ref_id are required' });
    }

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/verification/offline-aadhaar/verify`,
      { otp, ref_id },
      { headers }
    );

    const { name, dob, gender, address, care_of } = response.data;
    res.json({ name, dob, gender, address, care_of });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};