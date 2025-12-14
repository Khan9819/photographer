const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/auth');

// Create gallery
router.post('/', authMiddleware, async (req,res) => {
  const { name, coverImage } = req.body;
  const gallery = await Gallery.create({ userId: req.user.id, name, coverImage });
  res.json(gallery);
});

// Get all galleries for a user
router.get('/', authMiddleware, async (req,res) => {
  const galleries = await Gallery.find({ userId: req.user.id });
  res.json(galleries);
});

module.exports = router;
