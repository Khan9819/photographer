const mongoose = require('mongoose');
const SubcategorySchema = new mongoose.Schema({
  galleryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' },
  name: String,
  photos: [String],
  date: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Subcategory', SubcategorySchema);
