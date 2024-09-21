const axios = require('axios');
const dayjs = require('dayjs');
const { CASHFREE_BASE_URL, CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = require('../config');

const headers = {
  'x-client-id': CASHFREE_CLIENT_ID,
  'x-client-secret': CASHFREE_CLIENT_SECRET,
  'accept': 'application/json',
  'content-type': 'application/json',
};

exports.verifyDl = async (req, res) => {
  try {
    const { dl_number, dob } = req.body;

    if (!dl_number || !dob) {
      return res.status(400).json({ error: 'DL number and DOB are required' });
    }

    const formattedDob = dayjs(dob).format('YYYY-MM-DD');

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/verification/driving-license`,
      {
        verification_id: `rentalriders${Date.now()}`,
        dl_number,
        dob: formattedDob,
      },
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify DL' });
  }
};