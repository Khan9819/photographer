const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');
const authMiddleware = require('../middleware/auth');

// Add subcategory
router.post('/', authMiddleware, async (req,res) => {
  const { galleryId, name, date } = req.body;
  const subcategory = await Subcategory.create({ galleryId, name, date, photos: [] });
  res.json(subcategory);
});

// Add photo to subcategory
router.post('/photo', authMiddleware, async (req,res) => {
  const { subcategoryId, photoUrl } = req.body;
  const sub = await Subcategory.findById(subcategoryId);
  sub.photos.push(photoUrl);
  await sub.save();
  res.json(sub);
});

module.exports = router;
