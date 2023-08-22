const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const User = require('../models/User.model');

router.get('/profile', verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
